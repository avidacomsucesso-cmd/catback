import React from "react";
import { LoyaltyCard } from "@/hooks/use-loyalty-cards";
import { Cat, RotateCw, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import * as QRCode from "qrcode.react"; // Usando importação de namespace para compatibilidade

interface LoyaltyCardVisualProps {
  card: LoyaltyCard;
  isFlipped: boolean;
  onFlip?: () => void;
  showFlipButton?: boolean;
  customerCardId?: string; // Pass the specific customer card ID if available
}

const LoyaltyCardVisual: React.FC<LoyaltyCardVisualProps> = ({ card, isFlipped, onFlip, showFlipButton = true, customerCardId }) => {
  const requiredStamps = card.config?.stamp_count || 12;
  const stampsArray = Array.from({ length: requiredStamps }, (_, i) => i + 1);

  // The URL the QR code will encode: directs the merchant to the specific customer card detail page
  const qrCodeValue = customerCardId 
    ? `${window.location.origin}/dashboard/loyalty/card/${customerCardId}`
    : `${window.location.origin}/enroll?id=${card.id}`; // Fallback for enrollment link if no customerCardId is provided (used in share modal)

  const displayCode = customerCardId ? customerCardId.substring(0, 6).toUpperCase() : card.id.substring(0, 6).toUpperCase();
  
  const QRCodeComponent = (QRCode as any).default || QRCode;

  return (
    <div className="space-y-4">
        <div className="relative w-full h-64 perspective-1000">
        <div
            className={cn(
            "absolute w-full h-full transition-transform duration-700 preserve-3d",
            isFlipped ? "rotate-y-180" : ""
            )}
        >
            {/* Card Front (QR Code View) */}
            <div className="absolute w-full h-full backface-hidden rounded-xl p-4 bg-gray-200 dark:bg-gray-700 shadow-lg flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-gray-400 mb-2 overflow-hidden">
                {/* Placeholder for Avatar/Logo */}
                <Cat className="w-full h-full p-2 text-gray-600" />
            </div>
            <p className="font-semibold text-gray-800 dark:text-gray-200">
                {card.name}
            </p>
            <div className="w-28 h-28 bg-white p-1 rounded-md mt-2">
                <QRCodeComponent 
                    value={qrCodeValue} 
                    size={100} 
                    level="H" 
                    renderAs="svg"
                    className="w-full h-full"
                />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-mono">
                {displayCode}
            </p>
            </div>

            {/* Card Back (Stamp Progress View) */}
            <div className="absolute w-full h-full backface-hidden rounded-xl p-4 bg-gray-800 dark:bg-gray-900 shadow-lg flex flex-col justify-center text-center rotate-y-180">
            <p className="font-semibold text-white mb-3">
                Recompensa: {card.reward_description}
            </p>
            {card.type === 'stamps' && (
                <div className="grid grid-cols-4 gap-3 max-w-xs mx-auto">
                {stampsArray.map((num) => (
                    <div
                    key={num}
                    className="w-10 h-10 rounded-full border-2 border-gray-500 flex items-center justify-center text-sm font-bold text-gray-400 bg-gray-900/50"
                    >
                    {num}
                    </div>
                ))}
                </div>
            )}
            {card.type !== 'stamps' && (
                <p className="text-gray-400 text-sm">Visualização de {card.type} em desenvolvimento.</p>
            )}
            </div>
        </div>
        </div>
        
        {showFlipButton && onFlip && (
            <Button 
                variant="outline" 
                size="sm" 
                onClick={onFlip}
                className="w-full text-catback-purple border-catback-purple/50 hover:bg-catback-light-purple/20"
            >
                <RotateCw className="w-4 h-4 mr-2" /> Girar Cartão
            </Button>
        )}
    </div>
  );
};

export default LoyaltyCardVisual;