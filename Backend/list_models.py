import os
from dotenv import load_dotenv
from google import genai
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)
try:
    models = client.models.list()
    for m in models:
        print(m.name)
except Exception as e:
    print(f"Error listing models: {e}")
