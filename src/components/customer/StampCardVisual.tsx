import React from "react";
import { Check, Cat, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { CustomerCard } from "@/hooks/use-customer-cards";
import QRCode from "qrcode.react"; // Reverting to default import

interface StampCardVisualProps {
  card: CustomerCard;
  isFlipped: boolean;
}

const StampCardVisual: React.FC<StampCardVisualProps> = ({ card, isFlipped }) => {
  const loyaltyCard = card.loyalty_cards;
  const requiredStamps = loyaltyCard.config?.stamp_count || 10;
  const currentProgress = card.current_progress;
  const isComplete = currentProgress >= requiredStamps;
  const progressPercentage = Math.min(100, (currentProgress / requiredStamps) * 100);
  const stampsArray = Array.from({ length: requiredStamps }, (_, i) => i + 1);

  // Determine grid columns based on stamp count for optimal layout within h-64
  const gridColumnsClass = requiredStamps <= 10 ? "grid-cols-5" : "grid-cols-4";

  // The URL the QR code will encode: directs the merchant to the specific customer card detail page
  const qrCodeValue = `${window.location.origin}/dashboard/loyalty/card/${card.id}`;
  const displayCode = card.id.substring(0, 6).toUpperCase();

  return (
    <div className="relative w-full h-64 perspective-1000">
      <div
        className={cn(
          "absolute w-full h-full transition-transform duration-700 preserve-3d",
          isFlipped ? "rotate-y-180" : ""
        )}
      >
        {/* Card Front (QR Code View for Lojista) */}
        <div className="absolute w-full h-full backface-hidden rounded-xl p-4 bg-catback-purple shadow-lg flex flex-col items-center justify-center text-white">
            
            <div className="w-16 h-16 rounded-full bg-white/20 mb-2 overflow-hidden flex items-center justify-center">
                <Cat className="w-10 h-10 fill-white" />
            </div>
            <p className="text-xl font-bold mb-2">
                {loyaltyCard.name}
            </p>
            
            <div className="w-28 h-28 bg-white p-1 rounded-md mt-2">
                <QRCode 
                    value={qrCodeValue} 
                    size={100} 
                    level="H" 
                    renderAs="svg"
                    className="w-full h-full"
                />
            </div>
            <p className="text-sm text-white/80 mt-2 font-mono">
                ID Cliente: {displayCode}
            </p>

            {isComplete && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
                    <p className="text-xl font-extrabold text-catback-energy-orange animate-pulse">
                        RESGATE DISPONÍVEL!
                    </p>
                </div>
            )}
        </div>

        {/* Card Back (Progress View for Cliente) */}
        <div className="absolute w-full h-full backface-hidden rounded-xl p-4 bg-gray-100 dark:bg-gray-800 shadow-lg flex flex-col justify-between text-gray-900 dark:text-white rotate-y-180">
            
            {/* Header and Reward Info */}
            <div className="space-y-0.5 text-center">
                <h3 className="text-xl font-bold text-catback-dark-purple dark:text-white">{loyaltyCard.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Recompensa: {loyaltyCard.reward_description}
                </p>
            </div>

            {/* Stamp Grid */}
            <div className="mt-4 flex flex-col justify-center flex-grow">
                <div className={cn("grid gap-1.5 mx-auto", gridColumnsClass)}>
                    {stampsArray.map((num) => (
                        <div
                            key={num}
                            className={cn(
                                "w-10 h-10 rounded-md flex items-center justify-center text-sm font-bold border-2",
                                currentProgress >= num
                                    ? "bg-catback-success-green border-catback-success-green text-white"
                                    : "bg-gray-200 dark:bg-gray-700 border-gray-400 dark:border-gray-600 text-gray-600 dark:text-gray-400"
                            )}
                        >
                            {currentProgress >= num ? <Check className="w-4 h-4" /> : num}
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
                <div className="text-center">
                    <p className="text-sm font-semibold">
                        {currentProgress} / {requiredStamps} Selos
                    </p>
                    <Progress value={progressPercentage} className="h-2 mt-1" indicatorClassName="bg-catback-purple" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default StampCardVisual;