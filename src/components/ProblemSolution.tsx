import React from "react";
import { Frown, Smartphone, HelpCircle, CreditCard, Calendar, Gift, ArrowDown } from "lucide-react";

const problems = [
  {
    icon: Frown,
    title: "Cartões de papel perdidos e esquecidos",
  },
  {
    icon: Smartphone,
    title: "Sem lembretes de agendamento",
  },
  {
    icon: HelpCircle,
    title: "Sem incentivo para retornar",
  },
];

const solutions = [
  {
    icon: CreditCard,
    title: "Cartões digitais sempre à mão",
  },
  {
    icon: Calendar,
    title: "Agendamento automatizado",
  },
  {
    icon: Gift,
    title: "Recompensas que funcionam",
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
            <div key={index} className="p-6 border rounded-lg bg-white dark:bg-gray-800 shadow-sm">
              <item.icon className="w-10 h-10 mx-auto text-destructive mb-4" />
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {item.title}
              </p>
            </div>
          ))}
        </div>

        {/* Solution Arrow */}
        <div className="flex justify-center items-center my-8">
          <div className="flex flex-col items-center">
            <ArrowDown className="w-8 h-8 text-catback-purple animate-bounce" />
            <p className="text-xl font-semibold text-catback-purple mt-2">A Solução: CATBACK</p>
          </div>
        </div>

        {/* Solutions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((item, index) => (
            <div key={index} className="p-6 border rounded-lg bg-catback-light-purple/20 dark:bg-catback-dark-purple/50 shadow-md">
              <item.icon className="w-10 h-10 mx-auto text-catback-success-green mb-4" />
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