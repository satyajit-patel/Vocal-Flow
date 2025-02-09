import React from "react";
import { Vortex } from "./vortex";
import { Link } from "react-router-dom";

export function VortexDemo() {
  return (
    (<div
      className="w-screen h-screen mx-auto overflow-hidden">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full">
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
          The hell is this?
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
          A web-based application for real-time Text-to-Speech and Speech-to-Text conversion. It supports sentiment analysis and voice command execution either.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
                <Link to="/tts">Text-to-Speech</Link>
            </button>
            <button className="px-4 py-2  text-white">
                <Link to="/stt">Speech-to-Text</Link>
            </button>
        </div>
      </Vortex>
    </div>)
  );
}
