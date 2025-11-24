import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LoyaltyCard } from "@/hooks/use-loyalty-cards";
import { Button } from "@/components/ui/button";
import { Copy, QrCode, MessageSquare, Facebook, Instagram, Twitter, Link as LinkIcon, Share2 } from "lucide-react";
import { showSuccess } from "@/utils/toast";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface LoyaltyCardShareModalProps {
  card: LoyaltyCard;
  isOpen: boolean;
  onClose: () => void;
}

// Mock function to generate a public URL for the customer card
const generatePublicUrl = (cardId: string) => {
    // In a real app, this would be the base URL + /customer-cards?id=...
    return `${window.location.origin}/customer-cards?id=${cardId}`;
};

// Mock function to generate a short public code
const generatePublicCode = (cardId: string) => {
    return cardId.substring(0, 6).toUpperCase();
};

const LoyaltyCardShareModal: React.FC<LoyaltyCardShareModalProps> = ({ card, isOpen, onClose }) => {
    const publicUrl = generatePublicUrl(card.id);
    const publicCode = generatePublicCode(card.id);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(publicUrl);
        showSuccess("Link de acesso copiado!");
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText(publicCode);
        showSuccess("Código público copiado!");
    };

    const socialShareOptions = [
        { name: "WhatsApp", icon: MessageSquare, color: "bg-[#25D366] hover:bg-[#1DA851]", url: `https://wa.me/?text=${encodeURIComponent(`Aderir ao Cartão de Fidelidade ${card.name}: ${publicUrl}`)}` },
        { name: "Facebook", icon: Facebook, color: "bg-[#1877F2] hover:bg-[#145CB3]", url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(publicUrl)}&quote=${encodeURIComponent(`Aderir ao Cartão de Fidelidade ${card.name}`)}` },
        { name: "X (Twitter)", icon: Twitter, color: "bg-black dark:bg-white dark:text-black hover:bg-gray-800", url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Aderir ao Cartão de Fidelidade ${card.name} via CATBACK: ${publicUrl}`)}` },
        // Instagram and TikTok usually require native app sharing or deep links, which are complex. We'll use placeholders/links to the platforms.
        { name: "Instagram", icon: Instagram, color: "bg-pink-600 hover:bg-pink-700", url: "https://www.instagram.com/" },
        { name: "TikTok", icon: Share2, color: "bg-black dark:bg-gray-700", url: "https://www.tiktok.com/" },
    ];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[450px]">
                <DialogHeader>
                    <DialogTitle className="text-catback-purple">Compartilhar Cartão: {card.name}</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6 text-center">
                    
                    {/* QR Code Section */}
                    <div className="flex flex-col items-center p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                        <QrCode className="w-32 h-32 text-gray-700 dark:text-gray-300" /> {/* Placeholder for actual QR code image */}
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            QR Code público (Escaneie para aderir)
                        </p>
                    </div>

                    {/* Link Section */}
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Input readOnly value={publicUrl} className="flex-grow" />
                            <Button onClick={handleCopyLink} size="icon" className="bg-catback-energy-orange hover:bg-catback-energy-orange/90">
                                <Copy className="w-4 h-4" />
                            </Button>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-left">
                            Link de Acesso Direto
                        </p>
                    </div>

                    {/* Public Code Section */}
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Código público: <span className="font-bold text-catback-dark-purple dark:text-white">{publicCode}</span>
                        </p>
                        <Button onClick={handleCopyCode} variant="ghost" size="sm" className="text-catback-purple hover:bg-catback-light-purple/20">
                            <Copy className="w-4 h-4 mr-1" /> Copiar Código
                        </Button>
                    </div>

                    <Separator />

                    {/* Social Media Sharing */}
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Partilhar nas Redes
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                        {socialShareOptions.map((item) => (
                            <a 
                                key={item.name} 
                                href={item.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={cn(
                                    "flex flex-col items-center justify-center p-3 rounded-lg text-white transition-colors",
                                    item.color
                                )}
                            >
                                <item.icon className="w-6 h-6" />
                                <span className="text-xs mt-1">{item.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LoyaltyCardShareModal;