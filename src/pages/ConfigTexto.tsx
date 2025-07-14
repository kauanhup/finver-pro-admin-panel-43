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
  
  const [configsSistema, setConfigsSistema] = useState<ConfigTexto[]>([
    { categoria: 'sistema', chave: 'nome_site', valor: 'Finver Pro', descricao: 'Nome do site' },
    { categoria: 'sistema', chave: 'url_site', valor: 'https://finverpro.shop', descricao: 'URL principal do site' },
    { categoria: 'sistema', chave: 'email_contato', valor: 'contato@finverpro.shop', descricao: 'Email de contato' },
    { categoria: 'sistema', chave: 'telefone_suporte', valor: 'https://t.me/finverpro', descricao: 'Link do suporte' },
    { categoria: 'sistema', chave: 'dominio_convite', valor: 'finverpro.shop/r/', descricao: 'Domínio para códigos de convite' },
  ]);

  const [textosAnuncios, setTextosAnuncios] = useState<ConfigTexto[]>([
    { categoria: 'textos', chave: 'titulo_principal', valor: 'Invista com Inteligência Artificial', descricao: 'Título principal da página' },
    { categoria: 'textos', chave: 'subtitulo_principal', valor: 'Maximize seus lucros com nossa plataforma de investimentos automatizada', descricao: 'Subtítulo da página principal' },
    { categoria: 'textos', chave: 'texto_boas_vindas', valor: 'Bem-vindo à revolução dos investimentos inteligentes', descricao: 'Texto de boas-vindas' },
    { categoria: 'textos', chave: 'texto_sobre_plataforma', valor: 'Nossa IA analisa o mercado 24/7 para encontrar as melhores oportunidades de investimento', descricao: 'Texto sobre a plataforma' },
    { categoria: 'textos', chave: 'call_to_action', valor: 'Comece a Investir Agora', descricao: 'Texto do botão principal' },
  ]);

  const [textosMarketing, setTextosMarketing] = useState<ConfigTexto[]>([
    { categoria: 'marketing', chave: 'convite_whatsapp', valor: '🚀 Descubra a revolução dos investimentos! Ganhe dinheiro com IA enquanto dorme. Cadastre-se com meu código e ganhe bônus: {codigo}', descricao: 'Texto para convite via WhatsApp' },
    { categoria: 'marketing', chave: 'convite_telegram', valor: '💰 Investimentos automatizados com IA! Lucros diários garantidos. Use meu código: {codigo}', descricao: 'Texto para convite via Telegram' },
    { categoria: 'marketing', chave: 'email_marketing', valor: 'Transforme seus sonhos em realidade com nossa plataforma de investimentos', descricao: 'Assunto de e-mail marketing' },
    { categoria: 'marketing', chave: 'anuncio_facebook', valor: 'Ganhe dinheiro enquanto dorme! IA que trabalha por você 24h', descricao: 'Texto para anúncios Facebook' },
    { categoria: 'marketing', chave: 'anuncio_instagram', valor: '📈 Investimentos inteligentes, lucros reais! Junte-se a milhares de investidores', descricao: 'Texto para anúncios Instagram' },
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

      <Tabs defaultValue="sistema" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sistema" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Sistema
          </TabsTrigger>
          <TabsTrigger value="anuncios" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Anúncios
          </TabsTrigger>
          <TabsTrigger value="marketing" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Marketing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sistema">
          <Card>
            <CardHeader>
              <CardTitle>Configurações do Sistema</CardTitle>
              <CardDescription>
                Configure informações básicas da plataforma como nome, domínio e contatos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {configsSistema.map((config) => (
                <div key={config.chave} className="space-y-2">
                  <Label htmlFor={config.chave}>{config.descricao}</Label>
                  {config.chave === 'texto_sobre_plataforma' ? (
                    <Textarea
                      id={config.chave}
                      value={config.valor}
                      onChange={(e) => updateConfig(configsSistema, setConfigsSistema, config.chave, e.target.value)}
                      placeholder={config.descricao}
                      rows={3}
                    />
                  ) : (
                    <Input
                      id={config.chave}
                      value={config.valor}
                      onChange={(e) => updateConfig(configsSistema, setConfigsSistema, config.chave, e.target.value)}
                      placeholder={config.descricao}
                    />
                  )}
                </div>
              ))}
              
              <Button 
                onClick={() => handleSaveConfigs(configsSistema, setConfigsSistema)}
                className="w-full"
              >
                <Save className="mr-2 h-4 w-4" />
                Salvar Configurações do Sistema
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="anuncios">
          <Card>
            <CardHeader>
              <CardTitle>Textos para Anúncios</CardTitle>
              <CardDescription>
                Configure os textos principais que aparecem na plataforma e landing pages
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {textosAnuncios.map((config) => (
                <div key={config.chave} className="space-y-2">
                  <Label htmlFor={config.chave}>{config.descricao}</Label>
                  {config.chave.includes('texto_') ? (
                    <Textarea
                      id={config.chave}
                      value={config.valor}
                      onChange={(e) => updateConfig(textosAnuncios, setTextosAnuncios, config.chave, e.target.value)}
                      placeholder={config.descricao}
                      rows={3}
                    />
                  ) : (
                    <Input
                      id={config.chave}
                      value={config.valor}
                      onChange={(e) => updateConfig(textosAnuncios, setTextosAnuncios, config.chave, e.target.value)}
                      placeholder={config.descricao}
                    />
                  )}
                </div>
              ))}
              
              <Button 
                onClick={() => handleSaveConfigs(textosAnuncios, setTextosAnuncios)}
                className="w-full"
              >
                <Save className="mr-2 h-4 w-4" />
                Salvar Textos de Anúncios
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marketing">
          <Card>
            <CardHeader>
              <CardTitle>Textos de Marketing</CardTitle>
              <CardDescription>
                Configure textos para convites, e-mail marketing e redes sociais. Use {"{codigo}"} para inserir o código de referência automaticamente.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {textosMarketing.map((config) => (
                <div key={config.chave} className="space-y-2">
                  <Label htmlFor={config.chave}>{config.descricao}</Label>
                  <Textarea
                    id={config.chave}
                    value={config.valor}
                    onChange={(e) => updateConfig(textosMarketing, setTextosMarketing, config.chave, e.target.value)}
                    placeholder={config.descricao}
                    rows={4}
                  />
                  {config.chave.includes('convite') && (
                    <p className="text-sm text-muted-foreground">
                      💡 Dica: Use {"{codigo}"} para inserir automaticamente o código de referência do usuário
                    </p>
                  )}
                </div>
              ))}
              
              <Button 
                onClick={() => handleSaveConfigs(textosMarketing, setTextosMarketing)}
                className="w-full"
              >
                <Save className="mr-2 h-4 w-4" />
                Salvar Textos de Marketing
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}