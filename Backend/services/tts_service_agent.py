from gtts import gTTS
from flask import request, jsonify, send_file
import io

from groq import Groq
import os
from dotenv import load_dotenv
load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
print(GROQ_API_KEY)
client = Groq(api_key=GROQ_API_KEY)

def generate_ai_response(input_value):
    try:

        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are an AI assistant that provides short, concise, and accurate responses."},
                {"role": "user", "content": input_value},
            ],
            model="llama-3.3-70b-versatile",
            temperature=0.5,
            max_completion_tokens=1024,
            top_p=1,
            stop=None,
            stream=False,
        )

        if not chat_completion.choices or len(chat_completion.choices) == 0:
            raise ValueError("AI response is empty.")

        return chat_completion.choices[0].message.content

    except Exception as error:
        print("Groq API Error:", error)
        raise ValueError("Failed to generate AI response.")

def tts_process_agent():
    data = request.get_json()
    text = data.get("textAgent", "")

    response = generate_ai_response(text)
    print(response)

    tts = gTTS(text=response, lang="en")

    # Create an in-memory audio file
    audio_buffer = io.BytesIO()
    tts.write_to_fp(audio_buffer)
    audio_buffer.seek(0)

    return send_file(audio_buffer, mimetype="audio/mpeg")
