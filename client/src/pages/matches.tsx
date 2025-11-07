import { BottomNav } from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import femaleProfile1 from "@assets/generated_images/Female_profile_example_one_9f1894cf.png";
import maleProfile1 from "@assets/generated_images/Male_profile_example_one_9c352f5e.png";
import femaleProfile2 from "@assets/generated_images/Female_profile_example_two_3145a372.png";

const matches = [
  {
    id: "1",
    name: "Sophia",
    age: 28,
    imageUrl: femaleProfile1,
    matchedAt: "2 hours ago",
    preview: "Love your taste in art! Have you been to...",
  },
  {
    id: "2",
    name: "James",
    age: 32,
    imageUrl: maleProfile1,
    matchedAt: "1 day ago",
    preview: "That sailing photo is amazing! Where was...",
  },
  {
    id: "3",
    name: "Isabella",
    age: 26,
    imageUrl: femaleProfile2,
    matchedAt: "3 days ago",
    preview: "Would love to hear more about your...",
  },
];

export default function Matches() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-serif font-bold">Matches</h1>
          <Badge variant="secondary" className="text-xs">
            {matches.length} New
          </Badge>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        <div className="space-y-4">
          {matches.map((match) => (
            <Card
              key={match.id}
              className="p-4 hover-elevate active-elevate-2 cursor-pointer transition-all"
              onClick={() => setLocation("/messages")}
              data-testid={`match-${match.id}`}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden">
                    <img
                      src={match.imageUrl}
                      alt={match.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-1 -right-1">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-primary-foreground" />
                    </div>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <h3 className="text-lg font-semibold">
                      {match.name}, {match.age}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground truncate mb-2">
                    {match.preview}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Matched {match.matchedAt}
                  </p>
                </div>

                <Button
                  data-testid={`button-message-${match.id}`}
                  size="icon"
                  variant="ghost"
                  className="shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLocation("/messages");
                  }}
                >
                  <MessageCircle className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {matches.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No matches yet</h3>
            <p className="text-muted-foreground mb-6">
              Start swiping to find your perfect match
            </p>
            <Button
              data-testid="button-start-swiping"
              onClick={() => setLocation("/discover")}
            >
              Start Discovering
            </Button>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
