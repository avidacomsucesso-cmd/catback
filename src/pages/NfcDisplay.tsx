import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import FinalCTA from "@/components/FinalCTA";
import NfcContent from "@/components/NfcContent";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flame } from "lucide-react";

const NfcDisplay: React.FC = () => {
  useEffect(() => {
    // Track ViewContent event on Meta Pixel
    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'ViewContent', {
        content_name: 'Display NFC Catback',
        content_type: 'product',
        value: 20.00,
        currency: 'EUR'
      });
    }
  }, []);

  const navigate = useNavigate();

  const handleBuyClick = () => {
    navigate('/nfc-display/checkout');
  };

  return (
    <Layout>
      <div className="bg-catback-purple text-white py-2 text-center animate-pulse">
        <p className="flex items-center justify-center text-sm font-bold uppercase tracking-wider">
          <Flame className="w-4 h-4 mr-2 text-catback-energy-orange fill-catback-energy-orange" />
          Promoção de Lançamento: Apenas 100 unidades disponíveis!
          <Flame className="w-4 h-4 ml-2 text-catback-energy-orange fill-catback-energy-orange" />
        </p>
      </div>

      <NfcContent />
      
      <div className="container text-center py-12">
        <div className="mb-6 inline-block bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border-2 border-catback-energy-orange">
            <p className="text-gray-500 line-through text-xl">De €33,90</p>
            <p className="text-4xl font-black text-catback-purple mb-2">Por apenas €20,00</p>
            <p className="text-sm text-catback-energy-orange font-bold uppercase">Últimas unidades em stock!</p>
        </div>

        <div className="flex flex-col items-center">
            <Button 
            size="lg" 
            className="w-full sm:w-auto bg-catback-energy-orange hover:bg-catback-energy-orange/90 text-white text-xl px-12 py-8 shadow-lg transform transition hover:scale-105"
            onClick={handleBuyClick}
            >
                Comprar Display Agora (€20,00) <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="mt-4 text-sm text-gray-500 italic flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-ping" />
                Entrega estimada: 3-5 dias úteis
            </p>
        </div>
      </div>
      
      <div className="mt-12">
        <FinalCTA />
      </div>
    </Layout>
  );
};

export default NfcDisplay;