import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Settings, Type, Globe, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ConfigTexto {
  id?: number;
  categoria: string;
  chave: string;
  valor: string;
  descricao?: string;
}

export default function ConfigTexto() {
  const { toast } = useToast();
  
  const [configsTextos, setConfigsTextos] = useState<ConfigTexto[]>([
    { categoria: 'sistema', chave: 'nome_site', valor: 'Finver Pro', descricao: 'Nome do site' },
    { categoria: 'sistema', chave: 'url_site', valor: 'https://finverpro.shop', descricao: 'URL principal do site' },
    { categoria: 'sistema', chave: 'email_contato', valor: 'contato@finverpro.shop', descricao: 'Email de contato' },
    { categoria: 'sistema', chave: 'telefone_suporte', valor: 'https://t.me/finverpro', descricao: 'Link do suporte' },
    { categoria: 'sistema', chave: 'dominio_convite', valor: 'finverpro.shop/r/', descricao: 'Domínio para códigos de convite' },
    { categoria: 'textos', chave: 'titulo_principal', valor: 'Invista com Inteligência Artificial', descricao: 'Título principal da página' },
    { categoria: 'textos', chave: 'subtitulo_principal', valor: 'Maximize seus lucros com nossa plataforma de investimentos automatizada', descricao: 'Subtítulo da página principal' },
    { categoria: 'textos', chave: 'texto_boas_vindas', valor: 'Bem-vindo à revolução dos investimentos inteligentes', descricao: 'Texto de boas-vindas' },
    { categoria: 'textos', chave: 'texto_sobre_plataforma', valor: 'Nossa IA analisa o mercado 24/7 para encontrar as melhores oportunidades de investimento', descricao: 'Texto sobre a plataforma' },
    { categoria: 'textos', chave: 'call_to_action', valor: 'Comece a Investir Agora', descricao: 'Texto do botão principal' },
    { categoria: 'marketing', chave: 'convite_geral', valor: '🚀 Finver Pro - Investimentos com IA! Ganhe dinheiro enquanto dorme. Cadastre-se com meu código e ganhe bônus: {codigo}', descricao: 'Texto de convite geral' },
  ]);

  const handleSaveConfigs = async (configs: ConfigTexto[], setConfigs: React.Dispatch<React.SetStateAction<ConfigTexto[]>>) => {
    try {
      // Simular salvamento no banco
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Configurações salvas",
        description: "Todas as configurações foram atualizadas com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar as configurações.",
        variant: "destructive",
      });
    }
  };

  const updateConfig = (configs: ConfigTexto[], setConfigs: React.Dispatch<React.SetStateAction<ConfigTexto[]>>, chave: string, valor: string) => {
    const newConfigs = configs.map(config => 
      config.chave === chave ? { ...config, valor } : config
    );
    setConfigs(newConfigs);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Type className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Configuração de Textos</h1>
          <p className="text-muted-foreground">Configure textos da plataforma, anúncios e marketing</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configurações de Textos</CardTitle>
          <CardDescription>
            Configure todas as informações de texto da plataforma em um só lugar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {configsTextos.map((config) => (
            <div key={config.chave} className="space-y-2">
              <Label htmlFor={config.chave}>{config.descricao}</Label>
              {(config.chave === 'texto_sobre_plataforma' || config.chave.includes('convite')) ? (
                <Textarea
                  id={config.chave}
                  value={config.valor}
                  onChange={(e) => updateConfig(configsTextos, setConfigsTextos, config.chave, e.target.value)}
                  placeholder={config.descricao}
                  rows={3}
                />
              ) : (
                <Input
                  id={config.chave}
                  value={config.valor}
                  onChange={(e) => updateConfig(configsTextos, setConfigsTextos, config.chave, e.target.value)}
                  placeholder={config.descricao}
                />
              )}
              {config.chave.includes('convite') && (
                <p className="text-sm text-muted-foreground">
                  💡 Dica: Use {"{codigo}"} para inserir automaticamente o código de referência do usuário
                </p>
              )}
            </div>
          ))}
          
          <Button 
            onClick={() => handleSaveConfigs(configsTextos, setConfigsTextos)}
            className="w-full"
          >
            <Save className="mr-2 h-4 w-4" />
            Salvar Todas as Configurações
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}