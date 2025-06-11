"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { MessageItem } from "./MessageItem";
import { Id } from "@/convex/_generated/dataModel";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { useEffect, useRef, useMemo } from "react";
import type { Message } from "ai";

interface MessagesListProps {
  chatId: Id<"chats">;
  streamingMessage?: Message;
}

export function MessagesList({ chatId, streamingMessage }: MessagesListProps) {
  const persistedMessages = useQuery(api.messages.getMessagesByChat, {
    chatId,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Merge persisted messages with streaming messages
  const allMessages = useMemo(() => {
    const persisted =
      persistedMessages?.map((msg) => ({
        id: msg._id,
        content: msg.content,
        role: msg.fromUser ? "user" : "assistant",
        fromUser: msg.fromUser,
      })) || [];

    // Filter out streaming messages that are already persisted
    const streamingOnly = streamingMessage ? [streamingMessage] : [];

    return [...persisted, ...streamingOnly];
  }, [persistedMessages, streamingMessage]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessages]);

  return (
    <ScrollArea className="h-full w-full">
      <div className="flex flex-col space-y-4 p-4 min-h-full">
        {allMessages.map((message, index) => (
          <MessageItem
            key={message.id || `temp-${index}`}
            message={message.content}
            sender={message.role === "user" ? "You" : "AI"}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
}
