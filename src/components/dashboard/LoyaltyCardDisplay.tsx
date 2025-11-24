import React from "react";
import { LoyaltyCard, useDeleteLoyaltyCard } from "@/hooks/use-loyalty-cards";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash, Eye, Pencil, Users, Share2, RotateCw, Loader2, Cat } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import EditLoyaltyCardForm from "./EditLoyaltyCardForm"; // Import the new component

interface LoyaltyCardDisplayProps {
  card: LoyaltyCard;
}

// Placeholder for the visual card front/back
const CardVisual: React.FC<{ card: LoyaltyCard; isFlipped: boolean }> = ({ card, isFlipped }) => {
  const requiredStamps = card.config?.stamp_count || 12;
  const stampsArray = Array.from({ length: requiredStamps }, (_, i) => i + 1);

  return (
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
          <div className="w-24 h-24 bg-white p-1 rounded-md mt-2">
            {/* Placeholder for QR Code */}
            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-xs text-gray-600">
              QR Code
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            {card.id.substring(0, 6).toUpperCase()}
          </p>
        </div>

        {/* Card Back (Stamp Progress View) */}
        <div className="absolute w-full h-full backface-hidden rounded-xl p-4 bg-gray-800 dark:bg-gray-900 shadow-lg flex flex-col items-center justify-center text-center rotate-y-180">
          <p className="font-semibold text-white mb-3">
            Complete e ganhe {card.reward_description}*
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
  );
};

const LoyaltyCardDisplay: React.FC<LoyaltyCardDisplayProps> = ({ card }) => {
  const deleteMutation = useDeleteLoyaltyCard();
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);

  const handleDelete = () => {
    if (window.confirm(`Tem certeza que deseja deletar o cartão '${card.name}'? Isso removerá todos os cartões de clientes associados.`)) {
      deleteMutation.mutate(card.id);
    }
  };

  return (
    <Card className="shadow-xl dark:bg-gray-900/80 border-gray-700/50">
      <CardContent className="p-6 space-y-4">
        
        {/* Visual Card Area */}
        <CardVisual card={card} isFlipped={isFlipped} />

        <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full text-catback-purple border-catback-purple/50 hover:bg-catback-light-purple/20"
        >
            <RotateCw className="w-4 h-4 mr-2" /> Girar Cartão
        </Button>

        {/* Details */}
        <div className="space-y-1 pt-2">
          <CardTitle className="text-xl font-bold text-catback-dark-purple dark:text-white">
            {card.name}
          </CardTitle>
          <Badge 
            className={cn(
                "text-xs font-medium",
                card.is_active ? "bg-catback-success-green hover:bg-catback-success-green/90" : "bg-gray-500 hover:bg-gray-600"
            )}
          >
            {card.is_active ? "Ativo" : "Inativo"}
          </Badge>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Tipo: {card.type.charAt(0).toUpperCase() + card.type.slice(1)}
          </p>
        </div>

        <div className="text-sm space-y-1 pt-2 border-t border-gray-200 dark:border-gray-700">
            <p>
                <span className="font-semibold">Recompensa:</span> {card.reward_description}
            </p>
            {card.type === 'stamps' && (
                <p>
                    <span className="font-semibold">Selos Necessários:</span> {card.config?.stamp_count || 'N/A'}
                </p>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-500 pt-2">
                Criado em: {new Date(card.created_at).toLocaleDateString()}
            </p>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 pt-4">
          <Button variant="secondary" className="justify-start">
            <Eye className="w-4 h-4 mr-2" /> Ver
          </Button>
          
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary" className="justify-start">
                <Pencil className="w-4 h-4 mr-2" /> Editar
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-catback-purple">Editar Cartão: {card.name}</DialogTitle>
              </DialogHeader>
              <EditLoyaltyCardForm 
                card={card} 
                onCardUpdated={() => setIsEditDialogOpen(false)} 
              />
            </DialogContent>
          </Dialog>

          <Button variant="secondary" className="justify-start">
            <Users className="w-4 h-4 mr-2" /> Clientes
          </Button>
          <Button variant="secondary" className="justify-start">
            <Share2 className="w-4 h-4 mr-2" /> Partilhar
          </Button>
        </div>
        
        <Button 
          variant="destructive" 
          className="w-full mt-3" 
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
        >
          {deleteMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Trash className="w-4 h-4 mr-2" />
          )}
          Excluir
        </Button>
      </CardContent>
    </Card>
  );
};

export default LoyaltyCardDisplay;