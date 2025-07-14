import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-foreground">404</h1>
        <p className="text-xl text-foreground-secondary mb-4">Oops! Página não encontrada</p>
        <a href="/" className="text-primary hover:text-primary-light underline">
          Voltar ao Dashboard
        </a>
      </div>
    </div>
  );
};

export default NotFound;
