from ai_engine import generate_ai_report

def generate_final_report(session):

    total_questions = len(session["questions"])

    if total_questions == 0:
        avg_score = 0
    else:
        avg_score = sum(session["numeric_scores"]) / total_questions

    ai_insights = generate_ai_report(session)

    return {
        "username": session["username"],
        "domain": session["domain"],
        "total_questions": total_questions,
        "average_score": round(avg_score, 2),
        "feedback": session["evaluations"],
        "ai_insights": ai_insights
    }