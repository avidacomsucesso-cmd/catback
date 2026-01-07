import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Cat, CreditCard, Calendar, DollarSign } from "lucide-react";

const faqSections = [
  {
    title: "Geral e Primeiros Passos",
    icon: Cat,
    faqs: [
      {
        question: "O que é o CATBACK?",
        answer:
          "O CATBACK é uma plataforma completa de fidelização digital, agendamento online e CRM, desenhada para ajudar pequenos e médios negócios a aumentar a retenção de clientes e a otimizar a gestão diária.",
      },
      {
        question: "Preciso de cartão de crédito para começar o teste gratuito?",
        answer:
          "Não. Oferecemos uma avaliação gratuita em qualquer plano sem a necessidade de inserir dados de cartão de crédito. Basta solicitar através do nosso WhatsApp.",
      },
      {
        question: "O CATBACK funciona para o meu tipo de negócio?",
        answer:
          "Sim. O CATBACK é ideal para cafés, restaurantes, salões de beleza, barbearias, clínicas, academias e qualquer negócio que dependa de clientes recorrentes. Veja a nossa secção 'Para Quem' para mais detalhes.",
      },
    ],
  },
  {
    title: "Fidelização Digital",
    icon: CreditCard,
    faqs: [
      {
        question: "Como o cliente usa o cartão digital?",
        answer:
          "O cliente recebe um link ou escaneia um QR Code para aceder ao seu cartão digital (PWA - Progressive Web App). Ele pode guardar o cartão no ecrã inicial do telemóvel, sem precisar de baixar uma app da loja. Para acumular pontos/selos, basta apresentar o cartão ao lojista.",
      },
      {
        question: "Posso ter vários tipos de programas de fidelidade ao mesmo tempo?",
        answer:
        "Sim. Pode criar programas de selos (carimbos), pontos acumulativos e cashback, e atribuí-los a diferentes clientes ou serviços.",
      },
      {
        question: "Como evito fraudes nos cartões de selos?",
        answer:
        "A validação de selos e pontos é feita exclusivamente pelo lojista através do dashboard, usando um QR Code dinâmico ou inserindo o identificador do cliente, garantindo que apenas o staff autorizado pode fazer alterações.",
      },
    ],
  },
  {
    title: "Agendamento Online",
    icon: Calendar,
    faqs: [
      {
        question: "Como funcionam os lembretes automáticos?",
        answer:
          "O sistema envia lembretes automáticos (via SMS, Email ou WhatsApp, dependendo do plano) 24 horas e/ou 2 horas antes do agendamento, permitindo que o cliente confirme ou cancele, reduzindo drasticamente as faltas (no-shows).",
      },
      {
        question: "Posso sincronizar com o meu calendário pessoal?",
        answer:
          "Sim, nos planos Grow e superiores, pode sincronizar o calendário do CATBACK com o Google Calendar ou Outlook para gerir a sua disponibilidade em tempo real.",
      },
    ],
  },
  {
    title: "Planos e Preços",
    icon: DollarSign,
    faqs: [
      {
        question: "O que são 'Clientes Ativos'?",
        answer:
          "Clientes Ativos são clientes que interagiram com o seu programa de fidelidade ou agendamento nos últimos 90 dias. Se um cliente ficar inativo, ele não conta para o seu limite mensal.",
      },
      {
        question: "Há desconto para pagamento anual?",
        answer:
          "Sim, oferecemos um desconto de 20% para quem optar pelo pagamento anual, o que equivale a 2 meses gratuitos.",
      },
    ],
  },
];

const FaqContent: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">
            Ajuda e Perguntas Frequentes (FAQ)
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Encontre respostas rápidas para as suas dúvidas sobre a plataforma.
          </p>
        </div>

        <div className="space-y-10">
          {faqSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h2 className="text-3xl font-bold text-catback-dark-purple dark:text-catback-light-purple mb-6 flex items-center">
                <section.icon className="w-6 h-6 mr-3" />
                {section.title}
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {section.faqs.map((faq, faqIndex) => (
                  <AccordionItem key={faqIndex} value={`section-${sectionIndex}-item-${faqIndex}`}>
                    <AccordionTrigger className="text-left font-semibold hover:no-underline text-lg">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqContent;