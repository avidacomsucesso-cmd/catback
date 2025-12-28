import React from "react";
import Layout from "@/components/Layout";
import FinalCTA from "@/components/FinalCTA";
import NfcContent from "@/components/NfcContent";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const NfcDisplay: React.FC = () => {
  return (
    <Layout>
      <NfcContent />
      
      <div className="container text-center py-12">
        <Link to="/nfc-display/checkout">
            <Button size="lg" className="w-full sm:w-auto bg-catback-energy-orange hover:bg-catback-energy-orange/90 text-white text-lg px-8 py-6 shadow-lg">
                Comprar Display Agora (€29,90) <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
        </Link>
      </div>
      
      <div className="mt-12">
        <FinalCTA />
      </div>
    </Layout>
  );
};

export default NfcDisplay;