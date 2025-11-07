import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BottomNav } from "@/components/BottomNav";
import { X, Heart, Sparkles, MapPin, Briefcase } from "lucide-react";
import femaleProfile1 from "@assets/generated_images/Female_profile_example_one_9f1894cf.png";
import maleProfile1 from "@assets/generated_images/Male_profile_example_one_9c352f5e.png";
import femaleProfile2 from "@assets/generated_images/Female_profile_example_two_3145a372.png";
import maleProfile2 from "@assets/generated_images/Male_profile_example_two_d149dde9.png";
import { Badge } from "@/components/ui/badge";

const profiles = [
  {
    id: "1",
    name: "Sophia",
    age: 28,
    location: "New York, NY",
    imageUrl: femaleProfile1,
    bio: "Art curator with a passion for contemporary design. Love exploring hidden galleries and rooftop bars.",
    occupation: "Art Curator at MoMA",
    interests: ["Art", "Wine", "Travel"],
  },
  {
    id: "2",
    name: "James",
    age: 32,
    location: "San Francisco, CA",
    imageUrl: maleProfile1,
    bio: "Tech entrepreneur and angel investor. When I'm not building startups, you'll find me sailing or at jazz clubs.",
    occupation: "CEO & Founder",
    interests: ["Startups", "Sailing", "Jazz"],
  },
  {
    id: "3",
    name: "Isabella",
    age: 26,
    location: "Los Angeles, CA",
    imageUrl: femaleProfile2,
    bio: "Fashion designer and sustainability advocate. Creating the future of eco-luxury fashion.",
    occupation: "Creative Director",
    interests: ["Fashion", "Sustainability", "Yoga"],
  },
  {
    id: "4",
    name: "Alexander",
    age: 30,
    location: "Miami, FL",
    imageUrl: maleProfile2,
    bio: "Investment banker with a love for adventure. Skydiving on weekends, conquering markets on weekdays.",
    occupation: "Senior VP at Goldman Sachs",
    interests: ["Finance", "Skydiving", "Poker"],
  },
];

export default function Discover() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentProfile = profiles[currentIndex];

  const handleAction = (action: "pass" | "like") => {
    console.log(`${action} on ${currentProfile?.name}`);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % profiles.length);
      setIsAnimating(false);
    }, 300);
  };

  if (!currentProfile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pb-20">
        <p className="text-muted-foreground">No more profiles</p>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-serif font-bold text-primary">Elite</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-8">
        <Card
          className={`overflow-hidden transition-all duration-300 ${
            isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          <div className="relative aspect-[3/4]">
            <img
              src={currentProfile.imageUrl}
              alt={currentProfile.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute top-4 right-4">
              <Badge className="bg-primary/90 backdrop-blur-md border-primary-border">
                <Sparkles className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="text-3xl font-serif font-bold mb-1">
                {currentProfile.name}, {currentProfile.age}
              </h2>
              <div className="flex items-center gap-1 text-sm text-white/90 mb-2">
                <MapPin className="w-4 h-4" />
                <span>{currentProfile.location}</span>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <p className="text-sm text-foreground leading-relaxed">
              {currentProfile.bio}
            </p>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Briefcase className="w-4 h-4" />
              <span>{currentProfile.occupation}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {currentProfile.interests.map((interest, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </Card>

        <div className="flex items-center justify-center gap-6 mt-8">
          <Button
            data-testid="button-pass"
            onClick={() => handleAction("pass")}
            size="icon"
            variant="outline"
            className="w-16 h-16 rounded-full border-2"
          >
            <X className="w-8 h-8" />
          </Button>

          <Button
            data-testid="button-like"
            onClick={() => handleAction("like")}
            size="icon"
            className="w-20 h-20 rounded-full"
          >
            <Heart className="w-10 h-10" />
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
