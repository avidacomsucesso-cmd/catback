import React from "react";
import Layout from "@/components/Layout";
import FinalCTA from "@/components/FinalCTA";
import NfcContent from "@/components/NfcContent";

const NfcDisplay: React.FC = () => {
  return (
    <Layout>
      <NfcContent />
      <div className="mt-12">
        <FinalCTA />
      </div>
    </Layout>
  );
};

export default NfcDisplay;