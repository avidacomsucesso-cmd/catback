import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Nfc, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CheckoutSuccess: React.FC = () => {
  return (
    <Layout>
      <div className="container py-16 flex justify-center">
        <Card className="w-full max-w-md shadow-xl text-center">
          <CardHeader>
            <CheckCircle className="w-16 h-16 mx-auto text-catback-success-green" />
            <CardTitle className="text-3xl font-bold text-catback-dark-purple">
                Pedido Recebido!
            </CardTitle>
            <CardDescription>
                Obrigado pela sua compra. O seu Display NFC será enviado em breve.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="font-semibold text-gray-800 dark:text-gray-200">O que acontece a seguir?</p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1 text-left">
                    <li>1. Receberá um email de confirmação da encomenda.</li>
                    <li>2. O Display NFC será enviado em 3-5 dias úteis.</li>
                    <li>3. Pode configurar a integração no seu Dashboard.</li>
                </ul>
            </div>
            
            <Link to="/dashboard">
                <Button className="w-full bg-catback-purple hover:bg-catback-dark-purple">
                    Ir para o Dashboard <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </Link>
            <Link to="/" className="text-sm text-gray-500 hover:text-catback-purple">
                Voltar à Página Inicial
            </Link>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CheckoutSuccess;