import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Save, 
  Settings, 
  MessageSquare, 
  DollarSign, 
  Eye, 
  EyeOff,
  TestTube,
  Phone,
  Key,
  Gift
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Cadastro() {
  const [showAccountSid, setShowAccountSid] = useState(false);
  const [showAuthToken, setShowAuthToken] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isTestingTwilio, setIsTestingTwilio] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    accountSid: "",
    authToken: "",
    phoneNumber: "",
    bonusValue: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    // Validate required fields
    if (!formData.accountSid || !formData.authToken || !formData.phoneNumber || !formData.bonusValue) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Configurações salvas",
        description: "As configurações de cadastro foram atualizadas com sucesso!",
      });
    }, 2000);
  };

  const testTwilioConnection = async () => {
    if (!formData.accountSid || !formData.authToken || !formData.phoneNumber) {
      toast({
        title: "Erro",
        description: "Por favor, preencha as credenciais do Twilio antes de testar",
        variant: "destructive",
      });
      return;
    }

    setIsTestingTwilio(true);
    
    // Simulate API test
    setTimeout(() => {
      setIsTestingTwilio(false);
      toast({
        title: "Teste concluído",
        description: "Conexão com Twilio testada com sucesso! SMS de teste enviado.",
      });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-primary rounded-2xl p-6 text-white relative overflow-hidden shadow-finver-xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-16 -translate-y-16" />
        
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h1 className="text-2xl font-bold mb-2 leading-tight">
              Configurações de Cadastro
            </h1>
            <p className="text-white/90 text-sm font-medium">
              Configure as credenciais do Twilio e defina o valor do bônus de cadastro
            </p>
          </div>
          
          <div className="text-4xl opacity-80 font-bold">
            <Settings className="h-10 w-10" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Twilio Configuration */}
        <Card className="bg-background border-border shadow-finver hover:shadow-finver-lg transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <MessageSquare className="h-5 w-5 text-primary" />
              Configurações do Twilio
            </CardTitle>
            <CardDescription className="text-foreground-secondary">
              Configure as credenciais para envio de SMS automático
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="accountSid" className="text-foreground font-medium">
                Account SID *
              </Label>
              <div className="relative">
                <Input
                  id="accountSid"
                  type={showAccountSid ? "text" : "password"}
                  value={formData.accountSid}
                  onChange={(e) => handleInputChange("accountSid", e.target.value)}
                  placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="bg-background-secondary border-border-light focus:border-primary pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0 hover:bg-background-tertiary"
                  onClick={() => setShowAccountSid(!showAccountSid)}
                >
                  {showAccountSid ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="authToken" className="text-foreground font-medium">
                Auth Token *
              </Label>
              <div className="relative">
                <Input
                  id="authToken"
                  type={showAuthToken ? "text" : "password"}
                  value={formData.authToken}
                  onChange={(e) => handleInputChange("authToken", e.target.value)}
                  placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="bg-background-secondary border-border-light focus:border-primary pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0 hover:bg-background-tertiary"
                  onClick={() => setShowAuthToken(!showAuthToken)}
                >
                  {showAuthToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-foreground font-medium">
                Número do Twilio *
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  placeholder="+5511999999999"
                  className="bg-background-secondary border-border-light focus:border-primary pl-10"
                />
              </div>
            </div>

            <Separator className="bg-border-light" />

            <Button
              onClick={testTwilioConnection}
              disabled={isTestingTwilio}
              variant="outline"
              className="w-full border-border-light hover:bg-background-secondary"
            >
              {isTestingTwilio ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent mr-2" />
                  Testando conexão...
                </>
              ) : (
                <>
                  <TestTube className="h-4 w-4 mr-2" />
                  Testar Conexão Twilio
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Bonus Configuration */}
        <Card className="bg-background border-border shadow-finver hover:shadow-finver-lg transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Gift className="h-5 w-5 text-primary" />
              Configurações de Bônus
            </CardTitle>
            <CardDescription className="text-foreground-secondary">
              Defina o valor do bônus de boas-vindas para novos usuários
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bonusValue" className="text-foreground font-medium">
                Valor do Bônus de Cadastro *
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
                <Input
                  id="bonusValue"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.bonusValue}
                  onChange={(e) => handleInputChange("bonusValue", e.target.value)}
                  placeholder="50.00"
                  className="bg-background-secondary border-border-light focus:border-primary pl-10"
                />
              </div>
              <p className="text-xs text-foreground-muted">
                Valor em reais que será creditado automaticamente no cadastro
              </p>
            </div>

          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <Card className="bg-background border-border shadow-finver">
        <CardContent className="pt-6">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full bg-gradient-primary hover:opacity-90 text-white shadow-finver hover:shadow-finver-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                Salvando configurações...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Salvar Configurações
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}