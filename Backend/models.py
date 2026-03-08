from pydantic import BaseModel

class StartInterviewRequest(BaseModel):
    username: str
    email: str
    role: str
    round: str
    difficulty: str
    session_type: str = "Time" # "Time" or "Questions"
    question_count: int = 10
    duration: str
    mode: str

class AnswerRequest(BaseModel):
    session_id: str
    answer: str