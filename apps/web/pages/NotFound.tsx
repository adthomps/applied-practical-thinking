import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const NotFound = () => {
  const location = useLocation();

  usePageMetadata({
    title: "Page not found",
    description: "The page you requested does not exist on Applied Practical Thinking.",
    noIndex: true,
  });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="container flex min-h-[60vh] items-center justify-center py-16">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <Link to="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
