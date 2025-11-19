import React from "react";
import { Building, Users, CreditCard, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const impactData = [
  {
    icon: Building,
    number: "1.000+",
    label: "Empresas Ativas",
  },
  {
    icon: Users,
    number: "50.000+",
    label: "Clientes Fidelizados",
  },
  {
    icon: CreditCard,
    number: "500.000+",
    label: "Cartões Criados",
  },
  {
    icon: Globe,
    number: "5+",
    label: "Países",
  },
];

const ImpactNumbers: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {impactData.map((item, index) => (
            <Card key={index} className="text-center shadow-md hover:shadow-lg transition-shadow border-catback-light-purple/50">
              <CardContent className="p-6 flex flex-col items-center">
                <item.icon className="w-8 h-8 text-catback-purple mb-3" />
                <p className="text-3xl font-bold text-catback-dark-purple">
                  {item.number}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {item.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactNumbers;