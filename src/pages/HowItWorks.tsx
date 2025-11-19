import React from "react";
import Layout from "@/components/Layout";
import HowItWorksContent from "@/components/HowItWorksContent";
import FinalCTA from "@/components/FinalCTA";

const HowItWorks: React.FC = () => {
  return (
    <Layout>
      <HowItWorksContent />
      <div className="mt-12">
        <FinalCTA />
      </div>
    </Layout>
  );
};

export default HowItWorks;