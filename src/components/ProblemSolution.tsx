import React from "react";
import { Frown, Smartphone, HelpCircle, CreditCard, Calendar, Gift, ArrowDown, XCircle, PhoneOff, Zap, Users, TrendingUp, Clock, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const problems = [
  {
    icon: XCircle,
    title: "Cartões de papel perdidos e esquecidos",
    description: "A fidelização tradicional é facilmente esquecida ou descartada.",
    color: "text-destructive",
  },
  {
    icon: Clock,
    title: "Altas taxas de 'No-Show'",
    description: "Faltas a agendamentos custam tempo e dinheiro ao seu negócio.",
    color: "text-catback-energy-orange",
  },
  {
    icon: Frown,
    title: "Clientes não voltam",
    description: "Falta de incentivo e comunicação pós-venda eficaz.",
    color: "text-destructive",
  },
];

const solutions = [
  {
    icon: Smartphone,
    title: "Cartões digitais sempre à mão",
    description: "O cliente guarda o cartão no telemóvel, sem precisar de apps.",
    color: "text-catback-success-green",
  },
  {
    icon: MessageSquare,
    title: "Lembretes automáticos",
    description: "Reduza as faltas em até 80% com notificações via SMS/WhatsApp.",
    color: "text-catback-purple",
  },
  {
    icon: TrendingUp,
    title: "Aumento do LTV (Valor de Vida)",
    description: "Recompensas personalizadas que garantem o retorno e o gasto.",
    color: "text-catback-success-green",
  },
];

const ProblemSolution: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-16">
          Por Que Seus Clientes Não Voltam?
        </h2>

        {/* Problems */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {problems.map((item, index) => (
            <div key={index} className="p-6 border-2 border-destructive/50 rounded-xl bg-white dark:bg-gray-800 shadow-xl transition-transform hover:scale-[1.02]">
              <item.icon className={`w-12 h-12 mx-auto mb-4 ${item.color}`} />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Solution Arrow */}
        <div className="flex justify-center items-center my-12">
          <div className="flex flex-col items-center">
            <ArrowDown className="w-10 h-10 text-catback-purple animate-bounce" />
            <p className="text-xl font-extrabold text-catback-purple mt-2">A Solução: CATBACK</p>
          </div>
        </div>

        {/* Solutions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((item, index) => (
            <div key={index} className="p-6 border-2 border-catback-purple rounded-xl bg-catback-light-purple/20 dark:bg-catback-dark-purple/50 shadow-xl transition-transform hover:scale-[1.02]">
              <item.icon className={`w-12 h-12 mx-auto mb-4 ${item.color}`} />
              <h3 className="text-xl font-bold text-catback-dark-purple dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;