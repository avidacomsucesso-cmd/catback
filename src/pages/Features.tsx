import React from "react";
import Layout from "@/components/Layout";
import FeaturesContent from "@/components/features/FeaturesContent";
import FinalCTA from "@/components/FinalCTA";

const Features: React.FC = () => {
  return (
    <Layout>
      <FeaturesContent />
      
      {/* CTA Final */}
      <div className="mt-12">
        <FinalCTA />
      </div>
    </Layout>
  );
};

export default Features;