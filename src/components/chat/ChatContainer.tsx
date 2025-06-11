"use client";

import { MessagesList } from "./MessagesList";
import { MessageInput } from "./MessageInput";
import { Id } from "@/convex/_generated/dataModel";
import { useChat } from "@ai-sdk/react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";

export function ChatContainer({ chatId }: { chatId: Id<"chats"> }) {
  const addMessage = useMutation(api.messages.createMessage);
  const [model, setModel] = useState("deepseek/deepseek-chat-v3-0324:free");

  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    api: `/api/chat/${chatId}`,
    body: { chatId, model },
    onFinish: async (message) => {
      // Only save to Convex when streaming is complete
      await addMessage({
        chatId,
        fromUser: false,
        content: message.content,
      });
    },
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await addMessage({
      chatId,
      fromUser: true,
      content: input,
    });

    handleSubmit(e);
  };

  return (
    <div className="h-full flex flex-col relative">
      {/* Messages area with fixed height and scroll */}
      <div className="flex-1 overflow-hidden">
        <MessagesList
          chatId={chatId}
          streamingMessage={
            messages[messages.length - 1]?.role === "assistant" &&
            status === "streaming"
              ? messages[messages.length - 1]
              : undefined
          }
        />
      </div>

      {/* Input area fixed at bottom */}
      <div className="shrink-0 border-t backdrop-blur-sm">
        <div className="p-4">
          <MessageInput
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleFormSubmit}
            model={model}
            setModel={setModel}
            status={status}
          />
        </div>
      </div>
    </div>
  );
}
