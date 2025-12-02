import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import CustomerProfileForm from "@/components/customer/CustomerProfileForm";
import CustomerPasswordForm from "@/components/customer/CustomerPasswordForm";

const CustomerSettings: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center pt-8 pb-16">
      <div className="w-full max-w-2xl px-4">
        <Link to="/customer-cards" className="flex items-center text-catback-purple hover:text-catback-dark-purple mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para Minha Área
        </Link>
        
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Minhas Configurações
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CustomerProfileForm />
          <CustomerPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default CustomerSettings;