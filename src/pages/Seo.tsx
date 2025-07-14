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
}

export default function Seo() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const [seoConfig, setSeoConfig] = useState<SeoConfig>({
    titulo: "Finver Pro - Plataforma de Gestão Financeira",
    descricao: "Gerencie suas finanças com a melhor plataforma do mercado. Controle completo de entradas, saídas, investimentos e muito mais.",
    palavrasChave: "finver, gestão financeira, investimentos, controle financeiro, plataforma financeira",
    autorSite: "Finver Pro",
    urlCanonica: "https://finver.pro"
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
    `.trim();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-primary rounded-2xl p-4 sm:p-6 text-white relative overflow-hidden shadow-finver-xl">
        <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full transform translate-x-12 sm:translate-x-16 -translate-y-12 sm:-translate-y-16" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between relative z-10 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold mb-2 leading-tight">
              Configurações de SEO
            </h1>
            <p className="text-white/90 text-sm font-medium">
              Otimize seu site para mecanismos de busca
            </p>
          </div>
          
          <div className="hidden sm:block text-4xl opacity-80 font-bold">
            <Search className="h-8 w-8 sm:h-10 sm:w-10" />
          </div>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-success/10 flex items-center justify-center">
              <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-success" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-foreground-secondary">Título</p>
              <p className="text-base sm:text-lg font-bold text-foreground">
                {seoConfig.titulo.length}/60
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Eye className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-foreground-secondary">Descrição</p>
              <p className="text-base sm:text-lg font-bold text-foreground">
                {seoConfig.descricao.length}/160
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-warning/10 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-warning" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-foreground-secondary">Palavras-chave</p>
              <p className="text-base sm:text-lg font-bold text-foreground">
                {seoConfig.palavrasChave.split(',').length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Configurações Básicas de SEO */}
      <Card className="bg-background border-border shadow-finver hover:shadow-finver-lg transition-all duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Search className="h-5 w-5 text-primary" />
            Configurações de SEO
          </CardTitle>
          <CardDescription className="text-foreground-secondary">
            Configurações essenciais para otimização nos buscadores
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4 sm:space-y-6">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

          {/* Preview das Meta Tags */}
          <div className="bg-background-secondary rounded-lg p-3 sm:p-4 border border-border-light">
            <h4 className="text-sm font-semibold text-foreground mb-2">
              Preview das Meta Tags
            </h4>
            <pre className="text-xs text-foreground-secondary overflow-x-auto whitespace-pre-wrap">
              {previewSeoTags()}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Botão de Salvar */}
      <Card className="bg-background border-border shadow-finver">
        <CardContent className="pt-4 sm:pt-6">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full bg-gradient-primary hover:opacity-90 text-white shadow-finver hover:shadow-finver-lg transition-all duration-300 hover:-translate-y-0.5 text-sm sm:text-base py-2 sm:py-3"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-2 border-white border-t-transparent mr-2" />
                Salvando configurações...
              </>
            ) : (
              <>
                <Save className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                Salvar Configurações de SEO
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}