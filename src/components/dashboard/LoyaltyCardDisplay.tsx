import React from "react";
import { LoyaltyCard, useDeleteLoyaltyCard } from "@/hooks/use-loyalty-cards";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash, Eye, Pencil, Users, Share2, RotateCw, Loader2, Cat } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import EditLoyaltyCardForm from "./EditLoyaltyCardForm"; 
import { Link } from "react-router-dom"; 
import LoyaltyCardVisual from "./LoyaltyCardVisual"; // Import the extracted visual component
import LoyaltyCardViewModal from "./LoyaltyCardViewModal"; // Import the new view modal
import LoyaltyCardShareModal from "./LoyaltyCardShareModal"; // Import the new share modal

interface LoyaltyCardDisplayProps {
  card: LoyaltyCard;
}

const LoyaltyCardDisplay: React.FC<LoyaltyCardDisplayProps> = ({ card }) => {
  const deleteMutation = useDeleteLoyaltyCard();
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = React.useState(false);

  const handleDelete = () => {
    if (window.confirm(`Tem certeza que deseja deletar o cartão '${card.name}'? Isso removerá todos os cartões de clientes associados.`)) {
      deleteMutation.mutate(card.id);
    }
  };

  return (
    <>
      <Card className="shadow-xl dark:bg-gray-900/80 border-gray-700/50">
        <CardContent className="p-6 space-y-4">
          
          {/* Visual Card Area (Static Preview) */}
          <LoyaltyCardVisual card={card} isFlipped={false} showFlipButton={false} />

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
            <Button variant="secondary" className="justify-start" onClick={() => setIsViewModalOpen(true)}>
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

            <Link to={`/dashboard/loyalty/customers/${card.id}`}>
              <Button variant="secondary" className="justify-start w-full">
                <Users className="w-4 h-4 mr-2" /> Clientes
              </Button>
            </Link>
            
            <Button variant="secondary" className="justify-start" onClick={() => setIsShareModalOpen(true)}>
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

      {/* Modals */}
      <LoyaltyCardViewModal 
        card={card} 
        isOpen={isViewModalOpen} 
        onClose={() => setIsViewModalOpen(false)} 
      />
      <LoyaltyCardShareModal
        card={card}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </>
  );
};

export default LoyaltyCardDisplay;