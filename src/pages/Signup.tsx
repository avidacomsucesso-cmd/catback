import React from "react";
import Layout from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cat } from "lucide-react";

const Signup: React.FC = () => {
  return (
    <Layout>
      <div className="container py-16 flex justify-center">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-catback-dark-purple">Começar Grátis</CardTitle>
            <p className="text-sm text-gray-500">Inicie seu teste de 14 dias. Sem cartão de crédito.</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="businessName">Nome do Negócio</Label>
              <Input id="businessName" placeholder="Café da Praça" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="seu@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Criar Senha</Label>
              <Input id="password" type="password" placeholder="********" />
            </div>
            <Button className="w-full bg-catback-energy-orange hover:bg-catback-energy-orange/90">
              <Cat className="w-5 h-5 mr-2 fill-white" /> Iniciar Teste Grátis
            </Button>
            <div className="text-center text-sm text-gray-500">
              Já tem conta?{" "}
              <Link to="/login" className="text-catback-purple hover:underline">
                Entrar
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Signup;