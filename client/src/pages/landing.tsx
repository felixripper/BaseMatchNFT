import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NFTVerificationModal } from "@/components/NFTVerificationModal";
import { useLocation } from "wouter";
import { Sparkles, Shield, Users, Heart, Coins } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BaseStats } from "@/components/BaseStats";
import heroImage from "@assets/generated_images/Hero_image_upscale_setting_5e417ba3.png";

export default function Landing() {
  const [showModal, setShowModal] = useState(false);
  const [, setLocation] = useLocation();

  const handleVerified = () => {
    setShowModal(false);
    setLocation("/discover");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-serif font-bold text-primary">Elite</h1>
          <Button
            data-testid="button-verify-header"
            onClick={() => setShowModal(true)}
            size="sm"
          >
            Verify NFT
          </Button>
        </div>
      </header>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Elite community"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-md rounded-full border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              NFT-Gated Exclusive Community on Base
            </span>
            <Badge variant="secondary" className="ml-2">
              <Coins className="w-3 h-3 mr-1" />
              Base Network
            </Badge>
          </div>

          <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
            Where Elite
            <br />
            Connections Happen
          </h2>

          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            An exclusive dating platform built on Base mainnet. Verify your NFT
            ownership to access a curated community of exceptional individuals in the Base ecosystem.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              data-testid="button-verify-hero"
              onClick={() => setShowModal(true)}
              size="lg"
              className="text-lg h-14 px-8"
            >
              Verify & Enter
            </Button>
            <Button
              data-testid="button-learn-more"
              onClick={() => setShowModal(true)}
              size="lg"
              variant="outline"
              className="text-lg h-14 px-8 bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-serif font-bold text-center mb-16">
            Why Elite?
          </h3>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold">Verified Members Only</h4>
              <p className="text-muted-foreground">
                NFT ownership verification ensures an exclusive, trusted
                community of exceptional individuals.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold">Curated Community</h4>
              <p className="text-muted-foreground">
                Connect with like-minded professionals who value quality,
                authenticity, and meaningful relationships.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold">Meaningful Matches</h4>
              <p className="text-muted-foreground">
                Our platform prioritizes quality connections over quantity,
                ensuring every match has potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-serif font-bold mb-4">
              Why Choose Base?
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built on Coinbase's Layer 2 solution for fast, secure, and cost-effective transactions
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <BaseStats />
          </div>
        </div>
      </section>

      <NFTVerificationModal
        open={showModal}
        onOpenChange={setShowModal}
        onVerified={handleVerified}
      />
    </div>
  );
}
