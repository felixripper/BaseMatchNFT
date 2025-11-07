import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, Zap, Shield, Activity } from "lucide-react";

export function BaseStats() {
  return (
    <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5 text-blue-600" />
        Base Network Stats
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Coins className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium">Gas Fees</span>
          </div>
          <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
            ~$0.01
          </Badge>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Zap className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-medium">Finality</span>
          </div>
          <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
            ~2s
          </Badge>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Shield className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium">Security</span>
          </div>
          <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
            Ethereum L2
          </Badge>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Activity className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium">TPS</span>
          </div>
          <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-800">
            10k+
          </Badge>
        </div>
      </div>
    </Card>
  );
}