import React, { useContext, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Response } from "../context/Response.context";

import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css"; // Dark theme similar to VS Code
import "prismjs/components/prism-javascript.min.js";
import "prismjs/components/prism-python.min.js";
import "prismjs/components/prism-java.min.js";
import "prismjs/components/prism-c.min.js";
import "prismjs/components/prism-cpp.min.js";
import "prismjs/components/prism-csharp.min.js";
import "prismjs/components/prism-go.min.js";
import "prismjs/components/prism-ruby.min.js";
import "prismjs/components/prism-swift.min.js";
import "prismjs/components/prism-typescript.min.js";
import "prismjs/components/prism-jsx.min.js";
import "prismjs/components/prism-tsx.min.js";
import "prismjs/components/prism-bash.min.js";
import "prismjs/components/prism-sql.min.js";
import "prismjs/components/prism-json.min.js";

import Spinner from "./Spinner";

export default function Generatedout() {
  const { response, isloading } = useContext(Response);

  const copyToClipboard = () => {
    if (!response) return;

    navigator.clipboard.writeText(response);
    alert("Copied to clipboard! ✅");
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [response]); // Re-run when response changes

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
