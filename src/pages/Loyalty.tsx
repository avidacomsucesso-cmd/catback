"use client";

import React from "react";
import Layout from "@/components/Layout";
import ProblemSolution from "@/components/ProblemSolution";
import HowItWorksSteps from "@/components/HowItWorksSteps";
import FinalCTA from "@/components/FinalCTA";

const Loyalty = () => {
  return (
    <Layout>
      <div className="pt-16 pb-8 text-center container">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Fidelização <span className="text-catback-purple">Inteligente</span>
        </h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Transforme visitantes em clientes recorrentes com a nossa plataforma completa de fidelização digital.
        </p>
      </div>

      {/* Conteúdo transferido da Home */}
      <ProblemSolution />
      <HowItWorksSteps />

      <div className="mt-12">
        <FinalCTA />
      </div>
    </Layout>
  );
};

export default Loyalty;