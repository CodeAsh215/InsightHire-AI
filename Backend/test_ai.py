import os
from dotenv import load_dotenv
from google import genai
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)
try:
    response = client.models.generate_content(
        model="gemini-1.5-flash",
        contents="Hello, say 'API is working!'"
    )
    print(response.text)
except Exception as e:
    print(f"Error with gemini-1.5-flash: {e}")

try:
    response = client.models.generate_content(
        model="gemini-2.5-flash-lite",
        contents="Hello"
    )
    print(response.text)
except Exception as e:
    print(f"Error with gemini-2.5-flash-lite: {e}")
