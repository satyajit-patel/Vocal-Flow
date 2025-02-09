#!/bin/bash
# Install system dependencies for PyAudio
apt-get update && apt-get install -y portaudio19-dev
pip install -r requirements.txt