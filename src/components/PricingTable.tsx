import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

interface Plan {
  name: string;
  tag: string;
  monthlyPrice: string;
  annualPrice: string;
  idealFor: string;
  highlight: boolean;
}

interface Feature {
  name: string;
  category: string;
  starter: string | boolean;
  pro: string | boolean;
  gmn: string | boolean;
}

const plans: Plan[] = [
  {
    name: "Starter",
    tag: "Essencial",
    monthlyPrice: "€9,90",
    annualPrice: "€95",
    idealFor: "Começar Retenção",
    highlight: false,
  },
  {
    name: "Pro",
    tag: "Mais Popular",
    monthlyPrice: "€29,90",
    annualPrice: "€287",
    idealFor: "Gestão Completa",
    highlight: true,
  },
  {
    name: "GMN",
    tag: "Crescimento",
    monthlyPrice: "€39,90",
    annualPrice: "€383",
    idealFor: "Dominar o Google",
    highlight: false,
  },
];

const features: Feature[] = [
  { category: "FIDELIZAÇÃO DIGITAL", name: "Cartões de Selos", starter: "✅ Ilimitados", pro: "✅ Ilimitados", gmn: "✅ Ilimitados" },
  { category: "FIDELIZAÇÃO DIGITAL", name: "Pontos Acumulativos", starter: true, pro: true, gmn: true },
  { category: "FIDELIZAÇÃO DIGITAL", name: "Cashback", starter: true, pro: true, gmn: true },
  { category: "FIDELIZAÇÃO DIGITAL", name: "QR Code Validação", starter: true, pro: true, gmn: true },
  { category: "FIDELIZAÇÃO DIGITAL", name: "Notificações Push", starter: "100/mês", pro: "2000/mês", gmn: "Ilimitadas" },
  { category: "FIDELIZAÇÃO DIGITAL", name: "Clientes Ativos", starter: "Até 100", pro: "Até 2000", gmn: "Ilimitados" },
  
  { category: "AGENDAMENTO ONLINE", name: "Calendário Inteligente", starter: false, pro: true, gmn: true },
  { category: "AGENDAMENTO ONLINE", name: "Reservas 24/7", starter: false, pro: true, gmn: true },
  { category: "AGENDAMENTO ONLINE", name: "Lembretes Automáticos", starter: false, pro: "SMS/Email", gmn: "SMS/Email/WhatsApp" },
  { category: "AGENDAMENTO ONLINE", name: "Gestão de Equipe", starter: false, pro: "Até 10", gmn: "Ilimitado" },

  { category: "CRM INTELIGENTE", name: "Base de Clientes", starter: false, pro: true, gmn: true },
  { category: "CRM INTELIGENTE", name: "Histórico de Compras", starter: false, pro: true, gmn: true },
  { category: "CRM INTELIGENTE", name: "Analytics e Relatórios", starter: false, pro: "Básico", gmn: "Completo" },

  { category: "GOOGLE MEU NEGÓCIO (IA)", name: "Otimização do Perfil", starter: false, pro: false, gmn: true },
  { category: "GOOGLE MEU NEGÓCIO (IA)", name: "Gestão de Página GMN", starter: false, pro: false, gmn: true },
  { category: "GOOGLE MEU NEGÓCIO (IA)", name: "Posts e Fotos Semanais", starter: false, pro: false, gmn: true },
  { category: "GOOGLE MEU NEGÓCIO (IA)", name: "Respostas com IA Catback", starter: false, pro: false, gmn: true },
  { category: "GOOGLE MEU NEGÓCIO (IA)", name: "Monitorização de Reputação", starter: false, pro: false, gmn: true },

  { category: "SUPORTE", name: "E-mail", starter: "✅ 48h", pro: "✅ 12h", gmn: "✅ 6h" },
  { category: "SUPORTE", name: "Chat", starter: false, pro: true, gmn: true },
  { category: "SUPORTE", name: "Telefone", starter: false, pro: true, gmn: "Prioritário" },
];

const renderFeatureValue = (value: string | boolean) => {
  if (value === true) {
    return <Check className="w-5 h-5 text-catback-success-green mx-auto" />;
  }
  if (value === false) {
    return <X className="w-5 h-5 text-gray-400 mx-auto" />;
  }
  return <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{value}</span>;
};

