# test_audio.py
import base64
from gtts import gTTS
from google import genai
import os
from dotenv import load_dotenv

load_dotenv()
client = genai.Client()

# 1. TTS
print("Generating TTS...")
tts = gTTS(text="Hello, this is a spoken question about Artificial Intelligence.", lang='en')
tts.save("test_q.mp3")

# 2. STT via Gemini
print("Testing STT...")
with open("test_q.mp3", "rb") as f:
    audio_bytes = f.read()

prompt = "Transcribe this audio precisely. Return ONLY the transcribed text, nothing else."
try:
    response = client.models.generate_content(
        model="gemini-flash-latest",
        contents=[
            genai.types.Part.from_bytes(
                data=audio_bytes,
                mime_type="audio/mp3",
            ),
            prompt
        ]
    )
    print("Transcription:", response.text)
except Exception as e:
    print("Transcription Error:", e)
