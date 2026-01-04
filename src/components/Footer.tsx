import React from "react";
import { Link } from "react-router-dom";
import { Cat } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Plataforma",
      links: [
        { name: "Fidelização", href: "/fidelizacao" }, // Novo link
        { name: "Funcionalidades", href: "/features" },
        { name: "Display NFC", href: "/nfc-display" },
        { name: "Preços", href: "/pricing" },
        { name: "Como Funciona", href: "/how-it-works" },
        { name: "Para Quem", href: "/industries" },
      ],
    },
    {
      title: "Recursos",
      links: [
        { name: "Blog", href: "/blog" },
        { name: "Ajuda (FAQ)", href: "/help" },
        { name: "Termos de Serviço", href: "/terms" },
        { name: "Política de Privacidade", href: "/privacy" },
      ],
    },
    {
      title: "Empresa",
      links: [
        { name: "Sobre Nós", href: "/about" },
        { name: "Carreiras", href: "/careers" },
        { name: "Contacto", href: "/contact" },
      ],
    },
    {
      title: "Clientes",
      links: [
        { name: "Meus Cartões", href: "/customer-auth" },
      ],
    },
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

          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-600 hover:text-catback-purple dark:text-gray-400 dark:hover:text-catback-light-purple transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {currentYear} CATBACK. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;