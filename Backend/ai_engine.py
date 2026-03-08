import os
from dotenv import load_dotenv
from google import genai
import base64
import tempfile
from gtts import gTTS

def text_to_audio_file(text, session_id):
    """Converts text to an MP3 audio file and saves it in a temporary location."""
    try:
        tts = gTTS(text=text, lang='en')
        filepath = f"temp_{session_id}.mp3"
        tts.save(filepath)
        return filepath
    except Exception as e:
        print(f"Error in TTS: {e}")
        return None

def speech_to_text(audio_bytes):
    """Uses Gemini to transcribe an audio file given as bare bytes."""
    prompt = "Transcribe this audio. Return ONLY the transcribed text, without any additional comments."
    max_retries = 3
    for attempt in range(max_retries):
        try:
            response = client.models.generate_content(
                model="gemini-2.5-flash-lite",
                contents=[
                    genai.types.Part.from_bytes(
                        data=audio_bytes,
                        mime_type="audio/mp3", # Or let it figure it out if web upload
                    ),
                    prompt
                ]
            )
            return response.text.strip()
        except Exception as e:
            print(f"Error in STT (attempt {attempt+1}): {str(e)}")
            if attempt == max_retries - 1:
                import traceback
                traceback.print_exc()
                return ""
            import time
            time.sleep(1 + attempt)
# Load environment variables
load_dotenv()

# Check API key
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY not found in .env file")

# Configure Gemini client
client = genai.Client(api_key=api_key)


# -----------------------------------
# Generate Interview Question
# -----------------------------------
def generate_question(role, round_type, difficulty, previous_questions=None):
    if previous_questions is None:
        previous_questions = []

    prompt = f"""
You are an expert technical interviewer.
Generate 1 interview question for the following configuration:
- Role: {role}
- Round Type: {round_type}
- Difficulty: {difficulty}

Previously asked questions in this session:
{chr(10).join(previous_questions) if previous_questions else 'None yet.'}

Ensure the question matches the difficulty level exactly and is relevant to the role and round type.
Only return the question text, no introductory or concluding remarks.
"""
    max_retries = 3
    for attempt in range(max_retries):
        try:
            response = client.models.generate_content(
                model="gemini-2.5-flash-lite",
                contents=prompt
            )
            return response.text.strip() if response.text else "No question generated."
        except Exception as e:
            print(f"Error generating question (attempt {attempt+1}): {str(e)}")
            if attempt == max_retries - 1:
                import traceback
                traceback.print_exc()
                return f"Could not generate question for {role}."
            import time
            time.sleep(1 + attempt)


# -----------------------------------
# Evaluate Answer
# -----------------------------------
def evaluate_answer(question, answer):
    prompt = f"""
You are an expert technical interviewer and evaluator. Your goal is to provide a highly critical and accurate assessment of the candidate's answer.

Question: {question}
Candidate Answer: {answer}

Evaluation Rubric:
- 0-30: Irrelevant, nonsensical, or "I don't know" answers.
- 31-60: High-level or vague answers that lack technical depth or specific examples.
- 61-80: Solid answers that demonstrate understanding but might miss some nuances or best practices.
- 81-100: Exceptional answers that are detailed, technically accurate, include examples/trade-offs, and demonstrate seniority.

Be strict. Do not give high scores for short or broad answers.

Return EXACTLY this JSON structure (and no markdown formatting or backticks around it):
{{
  "score": <number 1-100 based on the rubric above>,
  "sentimentFeedback": "<A short phrase (max 3 words) describing the candidate's tone, e.g. 'Confident', 'Hesitant', 'Articulate'>",
  "confidenceFeedback": "<A short phrase (max 3 words) describing their perceived confidence level>",
  "evaluation_text": "<A critical analysis of the answer, specifically mentioning what was missing if the score is not 100>"
}}
"""
    max_retries = 3
    for attempt in range(max_retries):
        try:
            response = client.models.generate_content(
                model="gemini-2.5-flash-lite",
                contents=prompt
            )
            import json
            text = response.text.strip()
            if text.startswith("```json"):
                text = text[7:]
            if text.startswith("```"):
                text = text[3:]
            if text.endswith("```"):
                text = text[:-3]
            return json.loads(text.strip())
        except Exception as e:
            print(f"Error evaluating answer (attempt {attempt+1}): {e}")
            if attempt == max_retries - 1:
                return {
                    "score": 0,
                    "sentimentFeedback": "Error",
                    "confidenceFeedback": "Error",
                    "evaluation_text": "Error evaluating answer."
                }
            import time
            time.sleep(1 + attempt)

# -----------------------------------
# Generate AI Report
# -----------------------------------
def generate_ai_report(session):
    questions_and_answers = ""
    for q, a, e in zip(session["questions"], session["answers"], session["evaluations"]):
        questions_and_answers += f"Q: {q}\nA: {a}\nEval: {e}\n\n"

    prompt = f"""
You are an expert interview coach. Based on the following interview session for a {session['domain']} role, provide a comprehensive report for the candidate ({session['username']}).

Session Data:
{questions_and_answers}

Return EXACTLY this JSON structure (and no markdown formatting or backticks around it, just raw JSON):
{{
  "strengths": ["string", "string"],
  "weak_areas": ["string", "string"],
  "tips_for_improvement": ["string", "string"]
}}
"""
    max_retries = 3
    for attempt in range(max_retries):
        try:
            response = client.models.generate_content(
                model="gemini-2.5-flash-lite",
                contents=prompt
            )
            import json
            text = response.text.strip()
            if text.startswith("```json"):
                text = text[7:]
            if text.startswith("```"):
                text = text[3:]
            if text.endswith("```"):
                text = text[:-3]
            return json.loads(text.strip())
        except Exception as e:
            print(f"Error generating AI report (attempt {attempt+1}): {e}")
            if attempt == max_retries - 1:
                return {
                    "strengths": ["Demonstrated effort in completing the interview."],
                    "weak_areas": ["Could not generate detailed AI analysis due to an error."],
                    "tips_for_improvement": ["Review standard interview questions for your domain."]
                }
            import time
            time.sleep(1 + attempt)