import React from "react";
import Layout from "@/components/Layout";
import FinalCTA from "@/components/FinalCTA";
import { Briefcase, MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const jobOpenings = [
  {
    title: "Desenvolvedor(a) Full-Stack (React/Node)",
    location: "Lisboa, Portugal (Híbrido)",
    type: "Full-time",
    description: "Junte-se à nossa equipa de engenharia para construir novas funcionalidades e escalar a plataforma.",
  },
  {
    title: "Especialista em Sucesso do Cliente",
    location: "Remoto (Portugal)",
    type: "Full-time",
    description: "Ajude os nossos lojistas a maximizar o uso do CATBACK e a alcançar os seus objetivos de fidelização.",
  },
  {
    title: "Estágio em Marketing Digital",
    location: "Porto, Portugal",
    type: "Estágio",
    description: "Apoie a equipa de marketing na criação de conteúdo e gestão de campanhas online.",
  },
];

const Careers: React.FC = () => {
  return (
    <Layout>
      <div className="container py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">
            Junte-se à Equipa CATBACK
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Estamos a construir o futuro da fidelização de clientes. Venha fazer parte desta missão.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-catback-dark-purple dark:text-white mb-6">
            Vagas Atuais
          </h2>
          
          <div className="space-y-4">
            {jobOpenings.map((job, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between p-6">
                  <div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">{job.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-catback-purple" /> {job.location}
                      </span>
                      <span className="font-medium text-catback-energy-orange">{job.type}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="text-catback-purple border-catback-purple hover:bg-catback-light-purple/20">
                    Candidatar <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardHeader>
                <CardContent className="px-6 pb-6 pt-0">
                    <p className="text-gray-600 dark:text-gray-400">{job.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="pt-8 text-center">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Não encontrou a vaga ideal? Envie-nos o seu CV para <a href="mailto:careers@catback.pt" className="text-catback-purple hover:underline">careers@catback.pt</a>.
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

export default Careers;