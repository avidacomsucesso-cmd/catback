import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LoyaltyCard } from "@/hooks/use-loyalty-cards";
import LoyaltyCardVisual from "./LoyaltyCardVisual";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface LoyaltyCardViewModalProps {
  card: LoyaltyCard;
  isOpen: boolean;
  onClose: () => void;
}

const LoyaltyCardViewModal: React.FC<LoyaltyCardViewModalProps> = ({ card, isOpen, onClose }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset flip state when modal opens/closes
  React.useEffect(() => {
    if (!isOpen) {
        setIsFlipped(false);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="text-catback-purple">Visualização do Cartão</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{card.name}</h3>
                <Badge 
                    className={cn(
                        "text-xs font-medium",
                        card.is_active ? "bg-catback-success-green hover:bg-catback-success-green/90" : "bg-gray-500 hover:bg-gray-600"
                    )}
                >
                    {card.is_active ? "Ativo" : "Inativo"}
                </Badge>
            </div>
            
            <LoyaltyCardVisual 
                card={card} 
                isFlipped={isFlipped} 
                onFlip={() => setIsFlipped(!isFlipped)}
            />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoyaltyCardViewModal;