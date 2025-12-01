import React from "react";
import Layout from "@/components/Layout";
import FinalCTA from "@/components/FinalCTA";
import FaqContent from "@/components/FaqContent";

const Help: React.FC = () => {
  return (
    <Layout>
      <FaqContent />
      <div className="mt-12">
        <FinalCTA />
      </div>
    </Layout>
  );
};

export default Help;