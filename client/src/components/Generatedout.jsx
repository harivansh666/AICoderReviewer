// components/Generatedout.tsx
import React, { useContext } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Response } from "../context/Response.context";
import Spinner from "./Spinner";

export default function Generatedout() {
  const { response, isloading } = useContext(Response);

  return (
    <div className="basis-1/2 h-screen overflow-y-auto bg-gradient-to-br from-blue-900 to-blue-800 text-white p-6">
      {/* Copy All Button */}
      {response && (
        <button
          onClick={() => navigator.clipboard.writeText(response || "")}
          className="fixed top-4 right-8 z-50 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-bold shadow-lg"
        >
          Copy All
        </button>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto mt-8">
        {isloading ? (
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        ) : (
          <ReactMarkdown
            components={{
              code({ inline, className, children }) {
                const match = /language-(\w+)/.exec(className || "");
                const code = String(children).replace(/\n$/, "");

                if (!inline && match) {
                  return (
                    <div className="my-8 relative group">
                      <div className="absolute top-2 right-2 bg-black/70 text-xs px-3 py-1 rounded text-gray-300">
                        {match[1].toUpperCase()}
                      </div>
                      <button
                        onClick={() => navigator.clipboard.writeText(code)}
                        className="absolute top-10 right-2 opacity-0 group-hover:opacity-100 bg-gray-800 hover:bg-gray-700 px-3 py-1 text-xs rounded border"
                      >
                        Copy
                      </button>
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        className="rounded-xl !mt-0"
                      >
                        {code}
                      </SyntaxHighlighter>
                    </div>
                  );
                }

                return (
                  <code className="bg-blue-900/60 px-2 py-1 rounded text-sm">
                    {children}
                  </code>
                );
              },
            }}
          >
            {response || "Please wait"}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}
