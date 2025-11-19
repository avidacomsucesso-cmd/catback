import React from "react";
import Layout from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login: React.FC = () => {
  return (
    <Layout>
      <div className="container py-16 flex justify-center">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-catback-dark-purple">Entrar</CardTitle>
            <p className="text-sm text-gray-500">Acesso ao Dashboard do Lojista</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="seu@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" placeholder="********" />
            </div>
            <Button className="w-full bg-catback-purple hover:bg-catback-dark-purple">
              Entrar na Plataforma
            </Button>
            <div className="text-center text-sm text-gray-500">
              Não tem conta?{" "}
              <Link to="/signup" className="text-catback-purple hover:underline">
                Começar Grátis
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;