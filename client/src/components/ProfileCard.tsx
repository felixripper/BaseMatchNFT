import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, GraduationCap, Sparkles } from "lucide-react";

interface ProfileCardProps {
  id: string;
  name: string;
  age: number;
  location: string;
  imageUrl: string;
  bio: string;
  occupation?: string;
  education?: string;
  interests: string[];
  verified?: boolean;
}

export function ProfileCard({
  name,
  age,
  location,
  imageUrl,
  bio,
  occupation,
  education,
  interests,
  verified = true,
}: ProfileCardProps) {
  return (
    <Card className="overflow-hidden max-w-md mx-auto hover-elevate transition-all duration-300">
      <div className="relative aspect-[3/4]">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {verified && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-primary/90 backdrop-blur-md border-primary-border">
              <Sparkles className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h2 className="text-3xl font-serif font-bold mb-1">
            {name}, {age}
          </h2>
          <div className="flex items-center gap-1 text-sm text-white/90 mb-3">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <p className="text-sm text-foreground leading-relaxed">{bio}</p>

        <div className="space-y-2">
          {occupation && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Briefcase className="w-4 h-4" />
              <span>{occupation}</span>
            </div>
          )}
          {education && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <GraduationCap className="w-4 h-4" />
              <span>{education}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {interests.map((interest, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {interest}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}
