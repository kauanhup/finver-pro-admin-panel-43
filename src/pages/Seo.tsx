import { useState } from "react";
import { Save, Search, Globe, Eye, BarChart3, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface SeoConfig {
  titulo: string;
  descricao: string;
  palavrasChave: string;
  autorSite: string;
  urlCanonica: string;
  imagemCompartilhamento: string;
  tituloCompartilhamento: string;
  descricaoCompartilhamento: string;
}

export default function Seo() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const [seoConfig, setSeoConfig] = useState<SeoConfig>({
    titulo: "Finver Pro - Plataforma de Gestão Financeira",
    descricao: "Gerencie suas finanças com a melhor plataforma do mercado. Controle completo de entradas, saídas, investimentos e muito mais.",
    palavrasChave: "finver, gestão financeira, investimentos, controle financeiro, plataforma financeira",
    autorSite: "Finver Pro",
    urlCanonica: "https://finver.pro",
    imagemCompartilhamento: "",
    tituloCompartilhamento: "Finver Pro - Plataforma de Gestão Financeira",
    descricaoCompartilhamento: "Descubra a melhor plataforma para gerenciar suas finanças de forma simples e eficiente."
  });

  const handleInputChange = (field: keyof SeoConfig, value: string) => {
    setSeoConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Configurações de SEO salvas",
        description: "As configurações foram atualizadas com sucesso!",
      });
    }, 2000);
  };

  const previewSeoTags = () => {
    return `
<!-- Meta Tags Básicas -->
<title>${seoConfig.titulo}</title>
<meta name="description" content="${seoConfig.descricao}" />
<meta name="keywords" content="${seoConfig.palavrasChave}" />
<meta name="author" content="${seoConfig.autorSite}" />
<link rel="canonical" href="${seoConfig.urlCanonica}" />

<!-- Open Graph (Facebook) -->
<meta property="og:title" content="${seoConfig.tituloCompartilhamento}" />
<meta property="og:description" content="${seoConfig.descricaoCompartilhamento}" />
<meta property="og:image" content="${seoConfig.imagemCompartilhamento}" />
<meta property="og:url" content="${seoConfig.urlCanonica}" />
<meta property="og:type" content="website" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${seoConfig.tituloCompartilhamento}" />
<meta name="twitter:description" content="${seoConfig.descricaoCompartilhamento}" />
<meta name="twitter:image" content="${seoConfig.imagemCompartilhamento}" />
    `.trim();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-primary rounded-2xl p-6 text-white relative overflow-hidden shadow-finver-xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-16 -translate-y-16" />
        
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h1 className="text-2xl font-bold mb-2 leading-tight">
              Configurações de SEO
            </h1>
            <p className="text-white/90 text-sm font-medium">
              Otimize seu site para mecanismos de busca e redes sociais
            </p>
          </div>
          
          <div className="text-4xl opacity-80 font-bold">
            <Search className="h-10 w-10" />
          </div>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
              <Globe className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-foreground-secondary">Título</p>
              <p className="text-lg font-bold text-foreground">
                {seoConfig.titulo.length}/60
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Eye className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-foreground-secondary">Descrição</p>
              <p className="text-lg font-bold text-foreground">
                {seoConfig.descricao.length}/160
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-foreground-secondary">Palavras-chave</p>
              <p className="text-lg font-bold text-foreground">
                {seoConfig.palavrasChave.split(',').length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Configurações Básicas de SEO */}
        <Card className="bg-background border-border shadow-finver hover:shadow-finver-lg transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Search className="h-5 w-5 text-primary" />
              SEO Básico
            </CardTitle>
            <CardDescription className="text-foreground-secondary">
              Configurações essenciais para otimização nos buscadores
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="titulo" className="text-foreground font-medium">
                Título da Página (Title Tag)
              </Label>
              <Input
                id="titulo"
                value={seoConfig.titulo}
                onChange={(e) => handleInputChange("titulo", e.target.value)}
                placeholder="Título otimizado para SEO"
                className="bg-background-secondary border-border-light focus:border-primary"
                maxLength={60}
              />
              <p className="text-xs text-foreground-muted">
                Recomendado: 50-60 caracteres ({seoConfig.titulo.length}/60)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao" className="text-foreground font-medium">
                Meta Descrição
              </Label>
              <Textarea
                id="descricao"
                value={seoConfig.descricao}
                onChange={(e) => handleInputChange("descricao", e.target.value)}
                placeholder="Descrição atrativa para aparecer nos resultados de busca"
                className="bg-background-secondary border-border-light focus:border-primary resize-none"
                rows={3}
                maxLength={160}
              />
              <p className="text-xs text-foreground-muted">
                Recomendado: 120-160 caracteres ({seoConfig.descricao.length}/160)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="palavrasChave" className="text-foreground font-medium">
                Palavras-chave
              </Label>
              <Input
                id="palavrasChave"
                value={seoConfig.palavrasChave}
                onChange={(e) => handleInputChange("palavrasChave", e.target.value)}
                placeholder="palavra1, palavra2, palavra3"
                className="bg-background-secondary border-border-light focus:border-primary"
              />
              <p className="text-xs text-foreground-muted">
                Separe as palavras-chave por vírgula
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="autor" className="text-foreground font-medium">
                  Autor do Site
                </Label>
                <Input
                  id="autor"
                  value={seoConfig.autorSite}
                  onChange={(e) => handleInputChange("autorSite", e.target.value)}
                  placeholder="Nome do autor"
                  className="bg-background-secondary border-border-light focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="canonical" className="text-foreground font-medium">
                  URL Canônica
                </Label>
                <Input
                  id="canonical"
                  type="url"
                  value={seoConfig.urlCanonica}
                  onChange={(e) => handleInputChange("urlCanonica", e.target.value)}
                  placeholder="https://seusite.com"
                  className="bg-background-secondary border-border-light focus:border-primary"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configurações de Compartilhamento Social */}
        <Card className="bg-background border-border shadow-finver hover:shadow-finver-lg transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Users className="h-5 w-5 text-primary" />
              Redes Sociais
            </CardTitle>
            <CardDescription className="text-foreground-secondary">
              Como seu site aparecerá quando compartilhado
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="imagemCompartilhamento" className="text-foreground font-medium">
                Imagem de Compartilhamento
              </Label>
              <Input
                id="imagemCompartilhamento"
                type="url"
                value={seoConfig.imagemCompartilhamento}
                onChange={(e) => handleInputChange("imagemCompartilhamento", e.target.value)}
                placeholder="https://seusite.com/imagem.jpg"
                className="bg-background-secondary border-border-light focus:border-primary"
              />
              <p className="text-xs text-foreground-muted">
                Recomendado: 1200x630px para Facebook/LinkedIn
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tituloCompartilhamento" className="text-foreground font-medium">
                Título para Compartilhamento
              </Label>
              <Input
                id="tituloCompartilhamento"
                value={seoConfig.tituloCompartilhamento}
                onChange={(e) => handleInputChange("tituloCompartilhamento", e.target.value)}
                placeholder="Título atrativo para redes sociais"
                className="bg-background-secondary border-border-light focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricaoCompartilhamento" className="text-foreground font-medium">
                Descrição para Compartilhamento
              </Label>
              <Textarea
                id="descricaoCompartilhamento"
                value={seoConfig.descricaoCompartilhamento}
                onChange={(e) => handleInputChange("descricaoCompartilhamento", e.target.value)}
                placeholder="Descrição para aparecer nas redes sociais"
                className="bg-background-secondary border-border-light focus:border-primary resize-none"
                rows={3}
              />
            </div>

            {/* Preview das Meta Tags */}
            <div className="bg-background-secondary rounded-lg p-4 border border-border-light">
              <h4 className="text-sm font-semibold text-foreground mb-2">
                Preview das Meta Tags
              </h4>
              <pre className="text-xs text-foreground-secondary overflow-x-auto whitespace-pre-wrap">
                {previewSeoTags()}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Botão de Salvar */}
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
                Salvar Configurações de SEO
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}