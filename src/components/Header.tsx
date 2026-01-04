import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, Cat } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { name: "Google Meu Negócio", href: "/features#gmb" }, // Anexo 3: Primeiro
  { name: "Display NFC", href: "/nfc-display" }, // Anexo 2: Segundo
  { name: "Funcionalidades", href: "/features" }, // Anexo 2: Terceiro
  { name: "Fidelização", href: "/fidelizacao" }, // Anexo 2: Quarto
  { name: "Preços", href: "/pricing" },
  { name: "Para Quem", href: "/industries" },
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
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="text-lg font-medium hover:text-catback-purple transition-colors"
          >
            {item.name}
          </Link>
        ))}
        <div className="pt-4 space-y-2">
          <Link to="/login">
            <Button variant="ghost" className="w-full justify-start">
              Entrar
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="w-full bg-catback-purple hover:bg-catback-dark-purple">
              Começar Grátis
            </Button>
          </Link>
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

        <div className="hidden lg:flex items-center space-x-6">
          <nav className="flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-catback-purple text-gray-600 dark:text-gray-400"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-2">
            <Link to="/login">
              <Button variant="ghost" className="text-catback-dark-purple hover:bg-catback-light-purple/50">
                Entrar
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-catback-purple hover:bg-catback-dark-purple transition-colors">
                Começar Grátis
              </Button>
            </Link>
          </div>
        </div>

        {/* We render MobileNav only if isMobile is true, which is safe */}
        {isMobile && <MobileNav />}
      </div>
    </header>
  );
};

export default Header;