import { BottomNav } from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Edit, Sparkles, MapPin, Briefcase, GraduationCap, Moon, Sun, Coins } from "lucide-react";
import { Identity } from '@coinbase/onchainkit/identity';
import { NFTCard } from '@coinbase/onchainkit/nft';
import { useFarcaster } from '@/components/FarcasterProvider';
import femaleProfile1 from "@assets/generated_images/Female_profile_example_one_9f1894cf.png";
import { useTheme } from "@/components/ThemeProvider";

export default function Profile() {
  const { theme, setTheme } = useTheme();
  const { context, shareToFarcaster, isInFarcaster } = useFarcaster();

  const profile = {
    name: "Sophia",
    age: 28,
    location: "New York, NY",
    imageUrl: femaleProfile1,
    bio: "Art curator with a passion for contemporary design. Love exploring hidden galleries and rooftop bars.",
    occupation: "Art Curator at MoMA",
    education: "Columbia University",
    interests: ["Art", "Wine", "Travel", "Architecture", "Photography", "Jazz"],
  };

  const handleShareProfile = () => {
    const profileText = `Check out my profile on BaseMatchNFT! ${profile.bio} #BaseMatchNFT #NFTDating #Farcaster`;
    shareToFarcaster(profileText);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-serif font-bold">Profile</h1>
          <div className="flex gap-2">
            <Button
              data-testid="button-theme-toggle"
              size="icon"
              variant="ghost"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
            <Button data-testid="button-settings" size="icon" variant="ghost">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        <Card className="overflow-hidden">
          <div className="relative aspect-[3/4]">
            <img
              src={profile.imageUrl}
              alt={profile.name}
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
                {profile.name}, {profile.age}
              </h2>
              <div className="flex items-center gap-1 text-sm text-white/90">
                <MapPin className="w-4 h-4" />
                <span>{profile.location}</span>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex justify-end">
              <Button data-testid="button-edit-profile" variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                About
              </h3>
              <p className="text-sm leading-relaxed">{profile.bio}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">{profile.occupation}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">{profile.education}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, index) => (
                  <Badge key={index} variant="secondary">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>

                <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Farcaster Integration</h3>
          <div className="space-y-3">
            {isInFarcaster && context?.user ? (
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                {context.user.pfp && (
                  <img
                    src={context.user.pfp}
                    alt="Farcaster Profile"
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div>
                  <div className="font-medium">{context.user.displayName || context.user.username}</div>
                  <div className="text-sm text-muted-foreground">@{context.user.username}</div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                Connect with Farcaster to share your profile and connect with the decentralized social network.
              </div>
            )}
            <Button
              onClick={handleShareProfile}
              variant="outline"
              className="w-full"
              disabled={!isInFarcaster}
            >
              Share Profile on Farcaster
            </Button>
          </div>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
}
