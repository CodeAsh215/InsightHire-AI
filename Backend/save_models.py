import os
from dotenv import load_dotenv
from google import genai
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)
try:
    models = client.models.list()
    with open("all_models.txt", "w") as f:
        for m in models:
            f.write(f"{m.name}\n")
    print("Models written to all_models.txt")
except Exception as e:
    print(f"Error: {e}")
