import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { useCreateOpenaiConversation, useGetOpenaiConversation } from "@workspace/api-client-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

export default function S2() {
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const createConversation = useCreateOpenaiConversation();

  useEffect(() => {
    createConversation.mutate(
      { title: "S2 Chat" },
      {
        onSuccess: (data) => {
          setConversationId(data.id);
          setIsInitializing(false);
        },
        onError: () => {
          setIsInitializing(false);
        },
      }
    );
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading || !conversationId) return;

    const userContent = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userContent }]);
    setIsLoading(true);

    const streamingMsg: Message = { role: "assistant", content: "", isStreaming: true };
    setMessages((prev) => [...prev, streamingMsg]);

    try {
      const response = await fetch(`/api/openai/conversations/${conversationId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: userContent }),
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6).trim();
            if (!data) continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                setMessages((prev) => {
                  const updated = [...prev];
                  const last = updated[updated.length - 1];
                  if (last?.isStreaming) {
                    updated[updated.length - 1] = {
                      ...last,
                      content: last.content + parsed.content,
                    };
                  }
                  return updated;
                });
              }
              if (parsed.done) {
                setMessages((prev) => {
                  const updated = [...prev];
                  const last = updated[updated.length - 1];
                  if (last?.isStreaming) {
                    updated[updated.length - 1] = { ...last, isStreaming: false };
                  }
                  return updated;
                });
              }
            } catch {}
          }
        }
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last?.isStreaming) {
          updated[updated.length - 1] = {
            role: "assistant",
            content: "Something went wrong. Please try again.",
            isStreaming: false,
          };
        }
        return updated;
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const suggestions = [
    "What does LPT Realty's cap structure look like?",
    "How do I use the CRM to track my pipeline?",
    "Walk me through the onboarding process.",
    "What OREA forms do I need for an offer?",
  ];

  return (
    <div className="flex-1 w-full flex flex-col min-h-0">
      {/* Header */}
      <div className="w-full border-b border-border bg-white px-4 py-6">
        <div className="container mx-auto max-w-3xl">
          <span className="text-secondary text-sm font-medium tracking-wide uppercase">S2</span>
          <h1 className="text-3xl font-serif text-primary mt-1 mb-2">Ask S2 anything.</h1>
          <p className="text-sm text-muted-foreground">
            S2 is the digital version of Stu. Direct, useful, grounded. Ask about LPT Realty, onboarding, CRM usage, Ontario paperwork, OREA basics, or day-to-day workflow.
          </p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-3xl px-4 py-6">
          {isInitializing ? (
            <div className="flex items-center gap-2 text-muted-foreground text-sm py-8">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
              <span>Starting session...</span>
            </div>
          ) : messages.length === 0 ? (
            <div className="py-8">
              <p className="text-muted-foreground text-sm mb-6">What would you like to know?</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setInput(s);
                      setTimeout(() => inputRef.current?.focus(), 50);
                    }}
                    className="text-left text-sm px-4 py-3 rounded-lg border border-border bg-white hover:border-primary/30 hover:bg-background transition-colors text-muted-foreground hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-3 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-white border border-border text-foreground"
                      }`}
                    >
                      {msg.content || (msg.isStreaming && (
                        <span className="inline-flex gap-1">
                          <span className="w-1 h-1 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0ms]" />
                          <span className="w-1 h-1 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:150ms]" />
                          <span className="w-1 h-1 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:300ms]" />
                        </span>
                      ))}
                      {msg.role === "assistant" && msg.isStreaming && msg.content && (
                        <span className="inline-block w-0.5 h-3.5 bg-muted-foreground/50 animate-pulse ml-0.5 align-middle" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-white">
        <div className="container mx-auto max-w-3xl px-4 py-4">
          <div className="flex gap-3 items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask S2 a question..."
              disabled={isInitializing || isLoading}
              rows={1}
              className="flex-1 resize-none border border-border rounded-lg px-4 py-3 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 leading-relaxed max-h-32 overflow-y-auto"
              style={{ minHeight: "44px" }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading || isInitializing || !conversationId}
              className="h-11 w-11 shrink-0 flex items-center justify-center bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Press Enter to send. Shift+Enter for a new line.</p>
        </div>
      </div>
    </div>
  );
}
