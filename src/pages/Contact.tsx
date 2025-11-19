import React from "react";
import Layout from "@/components/Layout";
import ContactForm from "@/components/ContactForm";
import FinalCTA from "@/components/FinalCTA";
import { Phone, Mail, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Contact: React.FC = () => {
  return (
    <Layout>
      <div className="container py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">
            Fale Conosco
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Tem dúvidas, sugestões ou quer agendar uma demonstração? Estamos aqui para ajudar.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="flex justify-center lg:justify-end">
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div className="space-y-6 lg:pt-10">
            <h2 className="text-3xl font-bold text-catback-dark-purple dark:text-white">
              Informações de Contato
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Prefere falar diretamente? Use os canais abaixo.
            </p>

            <Card className="shadow-md">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-catback-purple flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Email de Suporte</p>
                    <a href="mailto:suporte@catback.pt" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">
                      suporte@catback.pt
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-catback-purple flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Telefone</p>
                    <a href="tel:+351210000000" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">
                      +351 210 000 000
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-catback-purple flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Escritório Principal</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Rua da Inovação, 123, Lisboa, Portugal
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <FinalCTA />
      </div>
    </Layout>
  );
};

export default Contact;