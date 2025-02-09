import speech_recognition as sr
from flask import jsonify
from transformers import pipeline

sentiment_model = pipeline("sentiment-analysis")

def analyze_sentiment(text):
    result = sentiment_model(text)
    return result[0]  # Return as a dict instead of jsonify()

def stt_process():
    recognizer = sr.Recognizer()
    
    with sr.Microphone() as source:
        print("Listening... Speak now.")
        recognizer.adjust_for_ambient_noise(source)

        # need pyaudio installed

        try:
            audio = recognizer.listen(source, timeout=10)  # Listen only when API is called
            text = recognizer.recognize_google(audio)
            sentiment_result = analyze_sentiment(text)

            return jsonify({
                "transcript": text,
                "sentiment": sentiment_result["label"]
            })

        except sr.WaitTimeoutError:
            return jsonify({"error": "No speech detected within 10 seconds. Try again."}), 400
        except sr.UnknownValueError:
            return jsonify({"error": "Couldn't recognize speech. Please try again."}), 400
