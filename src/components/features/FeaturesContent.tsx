"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Calendar, Users, MapPin } from "lucide-react";
import FidelizacaoDigital from "./FidelizacaoDigital";
import AgendamentoOnline from "./AgendamentoOnline";
import CrmInteligente from "./CrmInteligente";
import GoogleMeuNegocio from "./GoogleMeuNegocio";
import { cn } from "@/lib/utils";

const featuresTabs = [
  {
    value: "gmb",
    label: "Google Meu Negócio",
    icon: MapPin,
    content: <GoogleMeuNegocio />,
  },
  {
    value: "fidelizacao",
    label: "Fidelização Digital",
    icon: CreditCard,
    content: <FidelizacaoDigital />,
  },
  {
    value: "agendamento",
    label: "Agendamento Online",
    icon: Calendar,
    content: <AgendamentoOnline />,
  },
  {
    value: "crm",
    label: "CRM Inteligente",
    icon: Users,
    content: <CrmInteligente />,
  },
];

const FeaturesContent: React.FC = () => {
  return (
    <div className="container py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">
          Crescimento e Fidelização <span className="text-catback-purple">Digital</span>
        </h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Atraia novos clientes através do Google e mantenha-os fiéis com a nossa plataforma completa de gestão e marketing.
        </p>
      </div>

      <Tabs defaultValue="gmb" className="w-full">
        <div className="overflow-x-auto mb-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-1 bg-gray-100 dark:bg-gray-800">
            {featuresTabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  "flex flex-col md:flex-row items-center justify-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-center data-[state=active]:bg-white data-[state=active]:text-catback-purple data-[state=active]:shadow-md transition-all duration-300",
                  "text-gray-600 dark:text-gray-400 hover:text-catback-dark-purple dark:hover:text-white"
                )}
              >
                <tab.icon className="w-5 h-5" />
                <span className="text-sm font-semibold">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {featuresTabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default FeaturesContent;