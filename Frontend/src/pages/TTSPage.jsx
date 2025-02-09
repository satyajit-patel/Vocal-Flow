import { useState } from "react";
import axios from "axios";

function TTSPage() {
    const [text, setText] = useState("");
    const [audioUrl, setAudioUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const [textAgent, setTextAgent] = useState("");
    const [audioUrlAgent, setAudioUrlAgent] = useState(null);
    const [loadingAgent, setLoadingAgent] = useState(false);

    const handleTTS = async (e) => {
        e.preventDefault();
        setAudioUrlAgent(null);
        setLoading(true);
        setAudioUrl(null);
        try {
            const res = await axios.post("http://localhost:5000/api/v1/tts", { text }, { responseType: "blob" });
            const audioBlob = new Blob([res.data], { type: "audio/mpeg" });
            const url = URL.createObjectURL(audioBlob);
            setAudioUrl(url);
        } catch (error) {
            console.error("Error generating speech:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleTTS_agent = async (e) => {
        e.preventDefault();
        setAudioUrl(null);
        setLoadingAgent(true);
        setAudioUrlAgent(null);
        try {
            const res = await axios.post("http://localhost:5000/api/v1/tts-agent", { textAgent }, { responseType: "blob" });
            const audioBlob = new Blob([res.data], { type: "audio/mpeg" });
            const url = URL.createObjectURL(audioBlob);
            setAudioUrlAgent(url);
        } catch (error) {
            console.error("Error generating speech:", error);
        } finally {
            setLoadingAgent(false);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 bg-slate-600 h-screen gap-4">
                <div className="items-center p-10">
                    <h1 className="text-2xl font-bold mb-4">Text-to-Speech Converter</h1>
                    <form onSubmit={handleTTS}>
                        <textarea
                            required
                            onChange={(e) => setText(e.target.value)}
                            className="border p-2 w-full max-w-lg h-32 rounded-lg shadow-sm"
                            placeholder="Enter text here..."
                        />
                        <button
                            className={`mt-4 px-4 py-2 rounded-lg text-white ${
                                loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                            }`}
                            disabled={loading}
                        >
                            {loading ? "Processing..." : "Convert to Speech"}
                        </button>
                    </form>

                    {audioUrl && (
                        <div className="mt-4 w-full max-w-lg p-4 bg-white shadow-md rounded-lg text-center">
                            <p className="mb-2 font-medium">Your Audio:</p>
                            <audio controls autoPlay className="w-full">
                                <source src={audioUrl} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    )}
                </div>

                <div className="items-center p-10">
                    <h1 className="text-2xl font-bold mb-4">Text-to-Speech AI agent</h1>
                    <form onSubmit={handleTTS_agent}>
                        <textarea
                            required
                            onChange={(e) => setTextAgent(e.target.value)}
                            className="border p-2 w-full max-w-lg h-32 rounded-lg shadow-sm"
                            placeholder="Ask anything..."
                        />
                        <button
                            className={`mt-4 px-4 py-2 rounded-lg text-white ${
                                loadingAgent ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                            }`}
                            disabled={loading}
                        >
                            {loadingAgent ? "Processing..." : "Convert to Speech"}
                        </button>
                    </form>

                    {audioUrlAgent && (
                        <div className="mt-4 w-full max-w-lg p-4 bg-white shadow-md rounded-lg text-center">
                            <p className="mb-2 font-medium">Your Audio:</p>
                            <audio controls autoPlay className="w-full">
                                <source src={audioUrlAgent} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    )}
                </div>
        </div>
    );
}

export default TTSPage;
