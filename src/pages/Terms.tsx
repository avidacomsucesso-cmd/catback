import React from "react";
import Layout from "@/components/Layout";
import FinalCTA from "@/components/FinalCTA";

const Terms: React.FC = () => {
  return (
    <Layout>
      <div className="container py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">
            Termos de Serviço
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Última atualização: 1 de Janeiro de 2024
          </p>
        </div>

        <div className="max-w-4xl mx-auto prose dark:prose-invert lg:prose-lg">
          <h2>1. Aceitação dos Termos</h2>
          <p>
            Ao aceder e utilizar o serviço CATBACK, o utilizador concorda em cumprir e ficar vinculado aos presentes Termos de Serviço. Se não concordar com qualquer parte dos termos, não deverá utilizar os nossos serviços.
          </p>

          <h2>2. Descrição do Serviço</h2>
          <p>
            O CATBACK é uma plataforma de software como serviço (SaaS) que oferece ferramentas de fidelização digital, agendamento online e CRM para pequenos e médios negócios.
          </p>

          <h2>3. Contas de Utilizador</h2>
          <ul>
            <li>O utilizador é responsável por manter a confidencialidade da sua conta e palavra-passe.</li>
            <li>O utilizador deve ter pelo menos 18 anos para utilizar o serviço.</li>
          </ul>

          <h2>4. Pagamento e Faturação</h2>
          <p>
            Os planos são cobrados numa base mensal ou anual. O serviço será renovado automaticamente, a menos que seja cancelado antes do final do período de faturação.
          </p>

          <h2>5. Limitação de Responsabilidade</h2>
          <p>
            O CATBACK não será responsável por quaisquer danos diretos, indiretos, incidentais, especiais ou consequenciais resultantes do uso ou da incapacidade de usar o serviço.
          </p>
          
          <h2>6. Alterações aos Termos</h2>
          <p>
            Reservamo-nos o direito de modificar estes Termos a qualquer momento. As alterações serão publicadas nesta página.
          </p>
        </div>
      </div>
      
      <div className="mt-12">
        <FinalCTA />
      </div>
    </Layout>
  );
};

export default Terms;