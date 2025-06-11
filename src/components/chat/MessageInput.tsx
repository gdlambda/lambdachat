"use client";

import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

interface MessageInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  status: "ready" | "streaming" | "submitted" | "error";
  model: string;
  setModel: (model: string) => void;
}

export function MessageInput({
  input,
  handleInputChange,
  handleSubmit,
  status,
  model,
  setModel,
}: MessageInputProps) {
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        value={input}
        onChange={handleInputChange}
        placeholder={
          status === "ready" ? "Type a message..." : "Generating response..."
        }
      />
      <Select value={model} onValueChange={setModel}>
        <SelectTrigger>
          <SelectValue placeholder="Model" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="deepseek/deepseek-chat-v3-0324:free">
            DeepSeek V3 0324
          </SelectItem>
          <SelectItem value="google/gemini-2.0-flash-exp:free">
            Gemini 2.0 Flash Exp
          </SelectItem>
          <SelectItem value="qwen/qwen3-235b-a22b:free">
            Qwen 3.235B A22B
          </SelectItem>
          <SelectItem value="nvidia/llama-3.1-nemotron-ultra-253b-v1:free">
            Llama 3.1 Nemotron Ultra 253B
          </SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit" variant="outline">
        {status === "streaming" ? "..." : "Send"}
      </Button>
    </form>
  );
}
