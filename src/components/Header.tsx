import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu, Phone } from "lucide-react";
import BotaoWhatsapp from "./BotaoWhatsapp";
import { useIsMobile } from "@/hooks/use-mobile";

const navLinks = [
  { to: "/nfc-display", text: "Display NFC" },
  { to: "/gmb", text: "Google Meu Negócio" },
  { to: "/industries", text: "Para Quem" },
  { to: "/#features", text: "Funcionalidades" },
  { to: "/fidelizacao", text: "Fidelização" },
  { to: "/pricing", text: "Preços" },
];

const Logo = () => (
  <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-catback-dark-purple">
    <img src="/images/catback-logo.png" alt="CATBACK Logo" className="w-6 h-6" />
    <span>CATBACK</span>
  </Link>
);

const MobileNav = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon" className="lg:hidden">
        <Menu className="h-6 w-6" />
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className="w-[300px] sm:w-[400px]">
      <nav className="flex flex-col space-y-4 mt-6">
        {navLinks.map((item) => (
          <Link
            key={item.text}
            to={item.to}
            className="text-lg font-medium hover:text-catback-purple transition-colors"
          >
            {item.text}
          </Link>
        ))}
        <div className="pt-4 space-y-2">
          <Link to="/login">
            <Button variant="ghost" className="w-full justify-start">
              Entrar
            </Button>
          </Link>
          <a href="https://wa.me/351928202241" target="_blank" rel="noopener noreferrer">
            <Button className="w-full bg-catback-purple hover:bg-catback-dark-purple">
              Solicite uma avaliação Grátis
            </Button>
          </a>
        </div>
      </nav>
    </SheetContent>
  </Sheet>
);

const Header: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((item) => (
            <Link
              key={item.text}
              to={item.to}
              className="transition-colors hover:text-catback-purple"
            >
              {item.text}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center space-x-4">
          <BotaoWhatsapp className="bg-catback-purple hover:bg-catback-dark-purple text-white">
            <Phone className="w-4 h-4 mr-2" />
            Fale Conosco
          </BotaoWhatsapp>
        </div>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-6">
                {navLinks.map((item) => (
                  <Link
                    key={item.text}
                    to={item.to}
                    className="text-lg font-medium hover:text-catback-purple transition-colors"
                  >
                    {item.text}
                  </Link>
                ))}
                <div className="pt-4 space-y-2">
                  <Link to="/login">
                    <Button variant="ghost" className="w-full justify-start">
                      Entrar
                    </Button>
                  </Link>
                  <a href="https://wa.me/351928202241" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-catback-purple hover:bg-catback-dark-purple">
                      Solicite uma avaliação Grátis
                    </Button>
                  </a>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;