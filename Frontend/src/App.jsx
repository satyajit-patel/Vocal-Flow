import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import {VortexDemo} from "./components/Hero/VortexDemo";
import STTPage from "./pages/STTPage";
import TTSPage from "./pages/TTSPage";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<VortexDemo />} />
                <Route path="/tts" element={<TTSPage />} />
                <Route path="/stt" element={<STTPage />} />
            </Routes>
        </Router>
    );
}

export default App;
