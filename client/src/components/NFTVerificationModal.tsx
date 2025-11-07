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
  const [isConnecting, setIsConnecting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsConnecting(false);
    setWalletConnected(true);
  };

  const handleVerifyNFT = async () => {
    setIsVerifying(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsVerifying(false);
    onVerified();
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
          {!walletConnected ? (
            <div className="space-y-3">
              <Button
                data-testid="button-connect-metamask"
                onClick={handleConnectWallet}
                disabled={isConnecting}
                className="w-full h-12 text-base"
                variant="outline"
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Wallet className="w-5 h-5 mr-2" />
                    Connect MetaMask
                  </>
                )}
              </Button>

              <Button
                data-testid="button-connect-wallet"
                onClick={handleConnectWallet}
                disabled={isConnecting}
                className="w-full h-12 text-base"
                variant="outline"
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Wallet className="w-5 h-5 mr-2" />
                    WalletConnect
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-accent/50 p-3 rounded-md">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Wallet Connected</span>
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
            Powered by Base Network
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
