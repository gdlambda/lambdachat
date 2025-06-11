import { api } from "@/convex/_generated/api";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";
import { fetchQuery } from "convex/nextjs";

export async function POST(request: Request) {
  const { messages, chatId, model } = await request.json();
  const message = messages[messages.length - 1].content;

  const messagesQuery = await fetchQuery(api.messages.getMessagesByChat, {
    chatId,
  });

  const messagesList = messagesQuery.map((message) => {
    return {
      role: message.fromUser ? ("user" as const) : ("assistant" as const),
      content: message.content,
    };
  });

  messagesList.push({
    role: "user" as const,
    content: message,
  });

  const openRouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const result = await streamText({
    model: openRouter(model),
    messages: messagesList,
  });

  return result.toDataStreamResponse();
}
