"use client";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Rola para o topo da janela suavemente ou instantaneamente
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;