"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Calendar, Users, MapPin } from "lucide-react";
import { useLocation } from "react-router-dom";
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
    disabled: false,
  },
  {
    value: "fidelizacao",
    label: "Fidelização Digital",
    icon: CreditCard,
    content: <FidelizacaoDigital />,
    disabled: true,
  },
  {
    value: "agendamento",
    label: "Agendamento Online",
    icon: Calendar,
    content: <AgendamentoOnline />,
    disabled: true,
  },
  {
    value: "crm",
    label: "CRM Inteligente",
    icon: Users,
    content: <CrmInteligente />,
    disabled: true,
  },
];

const FeaturesContent: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("gmb");
  
  // Filtrar apenas abas não desativadas
  const visibleTabs = featuresTabs.filter(tab => !tab.disabled);

  // Sync tab with URL hash (e.g., #fidelizacao)
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash && visibleTabs.some(tab => tab.value === hash)) {
      setActiveTab(hash);
    }
  }, [location.hash, visibleTabs]);

  return (
    <div className="container py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">
          Acelere o Crescimento do seu Negócio no Google
        </h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Utilize inteligência artificial e tecnologia NFC para dominar o ranking de buscas e transformar visualizações em clientes reais.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Renderiza a lista de abas apenas se houver mais de uma visível, caso contrário mantém apenas o conteúdo */}
        {visibleTabs.length > 1 && (
          <div className="overflow-x-auto mb-8">
            <TabsList className={cn(
              "grid w-full h-auto p-1 bg-gray-100 dark:bg-gray-800",
              visibleTabs.length === 1 ? "grid-cols-1" : "grid-cols-2 md:grid-cols-4"
            )}>
              {visibleTabs.map((tab) => (
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
        )}

        {visibleTabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-0">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default FeaturesContent;