import React, { useContext } from "react";
import ReactMarkdown from "react-markdown";
import { Response } from "../context/Response.context";

export default function Generatedout() {
    const { response } = useContext(Response);


    const copyToClipboard = () => {

        if (!response) return;

        navigator.clipboard.writeText(response);
        alert("Copied to clipboard! ✅");
    };

    return (
        <div className=" basis-1/2 overflow-y-auto rounded-2xl  bg-blue-800 text-white border-4 ">
            <button
                disabled={!response}
                onClick={copyToClipboard}
                className="cursor-pointer  bg-blue-500 hover:bg-blue-600  text-white w-22 h-10 rounded top-4 right-6  mb-2 absolute"
            >
                Copy Code
            </button>

            <div className="w-full h-screen p-6 ml-2 ">
                <div className="p-4">
                    <ReactMarkdown>
                        {response}
                    </ReactMarkdown>
                </div>
            </div>


        </div >
    );
}




