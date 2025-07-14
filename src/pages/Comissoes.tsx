import { useState } from "react";
import { Save, DollarSign, TrendingUp, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface NivelComissao {
  nivel: string;
  nome: string;
  comissao: number;
  cor: string;
  descricao: string;
}

export default function Comissoes() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const [niveis, setNiveis] = useState<NivelComissao[]>([
    {
      nivel: "A",
      nome: "Nível A",
      comissao: 15.0,
      cor: "bg-success",
      descricao: "Primeira indicação - maior comissão"
    },
    {
      nivel: "B", 
      nome: "Nível B",
      comissao: 10.0,
      cor: "bg-warning",
      descricao: "Segunda indicação - comissão intermediária"
    },
    {
      nivel: "C",
      nome: "Nível C", 
      comissao: 5.0,
      cor: "bg-danger",
      descricao: "Terceira indicação - comissão básica"
    }
  ]);

  const handleComissaoChange = (nivel: string, novaComissao: number) => {
    setNiveis(prev => prev.map(n => 
      n.nivel === nivel 
        ? { ...n, comissao: novaComissao }
        : n
    ));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Configurações salvas",
        description: "As configurações de comissão foram atualizadas com sucesso!",
      });
    }, 2000);
  };


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-primary rounded-2xl p-6 text-white relative overflow-hidden shadow-finver-xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-16 -translate-y-16" />
        
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h1 className="text-2xl font-bold mb-2 leading-tight">
              Configuração de Comissões
            </h1>
            <p className="text-white/90 text-sm font-medium">
              Configure as comissões para cada nível de indicação
            </p>
          </div>
          
          <div className="text-4xl opacity-80 font-bold">
            <DollarSign className="h-10 w-10" />
          </div>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
              <Award className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-foreground-secondary">Comissão Média</p>
              <p className="text-2xl font-bold text-foreground">
                {((niveis[0].comissao + niveis[1].comissao + niveis[2].comissao) / 3).toFixed(1)}%
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-foreground-secondary">Maior Comissão</p>
              <p className="text-2xl font-bold text-foreground">
                {Math.max(...niveis.map(n => n.comissao))}%
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Configuração dos Níveis */}
      <div className="grid gap-6">
        {niveis.map((nivel) => (
          <Card key={nivel.nivel} className="bg-background border-border shadow-finver hover:shadow-finver-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${nivel.cor} flex items-center justify-center text-white font-bold text-lg`}>
                    {nivel.nivel}
                  </div>
                  <div>
                    <CardTitle className="text-foreground">{nivel.nome}</CardTitle>
                    <CardDescription className="text-foreground-secondary">
                      {nivel.descricao}
                    </CardDescription>
                  </div>
                </div>
                
                <Badge variant="outline" className="text-foreground-secondary">
                  Nível {nivel.nivel}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`comissao-${nivel.nivel}`} className="text-foreground font-medium">
                    Percentual de Comissão (%)
                  </Label>
                  <div className="relative">
                    <Input
                      id={`comissao-${nivel.nivel}`}
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      value={nivel.comissao}
                      onChange={(e) => handleComissaoChange(nivel.nivel, parseFloat(e.target.value) || 0)}
                      className="bg-background-secondary border-border-light focus:border-primary pr-8"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-secondary text-sm">
                      %
                    </span>
                  </div>
                  <p className="text-xs text-foreground-muted">
                    Comissão aplicada sobre cada indicação
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-foreground font-medium">
                    Exemplo de Cálculo
                  </Label>
                  <div className="bg-background-secondary rounded-lg p-3 border border-border-light">
                    <p className="text-sm text-foreground">
                      Transação de <span className="font-mono font-semibold">R$ 1.000,00</span>
                    </p>
                    <p className="text-sm text-foreground-secondary">
                      Comissão: <span className="font-mono font-semibold text-success">
                        R$ {(1000 * (nivel.comissao / 100)).toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
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
                Salvando configurações...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Salvar Configurações de Comissão
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}