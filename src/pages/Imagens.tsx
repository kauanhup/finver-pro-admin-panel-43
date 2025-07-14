import { useState, useRef } from "react";
import { Save, Image, Upload, Eye, Download, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ImageConfig {
  id: string;
  nome: string;
  descricao: string;
  arquivo?: File;
  url?: string;
  preview?: string;
  recomendacao: string;
}

export default function Imagens() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const [imagens, setImagens] = useState<ImageConfig[]>([
    {
      id: "favicon",
      nome: "Favicon",
      descricao: "Ícone que aparece na aba do navegador",
      recomendacao: "32x32px ou 16x16px, formato PNG/ICO"
    },
    {
      id: "logo",
      nome: "Logo Principal",
      descricao: "Logo da marca exibido no cabeçalho",
      recomendacao: "Formato PNG com fundo transparente, altura 40-60px"
    },
    {
      id: "logo-dark",
      nome: "Logo (Modo Escuro)",
      descricao: "Versão do logo para tema escuro",
      recomendacao: "Formato PNG com fundo transparente, altura 40-60px"
    },
    {
      id: "placeholder",
      nome: "Avatar Padrão",
      descricao: "Imagem padrão para usuários sem foto",
      recomendacao: "Formato quadrado, 200x200px, PNG"
    }
  ]);

  const handleFileChange = (id: string, file: File | null) => {
    if (!file) return;

    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Erro",
        description: "Por favor, selecione uma imagem válida (PNG, JPG, GIF, WebP)",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Erro", 
        description: "A imagem deve ter no máximo 5MB",
        variant: "destructive",
      });
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagens(prev => prev.map(img => 
        img.id === id 
          ? { ...img, arquivo: file, preview: e.target?.result as string }
          : img
      ));
    };
    reader.readAsDataURL(file);
  };

  const handleUrlChange = (id: string, url: string) => {
    setImagens(prev => prev.map(img => 
      img.id === id 
        ? { ...img, url, preview: url }
        : img
    ));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Imagens atualizadas",
        description: "As configurações de imagem foram salvas com sucesso!",
      });
    }, 2000);
  };

  const clearImage = (id: string) => {
    setImagens(prev => prev.map(img => 
      img.id === id 
        ? { ...img, arquivo: undefined, url: "", preview: undefined }
        : img
    ));
    
    if (fileInputRefs.current[id]) {
      fileInputRefs.current[id]!.value = "";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-primary rounded-2xl p-6 text-white relative overflow-hidden shadow-finver-xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-16 -translate-y-16" />
        
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h1 className="text-2xl font-bold mb-2 leading-tight">
              Personalizar Imagens
            </h1>
            <p className="text-white/90 text-sm font-medium">
              Configure o favicon, logos e outras imagens do sistema
            </p>
          </div>
          
          <div className="text-4xl opacity-80 font-bold">
            <Image className="h-10 w-10" />
          </div>
        </div>
      </div>

      {/* Grid de Imagens */}
      <div className="grid gap-6">
        {imagens.map((imagem) => (
          <Card key={imagem.id} className="bg-background border-border shadow-finver hover:shadow-finver-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Image className="h-5 w-5 text-primary" />
                {imagem.nome}
              </CardTitle>
              <CardDescription className="text-foreground-secondary">
                {imagem.descricao}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="bg-background-secondary rounded-lg p-3 border border-border-light">
                <p className="text-xs text-foreground-muted">
                  <strong>Recomendação:</strong> {imagem.recomendacao}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upload de Arquivo */}
                <div className="space-y-4">
                  <Label className="text-foreground font-medium">Upload de Arquivo</Label>
                  
                  <div className="space-y-2">
                    <Input
                      ref={(el) => fileInputRefs.current[imagem.id] = el}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(imagem.id, e.target.files?.[0] || null)}
                      className="bg-background-secondary border-border-light focus:border-primary"
                    />
                    
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRefs.current[imagem.id]?.click()}
                        className="flex-1"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Selecionar Arquivo
                      </Button>
                      
                      {imagem.preview && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => clearImage(imagem.id)}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* URL Externa */}
                <div className="space-y-4">
                  <Label className="text-foreground font-medium">URL Externa</Label>
                  
                  <div className="space-y-2">
                    <Input
                      type="url"
                      placeholder="https://exemplo.com/imagem.png"
                      value={imagem.url || ""}
                      onChange={(e) => handleUrlChange(imagem.id, e.target.value)}
                      className="bg-background-secondary border-border-light focus:border-primary"
                    />
                    
                    <p className="text-xs text-foreground-muted">
                      Cole a URL de uma imagem hospedada externamente
                    </p>
                  </div>
                </div>
              </div>

              {/* Preview */}
              {imagem.preview && (
                <div className="space-y-2">
                  <Label className="text-foreground font-medium flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Preview
                  </Label>
                  
                  <div className="bg-background-secondary rounded-lg p-4 border border-border-light">
                    <div className="flex items-center justify-center">
                      <img
                        src={imagem.preview}
                        alt={`Preview ${imagem.nome}`}
                        className="max-w-full max-h-32 object-contain rounded"
                        onError={() => {
                          toast({
                            title: "Erro ao carregar imagem",
                            description: "Verifique se a URL da imagem está correta",
                            variant: "destructive",
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
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
                Salvando imagens...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Salvar Configurações de Imagem
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}