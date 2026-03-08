from fastapi import FastAPI, UploadFile, File, Form
import uuid
import os
from dotenv import load_dotenv
from models import StartInterviewRequest, AnswerRequest
from ai_engine import generate_question, evaluate_answer, text_to_audio_file, speech_to_text
from report_generator import generate_final_report
load_dotenv()
from typing import Optional

app = FastAPI(title="AI Interview Simulator")
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["X-Question-Text"]
)

# In-memory store for sessions
from typing import Dict, Any
interview_sessions: Dict[str, Any] = {}
from google import genai

client = genai.Client()



import smtplib
from email.message import EmailMessage
import threading

def send_email_async(to_email, report_data):
    try:
        # For the hackathon, using a designated sender email or a mock
        # Real-world usage would use an env variable for password.
        sender = os.getenv("SENDER_EMAIL", "insighthire.ai.hackathon@gmail.com")
        password = os.getenv("SENDER_PASSWORD", "mock_password_or_app_password")
        
        if password == "mock_password_or_app_password":
            print(f"Mocking email send to {to_email}. Report: {report_data['username']} scored {report_data['average_score']}")
            return

        msg = EmailMessage()
        msg['Subject'] = f"Your Interview Report - {report_data['role']}"
        msg['From'] = sender
        msg['To'] = to_email

        content = f"Hello {report_data['username']},\n\n"
        content += f"Thank you for completing the interview for {report_data['role']}.\n"
        content += f"Your average score is {report_data['average_score']}/100.\n\n"
        
        ai = report_data.get("ai_insights", {})
        content += "Strengths:\n" + "\n".join([f"- {s}" for s in ai.get("strengths", [])]) + "\n\n"
        content += "Areas for Improvement:\n" + "\n".join([f"- {w}" for w in ai.get("weak_areas", [])]) + "\n\n"
        content += "Tips:\n" + "\n".join([f"- {t}" for t in ai.get("tips_for_improvement", [])]) + "\n\n"
        content += "Best regards,\nInsightHire AI Team"

        msg.set_content(content)

        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(sender, password)
            smtp.send_message(msg)
        print(f"Successfully sent email to {to_email}")
    except Exception as e:
        print(f"Failed to send email: {e}")

@app.get("/final-report/{session_id}")
def final_report(session_id: str):

    if session_id not in interview_sessions:
        return {"error": "Invalid session ID"}

    session = interview_sessions[session_id]

    report = generate_final_report(session)
    
    # Send email asynchronously so we don't block the response
    to_email = session.get("email")
    if to_email:
        threading.Thread(target=send_email_async, args=(to_email, report)).start()

    return report

@app.post("/start-interview")
def start_interview(data: StartInterviewRequest):
    session_id = str(uuid.uuid4())

    # Determine max questions based on session type
    if data.session_type == "Questions":
        max_questions = data.question_count
    else:
        # Time-based: parse duration
        try:
            duration_mins = int(data.duration.split()[0])
            max_questions = duration_mins // 3 # approx 1 question every 3 minutes
            max_questions = max(3, min(max_questions, 20)) # Cap for time-based to ensure time limit is hit first
        except:
            max_questions = 10

    interview_sessions[session_id] = {
        "username": data.username,
        "email": data.email,
        "role": data.role,
        "round": data.round,
        "difficulty": data.difficulty,
        "mode": data.mode,
        "max_questions": max_questions,
        "questions": [],
        "answers": [],
        "evaluations": [],
        "numeric_scores": []
    }

    return {"session_id": session_id}

from fastapi.responses import FileResponse

@app.get("/")
def read_root():
    return FileResponse("index.html")

@app.get("/get-question/{session_id}")
def get_question(session_id: str):
    if session_id not in interview_sessions:
        return {"error": "Invalid session ID"}
    
    session = interview_sessions[session_id]
    
    if len(session["questions"]) >= session["max_questions"]:
        return {"error": "Interview complete"}

    question = generate_question(
        role=session["role"],
        round_type=session["round"],
        difficulty=session["difficulty"],
        previous_questions=session["questions"]
    )

    session["questions"].append(question)
    
    # Generate audio for the question and return as file

    # Generate audio for the question and return as file
    audio_path = text_to_audio_file(question, session_id)
    if not audio_path or not os.path.exists(audio_path):
        # Fallback to text if audio fails
        return {"question": question}

    import urllib.parse
    encoded_question = urllib.parse.quote(question)
    # We return the question text in a custom header so the frontend still has it!
    return FileResponse(
        path=audio_path,
        media_type="audio/mpeg",
        filename="question.mp3",
        headers={"X-Question-Text": encoded_question}
    )

@app.post("/submit-answer")
async def submit_answer(
    session_id: str = Form(...), 
    text_answer: Optional[str] = Form(None),
    audio: Optional[UploadFile] = File(None)
):
    if session_id not in interview_sessions:
        return {"error": "Invalid session ID"}

    session = interview_sessions[session_id]
    if not session["questions"]:
         return {"error": "No question to answer."}
         
    question = session["questions"][-1]
    
    final_text_answer = ""
    # Use text_answer if provided (Text Mode), else speech_to_text (Voice Mode)
    if text_answer:
        final_text_answer = text_answer
    elif audio:
        audio_bytes = await audio.read()
        final_text_answer = speech_to_text(audio_bytes)
        
    if not final_text_answer:
        return {"error": "Could not get an answer."}

    # Early exit keywords
    exit_keywords = ["quit", "exit", "finish", "done", "stop session"]
    user_wants_to_end = any(kw in final_text_answer.lower() for kw in exit_keywords)

    # evaluate_answer now returns a dict
    evaluation = evaluate_answer(question, final_text_answer)

    session["answers"].append(final_text_answer)
    session["evaluations"].append(evaluation)

    # Extract score
    score = evaluation.get("score", 0)
    session["numeric_scores"].append(score)

    # Interview complete if questions reached OR user requested exit
    interview_complete = (len(session["answers"]) >= session["max_questions"]) or user_wants_to_end

    # Provide all the fields the frontend expects
    return {
        "evaluation": evaluation.get("evaluation_text", ""),
        "sentimentFeedback": evaluation.get("sentimentFeedback", "Neutral"),
        "confidenceFeedback": evaluation.get("confidenceFeedback", "Moderate"),
        "score": score,
        "transcribed_text": final_text_answer,
        "interview_complete": interview_complete
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
    