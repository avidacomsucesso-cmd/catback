import React from "react";
import { Cat, DollarSign, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { CustomerCard } from "@/hooks/use-customer-cards";
import { QRCodeSVG } from 'qrcode.react';

interface PointsCashbackCardVisualProps {
  card: CustomerCard;
}

const PointsCashbackCardVisual: React.FC<PointsCashbackCardVisualProps> = ({ card }) => {
  const loyaltyCard = card.loyalty_cards;
  const isPoints = loyaltyCard.type === 'points';
  const currencySymbol = isPoints ? 'Pts' : '€';
  const Icon = isPoints ? Star : DollarSign;

  const rewardDescription = loyaltyCard.reward_description;
  
  const qrCodeValue = `${window.location.origin}/dashboard/loyalty/card/${card.id}`;
  const displayCode = card.id.substring(0, 6).toUpperCase();
  
  return (
    <div className="relative w-full h-64 rounded-xl p-6 bg-catback-dark-purple shadow-xl flex flex-col justify-between text-white">
      
      <div className="flex justify-between items-start">
        <div className="space-y-1">
            <h3 className="text-2xl font-bold">{loyaltyCard.name}</h3>
            <p className="text-sm opacity-80">
                Programa de {isPoints ? 'Pontos' : 'Cashback'}
            </p>
        </div>
        <div className="w-16 h-16 bg-white p-0.5 rounded-md flex-shrink-0">
            <QRCodeSVG 
                value={qrCodeValue} 
                size={60} 
                level="H" 
                className="w-full h-full"
            />
        </div>
      </div>

      <div className="text-center my-4 flex-grow flex flex-col justify-center">
        <p className="text-lg font-medium opacity-80">Seu Saldo Atual</p>
        <div className="flex items-center justify-center space-x-2 mt-1">
            <Icon className="w-8 h-8 text-catback-energy-orange fill-catback-energy-orange/50" />
            <p className="text-6xl font-extrabold">
                {card.current_progress.toFixed(isPoints ? 0 : 2)}
            </p>
            <span className="text-3xl font-semibold opacity-90">{currencySymbol}</span>
        </div>
      </div>

      <div className="border-t border-white/20 pt-3">
        <p className="text-sm font-medium opacity-90">
            Recompensa: {rewardDescription}
        </p>
        <div className="flex justify-between items-center mt-1">
            <p className="text-xs opacity-70">
                Apresente este cartão ao lojista para acumular ou resgatar.
            </p>
            <p className="text-xs font-mono opacity-70">
                ID: {displayCode}
            </p>
        </div>
      </div>
    </div>
  );
};

export default PointsCashbackCardVisual;