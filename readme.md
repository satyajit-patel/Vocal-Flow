# Speech-to-Text & Text-to-Speech Web App

A web-based application for real-time Speech-to-Text (STT) and Text-to-Speech (TTS) conversion. It supports multilingual speech processing, sentiment analysis, and voice command execution.

## Features
- **Speech-to-Text (STT)**: Converts spoken words into text using `SpeechRecognition`.
- **Text-to-Speech (TTS)**: Generates speech from text using `gTTS`.
- **Multilingual Support**: Processes speech in multiple languages.
- **Sentiment Analysis**: Analyzes the emotional tone of speech input.
- **Voice Commands**: Executes specific commands based on recognized speech.

## Demo
- 🎥 **Short Video Presentation**: _(To be added)_
- 🚀 **Live Demo**: [Click Here](#) _(Vercel link to be updated)_

## Challenges Faced
- **TTS Library Choice**: Initially explored `elevenlabs`, but it was not free for deployment, so `gTTS` was used.
- **STT Library Used**: `SpeechRecognition` with `Google Web Speech API`.

## Future Scope
- Integrating a real-time transcription feature.
- Enhancing TTS with more natural-sounding voices.
- Expanding support for additional languages and accents.
- Improving voice command execution with AI-based intent recognition.

## Setup Guide

### Clone the Project
```
git clone <repository-url>
```
### Backend Setup
```
cd Backend
pip install -r requirements.txt
python app.py
```
### Frontend Setup
```
cd Frontend
npm install
npm run dev
```
