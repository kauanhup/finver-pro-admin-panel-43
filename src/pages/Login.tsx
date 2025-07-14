import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular autenticação
    setTimeout(() => {
      if (formData.email === "admin@finverpro.com" && formData.password === "admin123") {
        toast({
          title: "Login realizado com sucesso!",
          description: "Redirecionando para o dashboard...",
        });
        // Aqui seria o redirecionamento real
        window.location.href = "/";
      } else {
        toast({
          title: "Erro no login",
          description: "Email ou senha incorretos.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-background-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-finver-lg">
              FP
            </div>
            <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Finver Pro
            </div>
          </div>
        </div>

        {/* Login Card */}
        <Card className="border-border bg-background shadow-finver-lg">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl font-bold text-text-primary">
              Área Administrativa
            </CardTitle>
            <CardDescription className="text-text-secondary">
              Faça login para acessar o painel admin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-text-primary font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-text-muted" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@finverpro.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 bg-background-tertiary border-border text-text-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-text-primary font-medium">
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-text-muted" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 pr-10 bg-background-tertiary border-border text-text-primary"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 px-0 hover:bg-background-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-text-muted" />
                    ) : (
                      <Eye className="h-4 w-4 text-text-muted" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:opacity-90 transition-opacity text-white font-semibold shadow-finver"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar no Admin"}
              </Button>
            </form>

            {/* Demo credentials */}
            <div className="mt-6 p-4 bg-background-tertiary rounded-lg border border-border">
              <p className="text-sm text-text-secondary mb-2 font-medium">Credenciais de demonstração:</p>
              <p className="text-xs text-text-muted">Email: admin@finverpro.com</p>
              <p className="text-xs text-text-muted">Senha: admin123</p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-text-muted mt-6">
          © 2025 Finver Pro. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}