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
  grow: string | boolean;
  pro: string | boolean;
  premium: string | boolean;
}

const plans: Plan[] = [
  {
    name: "Starter",
    tag: "Começar",
    monthlyPrice: "€9,90",
    annualPrice: "€95",
    idealFor: "Começar",
    highlight: false,
  },
  {
    name: "Grow",
    tag: "Mais Popular",
    monthlyPrice: "€19,90",
    annualPrice: "€191",
    idealFor: "Crescer",
    highlight: true,
  },
  {
    name: "Pro",
    tag: "Recomendado",
    monthlyPrice: "€29,90",
    annualPrice: "€287",
    idealFor: "Profissional",
    highlight: false,
  },
  {
    name: "Premium",
    tag: "Tudo-em-Um",
    monthlyPrice: "€39,90",
    annualPrice: "€383",
    idealFor: "Escalar",
    highlight: false,
  },
];

const features: Feature[] = [
  { category: "FIDELIZAÇÃO DIGITAL", name: "Cartões de Selos", starter: "✅ Ilimitados", grow: "✅ Ilimitados", pro: "✅ Ilimitados", premium: "✅ Ilimitados" },
  { category: "FIDELIZAÇÃO DIGITAL", name: "Pontos Acumulativos", starter: true, grow: true, pro: true, premium: true },
  { category: "FIDELIZAÇÃO DIGITAL", name: "Cashback", starter: true, grow: true, pro: true, premium: true },
  { category: "FIDELIZAÇÃO DIGITAL", name: "QR Code Validação", starter: true, grow: true, pro: true, premium: true },
  { category: "FIDELIZAÇÃO DIGITAL", name: "App do Cliente (Web)", starter: true, grow: true, pro: true, premium: true },
  { category: "FIDELIZAÇÃO DIGITAL", name: "Notificações Push", starter: "100/mês", grow: "500/mês", pro: "2000/mês", premium: "Ilimitadas" },
  { category: "FIDELIZAÇÃO DIGITAL", name: "Clientes Ativos", starter: "Até 100", grow: "Até 500", pro: "Até 2000", premium: "Ilimitados" },
  
  { category: "AGENDAMENTO ONLINE", name: "Calendário Inteligente", starter: false, grow: true, pro: true, premium: true },
  { category: "AGENDAMENTO ONLINE", name: "Reservas 24/7", starter: false, grow: true, pro: true, premium: true },
  { category: "AGENDAMENTO ONLINE", name: "Lembretes Automáticos", starter: false, grow: "SMS/Email", pro: "SMS/Email", premium: "SMS/Email/WhatsApp" },
  { category: "AGENDAMENTO ONLINE", name: "Sincronização Calendário", starter: false, grow: "Google Cal", pro: "Google Cal", premium: "Google Cal/Outlook" },
  { category: "AGENDAMENTO ONLINE", name: "Gestão de Múltiplos Locais", starter: false, grow: "✅ 1 local", pro: "✅ 3 locais", premium: "✅ Ilimitado" },
  { category: "AGENDAMENTO ONLINE", name: "Gestão de Equipe", starter: false, grow: "Até 3", pro: "Até 10", premium: "Ilimitado" },

  { category: "CRM INTELIGENTE", name: "Base de Clientes", starter: false, grow: false, pro: true, premium: true },
  { category: "CRM INTELIGENTE", name: "Histórico de Compras", starter: false, grow: false, pro: true, premium: true },
  { category: "CRM INTELIGENTE", name: "Segmentação de Clientes", starter: false, grow: false, pro: "Básica", premium: "Avançada" },
  { category: "CRM INTELIGENTE", name: "Analytics e Relatórios", starter: false, grow: false, pro: "Básico", premium: "Completo" },
  { category: "CRM INTELIGENTE", name: "Notas e Tags", starter: false, grow: false, pro: true, premium: true },
  { category: "CRM INTELIGENTE", name: "Exportação de Dados", starter: false, grow: false, pro: "CSV", premium: "CSV/Excel/API" },

  { category: "MARKETING AUTOMATIZADO", name: "Campanhas SMS/WhatsApp", starter: false, grow: false, pro: false, premium: true },
  { category: "MARKETING AUTOMATIZADO", name: "E-mail Marketing", starter: false, grow: false, pro: false, premium: true },
  { category: "MARKETING AUTOMATIZADO", name: "Gestão de Redes Sociais", starter: false, grow: false, pro: false, premium: true },
  { category: "MARKETING AUTOMATIZADO", name: "Impulsionamento de Posts", starter: false, grow: false, pro: false, premium: true },
  { category: "MARKETING AUTOMATIZADO", name: "Cupons e Promoções", starter: false, grow: false, pro: false, premium: true },
  { category: "MARKETING AUTOMATIZADO", name: "Automações de Marketing", starter: false, grow: false, pro: false, premium: true },

  { category: "SUPORTE", name: "E-mail", starter: "✅ 48h", grow: "✅ 24h", pro: "✅ 12h", premium: "✅ 6h" },
  { category: "SUPORTE", name: "Chat", starter: false, grow: true, pro: true, premium: true },
  { category: "SUPORTE", name: "Telefone", starter: false, grow: false, pro: true, premium: "Prioritário" },
  { category: "SUPORTE", name: "Gestor de Conta Dedicado", starter: false, grow: false, pro: false, premium: true },

  { category: "EXTRAS", name: "Teste Gratuito", starter: "✅ 14 dias", grow: "✅ 14 dias", pro: "✅ 14 dias", premium: "✅ 14 dias" },
  { category: "EXTRAS", name: "Sem Cartão de Crédito", starter: true, grow: true, pro: true, premium: true },
  { category: "EXTRAS", name: "Cancele Quando Quiser", starter: true, grow: true, pro: true, premium: true },
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
                <th className="w-1/5 px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider sticky left-0 bg-background z-10">
                  Funcionalidade
                </th>
                {plans.map((plan) => (
                  <th
                    key={plan.name}
                    className={cn(
                      "w-1/5 px-6 py-4 text-center",
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
                      <Link to="/signup">
                        <Button
                          className={cn(
                            "w-full px-6",
                            plan.highlight ? 'bg-catback-purple hover:bg-catback-dark-purple' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
                          )}
                        >
                          Começar Teste Grátis
                        </Button>
                      </Link>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Ideal para: {plan.idealFor}
                      </p>
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
                        <td colSpan={5} className="px-6 py-3 text-left text-xs font-bold text-catback-dark-purple dark:text-catback-light-purple uppercase tracking-wider sticky left-0 bg-gray-100 dark:bg-gray-800 z-10">
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
                          {renderFeatureValue(feature.grow)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {renderFeatureValue(feature.pro)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {renderFeatureValue(feature.premium)}
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
                      {renderFeatureValue(feature.grow)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {renderFeatureValue(feature.pro)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {renderFeatureValue(feature.premium)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <td className="px-6 py-4 sticky left-0 bg-gray-50 dark:bg-gray-800 z-10"></td>
                {plans.map((plan) => (
                  <td key={plan.name} className="px-6 py-4 text-center">
                    <Link to="/signup">
                      <Button
                        className={cn(
                          "w-full px-6",
                          plan.highlight ? 'bg-catback-purple hover:bg-catback-dark-purple' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
                        )}
                      >
                        Começar Teste Grátis
                      </Button>
                    </Link>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PricingTable;