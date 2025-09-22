"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const formatAssistantMessage = (text: string) =>
    text.split("\n\n").map((para, i) => (
      <p key={i} className="mb-2">
        {para}
      </p>
    ));

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agent_id: "ag:979d4a09:20250922:technical-care-expert:667f0bc8",
          messages: [{ role: "user", content: userMessage.content }],
        }),
      });

      const data = await res.json();
      const reply = data.reply || "No response";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error connecting to agent." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4 text-white">
      <div className="w-full max-w-3xl flex flex-col h-[80vh] bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
   
        <div className="bg-gray-900 p-4 md:p-6 flex items-center justify-between border-b border-gray-700 rounded-t-3xl">
          <div className="flex items-center space-x-3">
            <img src="/support.png" alt="Agent" className="w-10 h-10 rounded-full" />
            <h1 className="text-lg md:text-2xl font-bold">Technical Care Expert</h1>
          </div>
          <span className="text-xs md:text-sm text-gray-400">
            Internet, Fiber, Voice & IPTV
          </span>
        </div>

  
        <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex items-start space-x-3 ${
                m.role === "user" ? "justify-end ml-auto" : "justify-start mr-auto"
              }`}
            >
              {m.role === "assistant" && (
                <img src="/support.png" alt="Agent" className="w-8 h-8 rounded-full flex-shrink-0" />
              )}
              <div
                className={`p-3 md:p-4 rounded-2xl max-w-[75%] break-words shadow ${
                  m.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-100 border border-gray-600"
                }`}
              >
                {m.role === "assistant"
                  ? formatAssistantMessage(m.content)
                  : m.content}
              </div>
            </div>
          ))}
          {loading && <div className="text-gray-400 italic">Assistant is typing...</div>}
          <div ref={messagesEndRef} />
        </div>

     
        <div className="flex items-center p-4 md:p-6 border-t border-gray-700 bg-gray-800">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Describe your internet, fiber, voice, or IPTV issue..."
            className="flex-1 bg-gray-700 text-white border border-gray-600 rounded-full px-4 py-3 mr-2 md:mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-4 md:px-6 py-2 md:py-3 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 disabled:opacity-50 transition"
          >
            Send
          </button>
        </div>

 
        <footer className="bg-gray-700 text-gray-300 text-center py-2 hover:text-yellow-500 transition cursor-pointer">
          <a href="https://technical-care-expert.vercel.app" target="_blank" rel="noopener noreferrer">
            Technical Care Expert
          </a>
        </footer>
      </div>
    </main>
  );
}

