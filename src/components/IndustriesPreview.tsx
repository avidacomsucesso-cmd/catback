import React from "react";
import { Link } from "react-router-dom";
import { Coffee, Scissors, Utensils, Dumbbell, Stethoscope, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const industries = [
  { name: "Cafés", icon: Coffee },
  { name: "Salões", icon: Scissors },
  { name: "Restaurantes", icon: Utensils },
  { name: "Academias", icon: Dumbbell },
  { name: "Clínicas", icon: Stethoscope },
  { name: "Lojas", icon: ShoppingBag },
];

const IndustriesPreview: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-800">
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12">
          Perfeito Para o Seu Negócio
        </h2>

        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {industries.map((industry, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md w-32 h-32 justify-center transition-transform hover:scale-105 hover:shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <industry.icon className="w-8 h-8 text-catback-purple mb-2" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{industry.name}</p>
            </div>
          ))}
        </div>

        <Link to="/industries">
          <Button variant="outline" className="text-catback-purple border-catback-purple hover:bg-catback-light-purple/20">
            Ver Todos os Segmentos <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default IndustriesPreview;