"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { MessageItem } from "./MessageItem";
import { Id } from "@/convex/_generated/dataModel";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { useEffect, useRef } from "react";

export function MessagesList({ chatId }: { chatId: Id<"chats"> }) {
  const messages = useQuery(api.messages.getMessagesByChat, { chatId });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive or when streaming
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <ScrollArea className="h-full w-full">
      <div className="flex flex-col space-y-4 p-4 min-h-full">
        {messages?.map((message) => (
          <MessageItem
            key={message._id}
            message={message.content}
            sender={message.fromUser ? "You" : "AI"}
          />
        ))}
        {/* Invisible element to scroll to */}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
}
