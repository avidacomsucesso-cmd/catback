import React from "react";
import { Cat, QrCode, Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const steps = [
  {
    number: "1️⃣",
    title: "CRIE",
    icon: Cat,
    description: "Configure seu cartão digital em 5 minutos.",
    iconClass: "w-16 h-16 text-catback-purple",
  },
  {
    number: "2️⃣",
    title: "COMPARTILHE",
    icon: QrCode,
    description: "Envie para seus clientes via WhatsApp ou QR Code.",
    iconClass: "w-16 h-16 text-catback-energy-orange",
  },
  {
    number: "3️⃣",
    title: "FIDELIZE",
    icon: Trophy,
    description: "Clientes voltam mais vezes e gastam mais.",
    iconClass: "w-16 h-16 text-catback-success-green",
  },
];

const HowItWorksSteps: React.FC = () => {
  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12">
          Crie Cartões de Fidelidade em 3 passos
        </h2>

        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center max-w-xs p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-transform hover:scale-[1.02]">
                <div className="text-4xl font-extrabold text-catback-dark-purple mb-4">{step.number}</div>
                <step.icon className={step.iconClass} />
                <h3 className="text-xl font-semibold mt-4 text-gray-900 dark:text-white">{step.title}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:flex items-center justify-center h-full self-center">
                  <ArrowRight className="w-8 h-8 text-catback-purple" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-12">
          <Link to="/signup">
            <Button size="lg" className="text-lg px-8 py-6 bg-catback-purple hover:bg-catback-dark-purple transition-all">
              Começar Agora Grátis
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSteps;