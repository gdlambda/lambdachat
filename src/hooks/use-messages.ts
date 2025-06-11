import { Id } from "@/convex/_generated/dataModel";
import { useQueryClient } from "@tanstack/react-query";

export function useMessages(chatId: Id<"chats">): {
  messagesList: { _id: string; content: string; fromUser: boolean }[];
  isLoading: boolean;
} {
  const queryClient = useQueryClient();
  const messages = queryClient.getQueryData(["messages", chatId]);

  return {
    messagesList: messages as {
      _id: string;
      content: string;
      fromUser: boolean;
    }[],
    isLoading: !messages,
  };
}
