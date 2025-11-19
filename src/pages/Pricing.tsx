import React from "react";
import Layout from "@/components/Layout";
import PricingTable from "@/components/PricingTable";
import PricingFaqs from "@/components/PricingFaqs";

const Pricing: React.FC = () => {
  return (
    <Layout>
      <div className="container py-16 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">
          Planos Transparentes, Sem Surpresas
        </h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
          Escolha o plano ideal para o seu negócio. Mude ou cancele quando quiser.
        </p>
      </div>
      
      <PricingTable />
      
      <PricingFaqs />
      
      {/* CTA Final - Reusing the component from Index for consistency */}
      <div className="mt-12">
        <FinalCTA />
      </div>
    </Layout>
  );
};

// We need to import FinalCTA here, so we must create a placeholder for it if it's not imported yet.
// Since FinalCTA was created in the previous step, we just need to ensure the import is correct.
// Let's check the imports in Index.tsx to confirm the path. It's "@/components/FinalCTA".

import FinalCTA from "@/components/FinalCTA";

export default Pricing;