import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChartLine, Eye, EyeOff, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [captchaAnswer, setCaptchaAnswer] = useState(0);
  const [captchaQuestion, setCaptchaQuestion] = useState("");
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
    captcha: ""
  });
  const { toast } = useToast();

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-', '×'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    let answer = 0;
    let question = '';
    
    switch(operator) {
      case '+':
        answer = num1 + num2;
        question = `${num1} + ${num2} = ?`;
        break;
      case '-':
        answer = num1 - num2;
        question = `${num1} - ${num2} = ?`;
        break;
      case '×':
        answer = num1 * num2;
        question = `${num1} × ${num2} = ?`;
        break;
    }
    
    setCaptchaAnswer(answer);
    setCaptchaQuestion(question);
    setFormData(prev => ({ ...prev, captcha: "" }));
  };

  useEffect(() => {
    generateCaptcha();
    // Toast de boas-vindas após 1 segundo
    const timer = setTimeout(() => {
      toast({
        title: "Bem-vindo ao FinverPro!",
        description: "Entre com suas credenciais para continuar",
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validação do captcha
    if (parseInt(formData.captcha) !== captchaAnswer) {
      toast({
        title: "Erro na verificação",
        description: "Resposta do cálculo incorreta.",
        variant: "destructive",
      });
      setIsLoading(false);
      generateCaptcha();
      return;
    }

    // Simular autenticação com hash de confirmação
    setTimeout(() => {
      if (formData.emailOrPhone === "admin@finverpro.com" && formData.password === "admin123") {
        toast({
          title: "Verificação de segurança",
          description: "hash174727274837277;'akgsvsjfiamqlbxue>#^&÷*$< - Acesso autorizado",
        });
        
        setTimeout(() => {
          toast({
            title: "Login realizado com sucesso!",
            description: "Redirecionando para a plataforma...",
          });
          // Aqui seria o redirecionamento real
          window.location.href = "/";
        }, 2000);
      } else {
        toast({
          title: "Erro no login",
          description: "Email/telefone ou senha incorretos.",
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
    <div className="min-h-screen bg-gradient-to-br from-background to-background-secondary flex flex-col">
      {/* Header */}
      <header className="bg-background border-b border-border p-4 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-center">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-primary rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-lg">
              <ChartLine className="w-6 h-6" />
            </div>
            <div className="text-xl font-bold text-text-primary font-sans">FinverPro</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md">
          {/* Login Container */}
          <div className="bg-background border border-border rounded-2xl shadow-xl overflow-hidden animate-fade-in">
            {/* Welcome Header */}
            <div className="bg-gradient-to-br from-primary to-primary-light text-white p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-6 translate-x-6"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-4 -translate-x-4"></div>
              <div className="relative z-10">
                <h1 className="text-2xl font-bold mb-2 font-sans">Bem-vindo de volta</h1>
                <p className="text-white/90 text-base">Continue sua jornada de investimentos</p>
              </div>
            </div>

            {/* Form Section */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email/Phone Field */}
                <div className="space-y-2">
                  <Label htmlFor="emailOrPhone" className="text-text-primary font-medium">
                    Email ou Telefone
                  </Label>
                  <Input
                    id="emailOrPhone"
                    name="emailOrPhone"
                    type="text"
                    placeholder="Digite seu email ou telefone"
                    value={formData.emailOrPhone}
                    onChange={handleChange}
                    className="h-12 bg-background-tertiary border-border text-text-primary placeholder:text-text-muted"
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-text-primary font-medium">
                    Senha
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Digite sua senha"
                      value={formData.password}
                      onChange={handleChange}
                      className="h-12 pr-12 bg-background-tertiary border-border text-text-primary placeholder:text-text-muted"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-2 h-8 w-8 p-0 hover:bg-background-secondary"
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

                {/* Captcha */}
                <div className="space-y-2">
                  <Label className="text-text-primary font-medium">
                    Verificação de Segurança
                  </Label>
                  <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                    <div className="bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/20 rounded-xl p-4 text-center font-bold text-lg text-accent min-w-32 shadow-sm">
                      {captchaQuestion}
                    </div>
                    <Input
                      name="captcha"
                      type="number"
                      placeholder="?"
                      value={formData.captcha}
                      onChange={handleChange}
                      className="h-12 w-20 text-center bg-background-tertiary border-border text-text-primary"
                      required
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={generateCaptcha}
                    className="text-accent hover:text-primary text-sm p-0 h-auto font-medium"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Gerar novo cálculo
                  </Button>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-primary hover:opacity-90 text-white font-semibold shadow-md transition-all duration-200 hover:-translate-y-0.5"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Entrando...
                    </>
                  ) : (
                    <>
                      <ChartLine className="w-4 h-4 mr-2" />
                      Entrar na Plataforma
                    </>
                  )}
                </Button>

                {/* Links */}
                <div className="text-center space-y-4 pt-4">
                  <a href="#" className="text-accent hover:text-primary text-sm font-medium transition-colors">
                    Esqueceu sua senha?
                  </a>
                  <div className="text-sm text-text-secondary">
                    Ainda não tem uma conta?{' '}
                    <a href="#" className="text-accent hover:text-primary font-semibold transition-colors">
                      Cadastre-se gratuitamente
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}