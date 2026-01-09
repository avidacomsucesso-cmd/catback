import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import GoogleTag from './GoogleTag';
import CalendlyWidget from './CalendlyWidget';
import FloatingWhatsappButton from './FloatingWhatsappButton';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <GoogleTag />
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <FloatingWhatsappButton />
      <CalendlyWidget />
    </div>
  );
};

export default Layout;