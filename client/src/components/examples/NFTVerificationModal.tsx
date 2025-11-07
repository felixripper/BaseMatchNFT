import { useState } from "react";
import { NFTVerificationModal } from "../NFTVerificationModal";
import { Button } from "@/components/ui/button";

export default function NFTVerificationModalExample() {
  const [open, setOpen] = useState(true);

  return (
    <div className="p-8">
      <Button onClick={() => setOpen(true)} data-testid="button-open-modal">
        Open Verification Modal
      </Button>
      <NFTVerificationModal
        open={open}
        onOpenChange={setOpen}
        onVerified={() => {
          console.log("NFT Verified!");
          setOpen(false);
        }}
      />
    </div>
  );
}
