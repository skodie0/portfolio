import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Lock, Mail } from "lucide-react";
import { EditorFrame } from "@/components/EditorFrame";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Logged in successfully");
      navigate("/admin");
    } catch {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center px-6">
      <div aria-hidden className="pointer-events-none fixed inset-0 dot-grid" />
      <div className="relative w-full max-w-md">
        <div className="mb-6">
          <Link to="/" className="font-mono text-sm font-semibold text-primary">
            ~/dev
          </Link>
          <h1 className="text-2xl font-bold mt-3">Admin Login</h1>
          <p className="text-muted-foreground text-sm mt-1">Sign in to manage your portfolio</p>
        </div>

        <EditorFrame title="auth.ts" bodyClassName="p-0">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button type="submit" variant="hero" size="lg" className="w-full font-mono hover:scale-100" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        </EditorFrame>
      </div>
    </div>
  );
};

export default Login;
