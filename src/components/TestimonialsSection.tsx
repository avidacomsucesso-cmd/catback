import React from "react";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote: "O CATBACK transformou o meu café. Antes, os clientes vinham uma vez e esqueciam. Agora, com os cartões digitais e lembretes automáticos, tenho 65% de clientes recorrentes. A receita aumentou 40% em 3 meses!",
    author: "Maria Silva",
    business: "Café da Praça (Lisboa)",
  },
  {
    quote: "A funcionalidade de Agendamento Online é um salva-vidas. Reduzimos as faltas (no-shows) em 80% graças aos lembretes automáticos. É intuitivo e os clientes adoram a facilidade.",
    author: "João Mendes",
    business: "Barbearia Vintage (Porto)",
  },
  {
    quote: "Finalmente, um CRM que faz sentido para pequenos negócios. Conseguimos segmentar clientes inativos e enviar-lhes uma campanha de SMS personalizada. O retorno foi imediato e superou as expectativas.",
    author: "Ana Costa",
    business: "Loja de Roupas Chic (Faro)",
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12">
          O Que Nossos Clientes Dizem
        </h2>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                <div className="p-1">
                  <Card className="h-full bg-catback-light-purple/10 dark:bg-gray-800 border-catback-light-purple/50 shadow-lg">
                    <CardContent className="flex flex-col justify-between p-6 h-full">
                      <div className="mb-4">
                        <div className="flex text-catback-energy-orange mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-catback-energy-orange" />
                          ))}
                        </div>
                        <Quote className="w-8 h-8 text-catback-purple mb-4" />
                        <p className="text-lg italic text-gray-700 dark:text-gray-300">
                          "{testimonial.quote}"
                        </p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="font-semibold text-catback-dark-purple dark:text-white">
                          — {testimonial.author}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {testimonial.business}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;