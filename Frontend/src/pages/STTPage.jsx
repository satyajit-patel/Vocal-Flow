import { useState } from "react";
import axios from "axios";

function STTPage() {
    const [transcript, setTranscript] = useState("");
    const [listening, setListening] = useState(false);
    const [error, setError] = useState("");
    const [sentiment, setSentiment] = useState(null);
    const [lastSentence, setLasrSentence] = useState("No last sentence exist..")

    if(transcript == "Repeat last sentence") {
        setTranscript(lastSentence);
    }
    if(transcript == "Clear text") {
        setTranscript("");
    }

    const handleSTT = async () => {
        setListening(true);
        setLasrSentence(transcript);
        setTranscript("");
        setSentiment(null);
        setError("");

        try {
            const res = await axios.post("http://localhost:5000/api/v1/stt");
            
            if (res.data.error) {
                setError(res.data.error);
            } else {
                setTranscript(res.data.transcript);
                setSentiment(res.data.sentiment);
            }
        } catch (error) {
            setError("Couldn't hear. Please try again.");
        } finally {
            setListening(false);
        }
    };

    return (
        <div className="flex flex-col items-center p-10 min-h-screen bg-gray-100 gap-4">
            <h1 className="text-2xl font-bold mb-4">Speech-to-Text Converter</h1>
            
            <button
                onClick={handleSTT}
                className={`px-5 py-3 text-white rounded-lg transition shadow-md ${
                    listening ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                }`}
                disabled={listening}
            >
                {listening ? "Listening..." : "Start Speaking"}
            </button>
            <p className="text-sm">
                Try commands like “Clear text” to erase text or “Repeat last sentence” to get last text.
            </p>

            <div className="mt-4 w-full max-w-lg p-4 bg-white shadow-md rounded-lg text-center">
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <p className="text-lg font-medium">{transcript || "Your speech will appear here..."}</p>
                )}
            </div>

            {sentiment && (
                <div className="text-3xl">
                    {(sentiment === "POSITIVE" && transcript.length > 0) ? "😊" : "😞"}
                </div>
            )}
        </div>
    );
}

export default STTPage;
