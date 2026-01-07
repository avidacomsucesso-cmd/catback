import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cat, Store, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const RoleSelectionCTA: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
      {/* Lojista CTA */}
      <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 border-2 border-catback-purple/50">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <Store className="w-8 h-8 text-catback-purple mb-3" />
          <h3 className="text-xl font-bold text-catback-dark-purple dark:text-white mb-2">
            Sou Lojista
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Gerencie fidelização, agendamentos e clientes.
          </p>
          <Link to="/login" className="w-full">
            <Button className="w-full bg-catback-purple hover:bg-catback-dark-purple">
              Entrar no Dashboard
            </Button>
          </Link>
          <a href="https://wa.me/351928202241" target="_blank" rel="noopener noreferrer" className="mt-2 text-xs text-catback-purple hover:underline">
            Ou Solicite uma avaliação Grátis
          </a>
        </CardContent>
      </Card>

      {/* Cliente CTA */}
      <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 border-2 border-catback-energy-orange/50">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <User className="w-8 h-8 text-catback-energy-orange mb-3" />
          <h3 className="text-xl font-bold text-catback-dark-purple dark:text-white mb-2">
            Sou Cliente
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Veja seus cartões de fidelidade e agendamentos.
          </p>
          <Link to="/customer-auth" className="w-full">
            <Button className="w-full bg-catback-energy-orange hover:bg-catback-energy-orange/90">
              Acessar Meus Cartões
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleSelectionCTA;