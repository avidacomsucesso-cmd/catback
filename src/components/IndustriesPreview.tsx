import React from "react";
import { Link } from "react-router-dom";
import { Coffee, Scissors, Utensils, Dumbbell, Stethoscope, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const industries = [
  { name: "Cafés", icon: Coffee, color: "text-catback-energy-orange" },
  { name: "Salões", icon: Scissors, color: "text-catback-purple" },
  { name: "Restaurantes", icon: Utensils, color: "text-catback-success-green" },
  { name: "Academias", icon: Dumbbell, color: "text-catback-dark-purple" },
  { name: "Clínicas", icon: Stethoscope, color: "text-catback-purple" },
  { name: "Lojas", icon: ShoppingBag, color: "text-catback-energy-orange" },
];

const IndustriesPreview: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-800">
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12">
          Perfeito Para o Seu Negócio
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-10">
          {industries.map((industry, index) => (
            <Card 
              key={index} 
              className="flex flex-col items-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md justify-center transition-transform hover:scale-105 hover:shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <CardContent className="p-0 flex flex-col items-center">
                <industry.icon className={`w-10 h-10 ${industry.color} mb-3`} />
                <p className="text-md font-semibold text-gray-800 dark:text-gray-200">{industry.name}</p>
              </CardContent>
            </Card>
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