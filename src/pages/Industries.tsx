import React from "react";
import Layout from "@/components/Layout";
import IndustriesContent from "@/components/IndustriesContent";
import FinalCTA from "@/components/FinalCTA";

const Industries: React.FC = () => {
  return (
    <Layout>
      <IndustriesContent />
      <div className="mt-12">
        <FinalCTA />
      </div>
    </Layout>
  );
};

export default Industries;