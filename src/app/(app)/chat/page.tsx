"use client";

import { useState, useEffect, useRef } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { findAnswer } from "@/lib/answers";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useLocalStorage<Message[]>(
    "chat-history",
    []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // تأخیر مصنوعی (مثل اینکه داره فکر می‌کنه)
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 + Math.random() * 1500)
      );

      // جواب رو از دیتابیس محلی بگیر
      const answer = findAnswer(userMessage.content);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: answer,
      };

      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "خطا در ارتباط. لطفاً دوباره امتحان کن.",
      };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    if (confirm("همه‌ی چت پاک بشه؟")) {
      setMessages([]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      {/* هدر */}
      <header className="text-center py-3 border-b border-gray-100 bg-white">
        <div className="flex items-center justify-center gap-2">
          <span className="text-3xl">🤖</span>
          <div>
            <h1 className="text-lg font-bold text-purple-800">
              دستیار مادریار
            </h1>
            <p className="text-[10px] text-gray-500">
              هر سوالی داری بپرس
            </p>
          </div>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearChat}
            className="text-[10px] text-gray-400 mt-1 hover:text-red-500"
          >
            🗑️ پاک کردن چت
          </button>
        )}
      </header>

      {/* پیام‌ها */}
      <div className="flex-1 overflow-y-auto py-4 space-y-3 px-1">
        {messages.length === 0 ? (
          <div className="text-center space-y-4 mt-10">
            <div className="text-6xl">💜</div>
            <h2 className="text-base font-bold text-gray-700">
              سلام! من مادریارم
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed px-6">
              هر سوالی درباره خودت یا بچه‌ت داری بپرس. من اینجام که کمکت کنم.
            </p>
            <div className="space-y-2 pt-4 px-2">
              <p className="text-[10px] text-gray-400 font-bold">
                💡 یا از اینا شروع کن:
              </p>
              {[
                "چطور با لجبازی بچه‌م کنار بیام؟",
                "بچه‌م شب‌ها نمی‌خوابه، چیکار کنم؟",
                "خسته‌ام، چطور به خودم برسم؟",
                "چطور به بچه‌م مسئولیت بدم؟",
              ].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(q)}
                  className="block w-full text-right bg-pink-50 hover:bg-pink-100 text-xs text-pink-700 rounded-2xl p-3 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 ${
                    message.role === "user"
                      ? "bg-gradient-to-l from-pink-500 to-purple-500 text-white"
                      : "bg-white border border-gray-100 text-gray-800 shadow-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm">
                  <div className="flex gap-1">
                    <span
                      className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0s" }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* ورودی */}
      <div className="border-t border-gray-100 bg-white pt-3 pb-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="سوالت رو بنویس..."
            disabled={loading}
            className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-purple-400 disabled:opacity-50"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="bg-gradient-to-l from-pink-500 to-purple-500 text-white rounded-2xl px-5 font-bold text-sm disabled:opacity-50 active:scale-95 transition-all"
          >
            ارسال
          </button>
        </div>
      </div>
    </div>
  );
}