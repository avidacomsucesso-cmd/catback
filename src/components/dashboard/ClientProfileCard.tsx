import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, CreditCard, Lock, Loader2 } from "lucide-react";
import { CustomerCard } from "@/hooks/use-customer-cards";
import { Button } from "@/components/ui/button";

interface ClientProfileCardProps {
  identifier: string;
  activeCardsCount: number;
  onPasswordReset: () => void;
  isResetting: boolean;
}

const ClientProfileCard: React.FC<ClientProfileCardProps> = ({ identifier, activeCardsCount, onPasswordReset, isResetting }) => {
  // Simple check to determine if the identifier looks like an email or phone number
  const isEmail = identifier.includes('@');
  const Icon = isEmail ? Mail : Phone;
  
  // Only allow reset if it looks like an email
  const canResetPassword = isEmail;

  return (
    <Card className="shadow-lg border-l-4 border-catback-energy-orange">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <User className="w-6 h-6 text-catback-dark-purple" />
          <CardTitle className="text-2xl text-gray-900 dark:text-white">
            Perfil do Cliente
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-3">
          <Icon className="w-5 h-5 text-catback-purple" />
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            {identifier}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <CreditCard className="w-5 h-5 text-catback-success-green" />
          <p className="text-md text-gray-600 dark:text-gray-400">
            {activeCardsCount} Cartão(ões) de Fidelidade Ativo(s)
          </p>
        </div>
        
        {canResetPassword && (
            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                <Button 
                    onClick={onPasswordReset}
                    disabled={isResetting}
                    variant="outline"
                    className="w-full border-catback-energy-orange text-catback-energy-orange hover:bg-catback-energy-orange/10"
                >
                    {isResetting ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            A enviar email...
                        </>
                    ) : (
                        <>
                            <Lock className="w-4 h-4 mr-2" /> Enviar Link de Redefinição de Senha
                        </>
                    )}
                </Button>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 text-left">
                    *Isto envia um email de recuperação de senha para o cliente.
                </p>
            </div>
        )}

        <p className="text-sm text-gray-500 dark:text-gray-500 pt-2">
          *Em um CRM completo, mais dados (nome, histórico) seriam exibidos aqui.
        </p>
      </CardContent>
    </Card>
  );
};

export default ClientProfileCard;