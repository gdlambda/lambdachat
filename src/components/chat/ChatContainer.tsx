"use client";

import { MessagesList } from "./MessagesList";
import { MessageInput } from "./MessageInput";
import { Id } from "@/convex/_generated/dataModel";

export function ChatContainer({ chatId }: { chatId: Id<"chats"> }) {
  return (
    <div className="h-full flex flex-col relative">
      {/* Messages area with fixed height and scroll */}
      <div className="flex-1 overflow-hidden">
        <MessagesList chatId={chatId} />
      </div>

      {/* Input area fixed at bottom */}
      <div className="shrink-0 border-t bg-white/95 backdrop-blur-sm">
        <div className="p-4">
          <MessageInput chatId={chatId} />
        </div>
      </div>
    </div>
  );
}
