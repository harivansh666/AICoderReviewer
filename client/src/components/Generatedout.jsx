import React, { useContext } from "react";
import ReactMarkdown from "react-markdown";
import { Response } from "../context/Response.context";

export default function Generatedout() {
    const { response } = useContext(Response);

    const handleAnimationComplete = () => {
        console.log('All letters have animated!');
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(response);
        alert("Copied to clipboard! ✅");
    };


    return (
        <div className=" basis-1/2  h-screen flex justify-start overflow-y-auto items-center box-content rounded-2xl p-5 flex-wrap bg-blue-800 text-white ">
            <button
                disabled={!response}
                onClick={copyToClipboard}
                className=" cursor-pointer bg-blue-500 justify-start text-white px-3 py-1 rounded top-2 right-6 mt-4 mb-2 fixed"
            >
                Copy Code
            </button>

            <ReactMarkdown>
                {response}
            </ReactMarkdown>

        </div >
    );
}




