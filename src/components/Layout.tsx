import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import FloatingWhatsappButton from "./FloatingWhatsappButton";
import GoogleTag from "./GoogleTag";
import MetaPixel from "./MetaPixel";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <GoogleTag />
      <MetaPixel />
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <FloatingWhatsappButton />
    </div>
  );
};

export default Layout;