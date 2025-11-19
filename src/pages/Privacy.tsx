import React from "react";
import Layout from "@/components/Layout";
import FinalCTA from "@/components/FinalCTA";

const Privacy: React.FC = () => {
  return (
    <Layout>
      <div className="container py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">
            Política de Privacidade
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Comprometidos com a sua segurança e privacidade.
          </p>
        </div>

        <div className="max-w-4xl mx-auto prose dark:prose-invert lg:prose-lg">
          <h2>1. Informações que Recolhemos</h2>
          <p>
            Recolhemos informações que o utilizador nos fornece diretamente, como nome, email, nome da empresa e informações de pagamento.
          </p>

          <h2>2. Como Usamos as Suas Informações</h2>
          <p>
            Utilizamos as informações recolhidas para fornecer, manter e melhorar os nossos serviços, processar transações e comunicar com o utilizador.
          </p>

          <h2>3. Partilha de Informações</h2>
          <p>
            Não vendemos, alugamos ou partilhamos as suas informações pessoais com terceiros, exceto conforme necessário para fornecer os serviços (ex: processadores de pagamento) ou quando exigido por lei.
          </p>

          <h2>4. Segurança dos Dados</h2>
          <p>
            Implementamos medidas de segurança técnicas e organizacionais para proteger as suas informações contra acesso não autorizado, alteração, divulgação ou destruição.
          </p>
          
          <h2>5. Direitos do Titular dos Dados (RGPD)</h2>
          <p>
            O utilizador tem o direito de aceder, retificar ou apagar os seus dados pessoais. Para exercer estes direitos, contacte-nos através do email suporte@catback.pt.
          </p>
        </div>
      </div>
      
      <div className="mt-12">
        <FinalCTA />
      </div>
    </Layout>
  );
};

export default Privacy;