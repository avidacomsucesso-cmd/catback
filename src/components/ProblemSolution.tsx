import React from "react";
import { Frown, Smartphone, HelpCircle, CreditCard, Calendar, Gift, ArrowDown, XCircle, PhoneOff, Zap, Users, TrendingUp } from "lucide-react";

const problems = [
  {
    icon: XCircle, // Changed icon for better visual
    title: "Cartões de papel perdidos e esquecidos",
    color: "text-destructive",
  },
  {
    icon: PhoneOff, // Changed icon for better visual
    title: "Sem lembretes de agendamento",
    color: "text-catback-energy-orange",
  },
  {
    icon: Frown, // Changed icon for better visual
    title: "Sem incentivo para retornar",
    color: "text-destructive",
  },
];

const solutions = [
  {
    icon: CreditCard,
    title: "Cartões digitais sempre à mão",
    color: "text-catback-success-green",
  },
  {
    icon: Calendar,
    title: "Agendamento automatizado",
    color: "text-catback-purple",
  },
  {
    icon: Gift,
    title: "Recompensas que funcionam",
    color: "text-catback-success-green",
  },
];

const ProblemSolution: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12">
          Por Que Seus Clientes Não Voltam?
        </h2>

        {/* Problems */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {problems.map((item, index) => (
            <div key={index} className="p-6 border rounded-lg bg-white dark:bg-gray-800 shadow-lg">
              <item.icon className={`w-12 h-12 mx-auto mb-4 ${item.color}`} />
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {item.title}
              </p>
            </div>
          ))}
        </div>

        {/* Solution Arrow */}
        <div className="flex justify-center items-center my-8">
          <div className="flex flex-col items-center">
            <ArrowDown className="w-10 h-10 text-catback-purple animate-bounce" />
            <p className="text-xl font-semibold text-catback-purple mt-2">A Solução: CATBACK</p>
          </div>
        </div>

        {/* Solutions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((item, index) => (
            <div key={index} className="p-6 border rounded-lg bg-catback-light-purple/20 dark:bg-catback-dark-purple/50 shadow-xl">
              <item.icon className={`w-12 h-12 mx-auto mb-4 ${item.color}`} />
              <p className="text-lg font-semibold text-catback-dark-purple dark:text-catback-light-purple">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;