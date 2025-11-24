import React from "react";
import { Check, Cat } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { CustomerCard } from "@/hooks/use-customer-cards";

interface StampCardVisualProps {
  card: CustomerCard;
  isFlipped: boolean;
}

const StampCardVisual: React.FC<StampCardVisualProps> = ({ card, isFlipped }) => {
  const loyaltyCard = card.loyalty_cards;
  const requiredStamps = loyaltyCard.config?.stamp_count || 10;
  const isComplete = card.current_progress >= requiredStamps;
  const progressPercentage = Math.min(100, (card.current_progress / requiredStamps) * 100);
  const stampsArray = Array.from({ length: requiredStamps }, (_, i) => i + 1);

  // Dynamic Grid Calculation:
  // Max columns: 5. Max rows: 4 (for a 64 height card). Total max: 20.
  // If requiredStamps <= 10, use 5 columns.
  // If requiredStamps > 10, use 4 columns (to allow more rows).
  const columns = requiredStamps <= 10 ? 5 : 4;
  const gridClass = `grid-cols-${columns}`;

  return (
    <div className="relative w-full h-72 perspective-1000">
      <div
        className={cn(
          "absolute w-full h-full transition-transform duration-700 preserve-3d",
          isFlipped ? "rotate-y-180" : ""
        )}
      >
        {/* Card Front (Progress View) */}
        <div className="absolute w-full h-full backface-hidden rounded-xl p-3 bg-catback-purple shadow-lg flex flex-col justify-between text-white">
          
          {/* Header and Reward Info */}
          <div className="space-y-1">
            <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold">{loyaltyCard.name}</h3>
                <Cat className="w-7 h-7 fill-white" />
            </div>
            <p className="text-xs opacity-90">
                Recompensa: {loyaltyCard.reward_description}
            </p>
          </div>

          {/* Stamp Grid */}
          <div className="mt-3 flex flex-col justify-center">
              <div className={cn("grid gap-2", gridClass)}>
                  {stampsArray.map((num) => (
                      <div
                          key={num}
                          className={cn(
                              "w-full aspect-square rounded-md flex items-center justify-center text-sm font-bold border-2",
                              card.current_progress >= num
                                  ? "bg-catback-success-green border-catback-success-green text-white"
                                  : "bg-white/20 border-white/50 text-white/70"
                          )}
                      >
                          {card.current_progress >= num ? <Check className="w-4 h-4" /> : num}
                      </div>
                  ))}
              </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-3">
              <div className="text-center">
                  <p className="text-base font-semibold">
                      {card.current_progress} / {requiredStamps} Selos
                  </p>
                  <Progress value={progressPercentage} className="h-2 mt-1" indicatorClassName="bg-catback-energy-orange" />
              </div>
          </div>
          
          {isComplete && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
                <p className="text-xl font-extrabold text-catback-energy-orange animate-pulse">
                    RESGATE DISPONÍVEL!
                </p>
            </div>
          )}
        </div>

        {/* Card Back (Details View) */}
        <div className="absolute w-full h-full backface-hidden rounded-xl p-4 bg-gray-100 dark:bg-gray-800 shadow-lg flex flex-col justify-center text-center rotate-y-180">
            <h3 className="text-xl font-bold text-catback-dark-purple dark:text-white mb-3">
                Detalhes do Programa
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
                Tipo: {loyaltyCard.type.toUpperCase()}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                ID do Cartão: {card.id.substring(0, 8)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
                Apresente este cartão ao lojista para carimbar ou resgatar sua recompensa.
            </p>
        </div>
      </div>
    </div>
  );
};

export default StampCardVisual;