import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import femaleProfile1 from "@assets/generated_images/Female_profile_example_one_9f1894cf.png";

const conversations = [
  {
    id: "1",
    name: "Sophia",
    imageUrl: femaleProfile1,
    lastMessage: "That sounds amazing!",
    timestamp: "2m ago",
    unread: true,
  },
];

export default function Messages() {
  const [, setLocation] = useLocation();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: "1", text: "Hi! I loved your profile", sender: "them", time: "10:30 AM" },
    { id: "2", text: "Thank you! Your art collection is impressive", sender: "me", time: "10:32 AM" },
    { id: "3", text: "Have you been to the new gallery opening downtown?", sender: "them", time: "10:35 AM" },
    { id: "4", text: "Not yet, but I've been meaning to go. Want to check it out together?", sender: "me", time: "10:37 AM" },
    { id: "5", text: "That sounds amazing!", sender: "them", time: "10:38 AM" },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        text: message,
        sender: "me",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setMessage("");
    console.log("Message sent:", message);
  };

  if (selectedChat) {
    const chat = conversations.find((c) => c.id === selectedChat);
    if (!chat) return null;

    return (
      <div className="min-h-screen bg-background pb-20 flex flex-col">
        <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
          <div className="max-w-md mx-auto px-4 h-16 flex items-center gap-4">
            <Button
              data-testid="button-back"
              size="icon"
              variant="ghost"
              onClick={() => setSelectedChat(null)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={chat.imageUrl}
                  alt={chat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-lg font-semibold">{chat.name}</h2>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto max-w-md mx-auto w-full px-4 py-6">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                    msg.sender === "me"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card"
                  }`}
                  data-testid={`message-${msg.id}`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.sender === "me"
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>

        <div className="sticky bottom-16 bg-background border-t border-border">
          <div className="max-w-md mx-auto px-4 py-4 flex gap-2">
            <Input
              data-testid="input-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-1"
            />
            <Button
              data-testid="button-send"
              onClick={handleSend}
              size="icon"
              disabled={!message.trim()}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-serif font-bold">Messages</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        <div className="space-y-4">
          {conversations.map((conv) => (
            <Card
              key={conv.id}
              className="p-4 hover-elevate active-elevate-2 cursor-pointer transition-all"
              onClick={() => setSelectedChat(conv.id)}
              data-testid={`conversation-${conv.id}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden shrink-0">
                  <img
                    src={conv.imageUrl}
                    alt={conv.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <h3 className="text-lg font-semibold">{conv.name}</h3>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {conv.timestamp}
                    </span>
                  </div>
                  <p
                    className={`text-sm truncate ${
                      conv.unread ? "text-foreground font-medium" : "text-muted-foreground"
                    }`}
                  >
                    {conv.lastMessage}
                  </p>
                </div>

                {conv.unread && (
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                )}
              </div>
            </Card>
          ))}
        </div>

        {conversations.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Send className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No messages yet</h3>
            <p className="text-muted-foreground mb-6">
              Start a conversation with your matches
            </p>
            <Button
              data-testid="button-view-matches"
              onClick={() => setLocation("/matches")}
            >
              View Matches
            </Button>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
