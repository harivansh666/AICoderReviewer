import React, { useContext } from "react";
import ReactMarkdown from "react-markdown";
import { Response } from "../context/Response.context";
import Spinner from "./Spinner";

export default function Generatedout() {
  const { response, isloading } = useContext(Response);

  const copyToClipboard = () => {
    if (!response) return;

    navigator.clipboard.writeText(response);
    alert("Copied to clipboard! ✅");
  };

  return (
    <div className="basis-1/2 overflow-y-auto rounded-2xl bg-blue-800 text-white border-4">
      <button
        disabled={!response}
        onClick={copyToClipboard}
        className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white w-22 h-10 rounded sm:top-4 right-6 sm:right-6 mb-2 absolute"
      >
        Copy Code
      </button>

      <div className="w-full h-screen p-6 ml-2 text-lg">
        <div className="p-4">
          {isloading ? <Spinner /> : <ReactMarkdown>{response}</ReactMarkdown>}
        </div>
      </div>
    </div>
  );
}
