from flask import Flask, jsonify
from flask_cors import CORS
from services.stt_service import stt_process
from services.tts_service import tts_process
from services.tts_service_agent import tts_process_agent

app = Flask(__name__)
CORS(app)

# @app.route("/api/v1/stt", methods=["POST"])
# def speech_to_text():
#     return stt_process()

@app.route("/api/v1/tts", methods=["POST"])
def text_to_speech():
    return tts_process()

@app.route("/api/v1/tts-agent", methods=["POST"])
def text_to_speech_agent():
    return tts_process_agent()

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Server is running!"}), 200

@app.route("/ping", methods=["GET"])
def ping():
    return jsonify({"message": "pong"}), 200

if __name__ == "__main__":
    app.run(debug=True, port=5000)
