import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Posso mudar de plano a qualquer momento?",
    answer:
      "Sim! Pode fazer upgrade ou downgrade quando quiser. As alterações entram em vigor no próximo ciclo de faturação.",
  },
  {
    question: "O que acontece se ultrapassar o limite de clientes ativos?",
    answer:
      "Receberá uma notificação e pode fazer upgrade para o próximo plano. Não bloqueamos o serviço, mas recomendamos o upgrade para manter a qualidade do serviço.",
  },
  {
    question: "Há custos adicionais?",
    answer:
      "Não! Tudo está incluído no preço mensal. Sem taxas ocultas. Os custos de SMS/WhatsApp fora do limite do plano Premium são cobrados separadamente, mas são transparentes.",
  },
  {
    question: "Como funciona o teste gratuito?",
    answer:
      "Oferecemos uma avaliação gratuita completa do plano escolhido. Basta solicitar via WhatsApp para começar. Não é necessário cartão de crédito.",
  },
  {
    question: "Aceitam que formas de pagamento?",
    answer:
      "Aceitamos Cartão de crédito, débito, Multibanco, MB WAY e transferência bancária.",
  },
  {
    question: "Há desconto para pagamento anual?",
    answer:
      "Sim! Oferecemos 20% de desconto no pagamento anual (o que equivale a 2 meses grátis).",
  },
];

const PricingFaqs: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Perguntas Frequentes
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
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
    </section>
  );
};

export default PricingFaqs;