import React, { useContext } from "react";
import ReactMarkdown from "react-markdown";
import { Response } from "../context/Response.context";

export default function Generatedout() {
    const { response } = useContext(Response);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(response);
        alert("Copied to clipboard! ✅");
    };


    return (
        <div className=" w-1/2 h-screen flex justify-start overflow-y-auto items-center box-content  rounded-4xl p-5 flex-wrap ">
            <button
                disabled={!response}
                onClick={copyToClipboard}
                className=" bg-blue-500 justify-start text-white px-3 py-1 rounded top-2 right-6 mt-4 mb-2 fixed "
            >
                Copy Code
            </button>

            <ReactMarkdown>{response}</ReactMarkdown>
        </div>
    );
}




