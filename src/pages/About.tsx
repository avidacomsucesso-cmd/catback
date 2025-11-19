import React from "react";
import Layout from "@/components/Layout";
import FinalCTA from "@/components/FinalCTA";
import { Cat, Target, Zap, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About: React.FC = () => {
  return (
    <Layout>
      <div className="container py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">
            A Nossa História
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Nascemos em Portugal com a missão de simplificar a fidelização de clientes para pequenos negócios.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Missão */}
          <Card className="shadow-lg border-l-4 border-catback-purple">
            <CardContent className="p-6 flex items-start space-x-4">
              <Target className="w-8 h-8 text-catback-purple flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-catback-dark-purple dark:text-white mb-2">
                  Nossa Missão
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Capacitar negócios locais a construir relacionamentos duradouros com seus clientes, transformando visitas únicas em lealdade vitalícia através de tecnologia simples e eficaz.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Valores */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-md">
              <CardContent className="p-6 space-y-3">
                <Zap className="w-6 h-6 text-catback-energy-orange" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Simplicidade
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Acreditamos que a melhor tecnologia é aquela que funciona sem esforço.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardContent className="p-6 space-y-3">
                <Heart className="w-6 h-6 text-catback-success-green" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Foco no Cliente
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  O sucesso dos nossos clientes é a nossa principal métrica de sucesso.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* História */}
          <div className="pt-6">
            <h2 className="text-3xl font-bold text-catback-dark-purple dark:text-white mb-4 text-center">
              Onde Tudo Começou
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              O CATBACK nasceu da frustração de ver pequenos cafés e lojas a perderem clientes para grandes cadeias que usavam programas de fidelidade complexos. Decidimos criar uma solução acessível, digital e fácil de usar, que colocasse o poder da retenção nas mãos dos empreendedores locais. Desde 2022, ajudamos mais de 1.000 negócios a prosperar.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <FinalCTA />
      </div>
    </Layout>
  );
};

export default About;