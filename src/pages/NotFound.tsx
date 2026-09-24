import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { EditorFrame } from "@/components/EditorFrame";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-6">
      <div aria-hidden className="pointer-events-none fixed inset-0 dot-grid" />
      <div className="relative w-full max-w-lg">
        <EditorFrame title="404.ts">
          <p className="font-mono text-sm text-muted-foreground leading-7">
            <span className="text-primary">const</span> route = <span className="code-string">"{location.pathname}"</span>;
            <br />
            <span className="text-destructive">Error:</span> page not found
          </p>
          <Link to="/" className="inline-block mt-6 font-mono text-sm text-primary hover:underline">
            cd ~/home
          </Link>
        </EditorFrame>
      </div>
    </div>
  );
};

export default NotFound;
