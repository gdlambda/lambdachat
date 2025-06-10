"use client";

import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { useChat } from "@ai-sdk/react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export function MessageInput({ chatId }: { chatId: Id<"chats"> }) {
  const addMessage = useMutation(api.messages.createMessage);

  const { input, handleInputChange, handleSubmit, status } = useChat({
    api: `/api/chat/${chatId}`,
    body: {
      chatId,
    },
    onFinish: async (message) => {
      await addMessage({
        chatId,
        fromUser: false,
        content: message.content,
      });
    },
    onError: (error) => {
      console.error("Chat error:", error);
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
    <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
      <Input
        value={input}
        onChange={handleInputChange}
        placeholder={
          status === "ready" ? "Type a message..." : "Generating response..."
        }
        disabled={status === "streaming" || status === "submitted"}
      />
      <Button
        type="submit"
        variant="outline"
        disabled={status === "streaming" || status === "submitted"}
      >
        {status === "streaming" ? "..." : "Send"}
      </Button>
    </form>
  );
}
