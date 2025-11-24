import React from "react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import CustomerProfileForm from "@/components/customer/CustomerProfileForm";
import CustomerPasswordForm from "@/components/customer/CustomerPasswordForm";

const CustomerSettings: React.FC = () => {
  return (
    <Layout>
      <div className="container py-10">
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
    </Layout>
  );
};

export default CustomerSettings;