const PricingTable: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  const getPrice = (plan: Plan) => {
    return billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice;
  };

  const getFrequency = () => {
    return billingCycle === "monthly" ? "/mês" : "/ano";
  };

  return (
    <section className="py-16">
      <div className="container">
        <div className="flex justify-center mb-12">
          <ToggleGroup
            type="single"
            value={billingCycle}
            onValueChange={(value: "monthly" | "annual") => {
              if (value) setBillingCycle(value);
            }}
            className="bg-gray-200 dark:bg-gray-700 rounded-full p-1"
          >
            <ToggleGroupItem
              value="monthly"
              className={cn(
                "px-6 py-2 rounded-full text-sm font-semibold transition-colors",
                billingCycle === "monthly"
                  ? "bg-white text-catback-dark-purple shadow-md"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              )}
            >
              Mensal
            </ToggleGroupItem>
            <ToggleGroupItem
              value="annual"
              className={cn(
                "px-6 py-2 rounded-full text-sm font-semibold transition-colors relative",
                billingCycle === "annual"
                  ? "bg-white text-catback-dark-purple shadow-md"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              )}
            >
              Anual
              <span className="absolute -top-2 right-0 bg-catback-energy-orange text-white text-xs font-bold px-2 py-0.5 rounded-full transform translate-x-1/2 -translate-y-1/2">
                -20%
              </span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border-collapse">
            <thead>
              <tr>
                <th className="w-1/4 px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider sticky left-0 bg-background z-10">
                  Funcionalidade
                </th>
                {plans.map((plan) => (
                  <th
                    key={plan.name}
                    className={cn(
                      "w-1/4 px-6 py-4 text-center",
                      plan.highlight ? "bg-catback-light-purple/20 dark:bg-catback-dark-purple/50" : "bg-gray-50 dark:bg-gray-800"
                    )}
                  >
                    <div className="flex flex-col items-center">
                      <span className={cn("text-xl font-bold", plan.highlight ? "text-catback-purple" : "text-gray-900 dark:text-white")}>
                        {plan.name}
                      </span>
                      <span className="text-xs font-semibold text-catback-energy-orange mt-1 mb-2">
                        {plan.tag}
                      </span>
                      <div className="text-3xl font-extrabold text-gray-900 dark:text-white">
                        {getPrice(plan)}
                        <span className="text-lg font-medium text-gray-500 dark:text-gray-400">
                          {getFrequency()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-4">
                        {billingCycle === "annual" && `(€${plan.monthlyPrice.replace('€', '')}/mês)`}
                      </p>
                      <Link to="/signup" className="w-full">
                        <Button
                          className={cn(
                            "w-full px-6",
                            plan.highlight ? 'bg-catback-purple hover:bg-catback-dark-purple' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
                          )}
                        >
                          Teste Grátis
                        </Button>
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {features.map((feature, index) => {
                const isCategoryHeader = index === 0 || feature.category !== features[index - 1].category;
                
                if (isCategoryHeader) {
                  return (
                    <React.Fragment key={feature.category}>
                      <tr className="bg-gray-100 dark:bg-gray-800">
                        <td colSpan={4} className="px-6 py-3 text-left text-xs font-bold text-catback-dark-purple dark:text-catback-light-purple uppercase tracking-wider sticky left-0 bg-gray-100 dark:bg-gray-800 z-10">
                          {feature.category}
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white sticky left-0 bg-white dark:bg-gray-900 z-10">
                          {feature.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {renderFeatureValue(feature.starter)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center bg-catback-light-purple/10 dark:bg-catback-dark-purple/20">
                          {renderFeatureValue(feature.pro)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {renderFeatureValue(feature.gmn)}
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                }

                return (
                  <tr key={feature.name} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white sticky left-0 bg-white dark:bg-gray-900 z-10">
                      {feature.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {renderFeatureValue(feature.starter)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center bg-catback-light-purple/10 dark:bg-catback-dark-purple/20">
                      {renderFeatureValue(feature.pro)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {renderFeatureValue(feature.gmn)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PricingTable;