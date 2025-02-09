import speech_recognition as sr
from flask import request, jsonify
import pyaudio

from transformers import pipeline
from flask import jsonify

sentiment_model = pipeline("sentiment-analysis")
# sentiment analysis
def analyze_sentiment(text):
    result = sentiment_model(text)
    print("Sentiment Analysis Result:", result[0])
    return jsonify(result[0])

def stt_process():
    recognizer = sr.Recognizer()
    
    with sr.Microphone() as source:
        print("Listening... Speak now.")
        recognizer.adjust_for_ambient_noise(source)
        
        try:
            audio = recognizer.listen(source, timeout=5)  # Stop if no speech for 5 seconds
            text = recognizer.recognize_google(audio)
            
            sentiment_result = analyze_sentiment(text).get_json()  # Get sentiment response
            
            return jsonify({
                "transcript": text,
                "sentiment": sentiment_result["label"]
            })
        
        except sr.WaitTimeoutError:
            return jsonify({"error": "No speech detected within 5 seconds. Try again."}), 400
        except sr.UnknownValueError:
            return jsonify({"error": "Couldn't recognize speech. Please try again."}), 400
