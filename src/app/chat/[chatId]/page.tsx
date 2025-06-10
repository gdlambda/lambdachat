import { Id } from "@/convex/_generated/dataModel";
import { ChatContainer } from "@/src/components/chat/ChatContainer";
import { AppSidebar } from "@/src/components/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/src/components/ui/sidebar";
import { Separator } from "@/src/components/ui/separator";
import { BreadcrumbTitle } from "@/src/components/sidebar/breadcrumb-title";
import { SignedIn, UserButton } from "@clerk/nextjs";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ chatId: Id<"chats"> }>;
}) {
  const { chatId } = await params;

  return (
    <div className="h-screen overflow-hidden">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex flex-col h-screen">
          {/* Fixed header at top */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white z-10 sticky top-0">
            <div className="flex items-center gap-2 px-3">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <BreadcrumbTitle chatId={chatId} />
            </div>
            <div className="ml-auto mr-4">
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>

          {/* Chat container takes remaining space */}
          <div className="flex-1 overflow-hidden">
            <ChatContainer chatId={chatId} />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
