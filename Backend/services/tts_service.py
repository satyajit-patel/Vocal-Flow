from gtts import gTTS
from flask import request, jsonify, send_file
import io

def tts_process():
    data = request.get_json()
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    tts = gTTS(text=text, lang="en")

    # Create an in-memory audio file
    audio_buffer = io.BytesIO()
    tts.write_to_fp(audio_buffer)
    audio_buffer.seek(0)

    return send_file(audio_buffer, mimetype="audio/mpeg")
