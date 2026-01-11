import React from "react";
import Layout from "@/components/Layout";
import FinalCTA from "@/components/FinalCTA";
import NfcContent from "@/components/NfcContent";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const NfcDisplay: React.FC = () => {
  const navigate = useNavigate();

  const handleBuyClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
          'send_to': 'AW-17858320955/HMT2CPye_AbELu0wcNC',
          'value': 33.90,
          'currency': 'EUR'
      });
    }
    navigate('/nfc-display/checkout');
  };

  return (
    <Layout>
      <NfcContent />
      
      <div className="container text-center py-12">
        <Button 
          size="lg" 
          className="w-full sm:w-auto bg-catback-energy-orange hover:bg-catback-energy-orange/90 text-white text-lg px-8 py-6 shadow-lg"
          onClick={handleBuyClick}
        >
            Comprar Display Agora (€33,90) <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
      
      <div className="mt-12">
        <FinalCTA />
      </div>
    </Layout>
  );
};

export default NfcDisplay;