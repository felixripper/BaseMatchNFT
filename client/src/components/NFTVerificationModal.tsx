import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wallet, CheckCircle2, Loader2 } from "lucide-react";
import { useAccount } from 'wagmi'
import { verifyNFTOwnership } from '@/lib/nftVerification'
import { useAuth } from '@/components/AuthProvider'
import { Wallet as OnchainWallet } from '@coinbase/onchainkit/wallet';

interface NFTVerificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerified: () => void;
}

export function NFTVerificationModal({
  open,
  onOpenChange,
  onVerified,
}: NFTVerificationModalProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const { address, isConnected } = useAccount()
  const { verifyWallet } = useAuth()

  const handleVerifyNFT = async () => {
    if (!isConnected || !address) return;

    setIsVerifying(true);
    try {
      const hasNFT = await verifyNFTOwnership(address);
      if (hasNFT) {
        await verifyWallet(address);
        onVerified();
      } else {
        alert('No NFT ownership detected. Please ensure you own an NFT on Base network.');
      }
    } catch (error) {
      console.error('Verification error:', error);
      alert('Verification failed. Please try again.');
    }
    setIsVerifying(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-center">
            Verify Your NFT
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            Connect your wallet to verify NFT ownership and access the exclusive
            community.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-6">
          {!isConnected ? (
            <div className="space-y-3">
              <div className="flex justify-center">
                <OnchainWallet />
              </div>
              <p className="text-sm text-center text-muted-foreground">
                Connect your wallet to access the exclusive BaseMatchNFT community
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-accent/50 p-3 rounded-md">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Wallet Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</span>
              </div>

              <Button
                data-testid="button-verify-nft"
                onClick={handleVerifyNFT}
                disabled={isVerifying}
                className="w-full h-12 text-base"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Verifying NFT Ownership...
                  </>
                ) : (
                  "Verify NFT Ownership"
                )}
              </Button>
            </div>
          )}

          <p className="text-xs text-center text-muted-foreground pt-2">
            Powered by Base Network • Low-cost transactions • Fast finality • Ethereum security
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
