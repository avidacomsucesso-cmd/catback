import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Phone } from "lucide-react";
import BotaoWhatsapp from "./BotaoWhatsapp";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const platformLinks = [
    { to: "/nfc-display", text: "Display NFC" },
    { to: "/pricing", text: "Preços" },
    { to: "/industries", text: "Para Quem" },
  ];

  const resourcesLinks = [
    { to: "/blog", text: "Blog" },
    { to: "/help", text: "Ajuda (FAQ)" },
    { to: "/terms", text: "Termos de Serviço" },
    { to: "/privacy", text: "Política de Privacidade" },
  ];

  const companyLinks = [
    { to: "/about", text: "Sobre Nós" },
    { to: "/careers", text: "Carreiras" },
    { to: "/contact", text: "Contacto" },
  ];

  const customerLinks = [
    { to: "/customer-auth", text: "Meus Cartões" },
  ];

  return (
    <footer className="border-t bg-gray-50 dark:bg-gray-900 mt-12">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-catback-dark-purple">
              <img src="/images/catback-logo.png" alt="CATBACK Logo" className="w-7 h-7" />
              <span>CATBACK</span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              A plataforma completa para fidelização e crescimento do seu negócio em Portugal.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Plataforma</h4>
            <ul className="space-y-2">
              {platformLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-600 hover:text-catback-purple dark:text-gray-400 dark:hover:text-catback-light-purple transition-colors"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Recursos</h4>
            <ul className="space-y-2">
              {resourcesLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-600 hover:text-catback-purple dark:text-gray-400 dark:hover:text-catback-light-purple transition-colors"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Empresa</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-600 hover:text-catback-purple dark:text-gray-400 dark:hover:text-catback-light-purple transition-colors"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Clientes</h4>
            <ul className="space-y-2">
              {customerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-600 hover:text-catback-purple dark:text-gray-400 dark:hover:text-catback-light-purple transition-colors"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Pronto para começar?</p>
          <BotaoWhatsapp className="bg-catback-purple hover:bg-catback-dark-purple text-white">
            <Phone className="w-4 h-4 mr-2" />
            Fale com um especialista
          </BotaoWhatsapp>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {currentYear} CATBACK. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;