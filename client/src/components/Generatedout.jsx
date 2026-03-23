import React, { useContext } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  atomDark,
  prism,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { Response } from "../context/Response.context";
import { useTheme } from "../context/ThemeContext";

export default function Generatedout() {
  const { response, isloading } = useContext(Response);
  const { theme } = useTheme();

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="basis-1/2 h-full flex flex-col bg-white dark:bg-zinc-950 p-6 overflow-hidden transition-colors">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
          AI Feedback
        </h2>
        {response && !isloading && (
          <button
            onClick={() => copyToClipboard(response)}
            className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white text-xs font-bold rounded-lg transition-all border border-zinc-200 dark:border-white/5"
          >
            Copy Report
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {isloading ? (
          <div className="h-full flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-500 gap-4">
            <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
            <p className="text-sm font-medium animate-pulse">
              AI is thinking...
            </p>
          </div>
        ) : response ? (
          <div
            className={`prose ${theme === "dark" ? "prose-invert" : ""} prose-blue max-w-none prose-sm`}
          >
            <ReactMarkdown
              components={{
                code({ inline, className, children }) {
                  const match = /language-(\w+)/.exec(className || "");
                  const code = String(children).replace(/\n$/, "");

                  if (!inline && match) {
                    return (
                      <div className="my-6 relative group rounded-xl overflow-hidden border border-zinc-200 dark:border-white/5">
                        <div className="absolute top-3 left-4 text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                          {match[1]}
                        </div>
                        <button
                          onClick={() => copyToClipboard(code)}
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-zinc-200 dark:bg-zinc-800/80 hover:bg-zinc-300 dark:hover:bg-zinc-700 px-2 py-1 text-[10px] text-zinc-900 dark:text-white rounded transition-all"
                        >
                          COPY
                        </button>
                        <SyntaxHighlighter
                          style={theme === "dark" ? atomDark : prism}
                          language={match[1]}
                          PreTag="div"
                          className={`${theme === "dark" ? "!bg-zinc-900/50" : "!bg-zinc-50"} !p-6 !m-0 !pt-10`}
                        >
                          {code}
                        </SyntaxHighlighter>
                      </div>
                    );
                  }

                  return (
                    <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-blue-600 dark:text-blue-400 font-medium font-mono">
                      {children}
                    </code>
                  );
                },
              }}
            >
              {response}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-zinc-300 dark:text-zinc-800">
            <svg
              className="w-12 h-12 mb-4 opacity-20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <p className="text-sm font-medium">
              Submit your code to see the magic
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
