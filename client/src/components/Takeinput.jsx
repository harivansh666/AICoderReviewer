import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Response } from "../context/Response.context";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import toast from "react-hot-toast";

export default function Takeinput() {
  const [input, setInput] = useState("");
  const { setresponse, isloading, setIsLoading } = useContext(Response);

  useEffect(() => {
    Prism.highlightAll();
  }, [input]);

  const handleClear = () => {
    setInput("");
    setresponse("");
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.error("Please enter some code!");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:8080/ai/get-review", {
        code: input,
      });
      setresponse(response.data);
      toast.success("Review generated!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to get review");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="basis-1/2 flex flex-col h-full bg-zinc-50/50 dark:bg-zinc-900/40 border-r border-zinc-200 dark:border-white/5 p-6 transition-colors">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Code Review
          </h2>
          <p className="text-zinc-500 dark:text-zinc-500 text-sm">
            Paste your code below to get AI feedback
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleClear}
            className="px-4 py-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white text-sm font-medium transition-all"
          >
            Clear
          </button>
          <button
            onClick={handlesubmit}
            disabled={isloading}
            className={`px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95 ${
              isloading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isloading ? "Analyzing..." : "Review Code"}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-950/50 shadow-sm dark:shadow-inner group focus-within:border-blue-500/30 transition-all">
        <textarea
          className="w-full h-full p-6 bg-transparent text-zinc-800 dark:text-zinc-200 font-mono text-sm resize-none focus:outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-700"
          placeholder="// Paste your code here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </div>
  );
}
