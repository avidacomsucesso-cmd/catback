import React, { useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LoyaltyCard } from "@/hooks/use-loyalty-cards";
import { Button } from "@/components/ui/button";
import { Printer, QrCode, Cat, Gift } from "lucide-react";
import { QRCodeSVG } from 'qrcode.react';
import { cn } from "@/lib/utils";

interface LoyaltyPosterModalProps {
  card: LoyaltyCard;
  isOpen: boolean;
  onClose: () => void;
}

// Mock function to generate a public URL for the customer card
const generatePublicUrl = (cardId: string) => {
    return `${window.location.origin}/enroll?id=${cardId}`;
};

const LoyaltyPosterModal: React.FC<LoyaltyPosterModalProps> = ({ card, isOpen, onClose }) => {
  const posterRef = useRef<HTMLDivElement>(null);
  const publicUrl = generatePublicUrl(card.id);

  const handlePrint = () => {
    if (posterRef.current) {
      window.print();
    }
  };

  const renderConfigDetails = () => {
    switch (card.type) {
      case 'stamps':
        return `Acumule ${card.config?.stamp_count || 10} Selos`;
      case 'points':
        return `Ganhe ${card.config?.points_per_euro || 1} Ponto(s) por €1`;
      case 'cashback':
        return `Ganhe ${card.config?.cashback_percentage || 5}% de Cashback`;
      default:
        return 'Programa de Fidelidade';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto print:p-0 print:max-w-full print:h-auto print:overflow-visible">
        <DialogHeader className="print:hidden">
          <DialogTitle className="text-catback-purple">Poster de Divulgação</DialogTitle>
        </DialogHeader>
        
        <div className="p-4 print:p-0">
            {/* Print Button (Hidden in print view) */}
            <div className="flex justify-end mb-4 print:hidden">
                <Button onClick={handlePrint} className="bg-catback-energy-orange hover:bg-catback-energy-orange/90">
                    <Printer className="w-4 h-4 mr-2" /> Imprimir Poster (A4)
                </Button>
            </div>

            {/* A4 Poster Content */}
            <div 
                ref={posterRef} 
                className={cn(
                    "w-[210mm] h-[297mm] mx-auto bg-white text-gray-900 p-10 shadow-xl border border-gray-300",
                    "print:w-auto print:h-auto print:shadow-none print:border-none"
                )}
            >
                <div className="flex flex-col items-center text-center h-full justify-between">
                    
                    {/* Header */}
                    <div className="w-full">
                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <img src="/images/catback-logo.png" alt="Logo" className="w-10 h-10" />
                            <h1 className="text-4xl font-extrabold text-catback-dark-purple">
                                {card.name.toUpperCase()}
                            </h1>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-700 mt-2">
                            {renderConfigDetails()}
                        </h2>
                    </div>

                    {/* QR Code Area */}
                    <div className="my-8 p-6 bg-gray-100 rounded-lg border border-gray-200">
                        <p className="text-xl font-bold mb-4 text-catback-purple">
                            ESCANEE PARA ADERIR AGORA!
                        </p>
                        <div className="w-64 h-64 mx-auto bg-white p-2 rounded-md shadow-md">
                            <QRCodeSVG 
                                value={publicUrl} 
                                size={240} 
                                level="H" 
                                className="w-full h-full"
                            />
                        </div>
                        <p className="text-sm text-gray-500 mt-4">
                            {publicUrl}
                        </p>
                    </div>

                    {/* Reward & CTA */}
                    <div className="w-full p-4 bg-catback-energy-orange text-white rounded-lg shadow-md">
                        <div className="flex items-center justify-center space-x-3">
                            <Gift className="w-8 h-8 fill-white" />
                            <p className="text-3xl font-extrabold">
                                RECOMPENSA: {card.reward_description.toUpperCase()}
                            </p>
                        </div>
                    </div>
                    
                    {/* Footer */}
                    <div className="mt-6 text-sm text-gray-500">
                        <p>Pergunte a um membro da nossa equipe para mais detalhes.</p>
                        <p className="mt-1">Powered by CATBACK</p>
                    </div>
                </div>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoyaltyPosterModal;