"use client";

import { AppSidebar } from "@/src/components/sidebar/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/src/components/ui/breadcrumb";
import { Separator } from "@/src/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/src/components/ui/sidebar";
import { SignedIn, UserButton } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { redirect } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";

export default function Page() {
  const createChat = useMutation(api.chats.createChat);
  const [open, setOpen] = useState(true);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b z-10 sticky top-0">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Create New Chat</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto mr-4">
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
        {/* Dialog should trigger on load also has an input element for chat name */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new chat</DialogTitle>
              <DialogDescription>
                Create a new chat with a new AI assistant
              </DialogDescription>
            </DialogHeader>
            <form
              action={async (formData) => {
                const name = formData.get("chatName");
                const chatId = await createChat({ name: name as string });
                return redirect(`/chat/${chatId}`);
              }}
            >
              <Input
                type="text"
                placeholder="Chat name"
                className="mb-4"
                name="chatName"
              />
              <Button type="submit">Create</Button>
            </form>
          </DialogContent>
        </Dialog>
      </SidebarInset>
    </SidebarProvider>
  );
}
