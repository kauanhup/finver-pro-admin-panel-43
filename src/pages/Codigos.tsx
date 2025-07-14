import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Calendar as CalendarIcon, Copy, Trash2, RefreshCw, Tag } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface Codigo {
  id: string;
  codigo: string;
  valor: number;
  tipoValidade: "ilimitado" | "data";
  dataExpiracao?: Date;
  quantidadeUsos: number;
  usosRestantes: number;
  criadoEm: Date;
  status: "ativo" | "expirado" | "esgotado";
}

export function Codigos() {
  const { toast } = useToast();
  const [codigos, setCodigos] = useState<Codigo[]>([
    {
      id: "1",
      codigo: "BONUS50",
      valor: 50,
      tipoValidade: "data",
      dataExpiracao: new Date("2025-02-15"),
      quantidadeUsos: 100,
      usosRestantes: 87,
      criadoEm: new Date("2025-01-10"),
      status: "ativo"
    },
    {
      id: "2",
      codigo: "WELCOME25",
      valor: 25,
      tipoValidade: "ilimitado",
      quantidadeUsos: 1000,
      usosRestantes: 0,
      criadoEm: new Date("2025-01-08"),
      status: "esgotado"
    }
  ]);

  // Form states
  const [codigoGerado, setCodigoGerado] = useState("");
  const [valor, setValor] = useState("");
  const [tipoValidade, setTipoValidade] = useState<"ilimitado" | "data">("ilimitado");
  const [dataExpiracao, setDataExpiracao] = useState<Date>();
  const [quantidadeUsos, setQuantidadeUsos] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const gerarCodigoAleatorio = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let codigo = "";
    for (let i = 0; i < 8; i++) {
      codigo += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return codigo;
  };

  const handleGerarCodigo = async () => {
    if (!codigoGerado || !valor || !quantidadeUsos) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    if (tipoValidade === "data" && !dataExpiracao) {
      toast({
        title: "Erro",
        description: "Selecione a data de expiração",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    // Simular delay de geração
    await new Promise(resolve => setTimeout(resolve, 1000));

    const novoCodigo: Codigo = {
      id: Date.now().toString(),
      codigo: codigoGerado,
      valor: parseFloat(valor),
      tipoValidade,
      dataExpiracao: tipoValidade === "data" ? dataExpiracao : undefined,
      quantidadeUsos: parseInt(quantidadeUsos),
      usosRestantes: parseInt(quantidadeUsos),
      criadoEm: new Date(),
      status: "ativo"
    };

    setCodigos(prev => [novoCodigo, ...prev]);
    
    // Limpar form
    setCodigoGerado("");
    setValor("");
    setQuantidadeUsos("");
    setDataExpiracao(undefined);
    setTipoValidade("ilimitado");
    
    setIsGenerating(false);
    
    toast({
      title: "Sucesso",
      description: `Código ${codigoGerado} gerado com sucesso!`
    });
  };

  const copiarCodigo = (codigo: string) => {
    navigator.clipboard.writeText(codigo);
    toast({
      title: "Copiado!",
      description: `Código ${codigo} copiado para a área de transferência`
    });
  };

  const excluirCodigo = (id: string) => {
    setCodigos(prev => prev.filter(c => c.id !== id));
    toast({
      title: "Código excluído",
      description: "Código removido com sucesso"
    });
  };

  const getStatusBadge = (codigo: Codigo) => {
    if (codigo.usosRestantes === 0) {
      return <Badge variant="secondary">Esgotado</Badge>;
    }
    if (codigo.tipoValidade === "data" && codigo.dataExpiracao && new Date() > codigo.dataExpiracao) {
      return <Badge variant="destructive">Expirado</Badge>;
    }
    return <Badge variant="default" className="bg-success text-white">Ativo</Badge>;
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Tag className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Códigos Promocionais</h1>
            <p className="text-foreground-secondary">Gere e gerencie códigos de desconto</p>
          </div>
        </div>

        {/* Form para gerar código */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            Gerar Novo Código
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="codigo">Código</Label>
              <div className="flex gap-2">
                <Input
                  id="codigo"
                  type="text"
                  placeholder="Código gerado"
                  value={codigoGerado}
                  onChange={(e) => setCodigoGerado(e.target.value)}
                  className="font-mono"
                />
                <Button
                  variant="outline"
                  onClick={() => setCodigoGerado(gerarCodigoAleatorio())}
                  className="shrink-0"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => copiarCodigo(codigoGerado)}
                  disabled={!codigoGerado}
                  className="shrink-0"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="valor">Valor (R$)</Label>
              <Input
                id="valor"
                type="number"
                placeholder="Ex: 50.00"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                step="0.01"
                min="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantidade">Quantidade de Usos</Label>
              <Input
                id="quantidade"
                type="number"
                placeholder="Ex: 100"
                value={quantidadeUsos}
                onChange={(e) => setQuantidadeUsos(e.target.value)}
                min="1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="validade">Tipo de Validade</Label>
              <Select value={tipoValidade} onValueChange={(value: "ilimitado" | "data") => setTipoValidade(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ilimitado">Ilimitado</SelectItem>
                  <SelectItem value="data">Data específica</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {tipoValidade === "data" && (
              <div className="space-y-2">
                <Label>Data de Expiração</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dataExpiracao && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dataExpiracao ? format(dataExpiracao, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dataExpiracao}
                      onSelect={setDataExpiracao}
                      initialFocus
                      className="p-3 pointer-events-auto"
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>

          <Button 
            onClick={handleGerarCodigo} 
            disabled={isGenerating}
            className="bg-gradient-primary hover:opacity-90"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Gerando...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Gerar Código
              </>
            )}
          </Button>
        </Card>

        {/* Lista de códigos */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Códigos Criados</h2>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Validade</TableHead>
                  <TableHead>Usos</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {codigos.map((codigo) => (
                  <TableRow key={codigo.id}>
                    <TableCell className="font-mono font-bold">
                      {codigo.codigo}
                    </TableCell>
                    <TableCell>
                      R$ {codigo.valor.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {codigo.tipoValidade === "ilimitado" 
                        ? "Ilimitado" 
                        : format(codigo.dataExpiracao!, "dd/MM/yyyy", { locale: ptBR })
                      }
                    </TableCell>
                    <TableCell>
                      {codigo.usosRestantes} / {codigo.quantidadeUsos}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(codigo)}
                    </TableCell>
                    <TableCell>
                      {format(codigo.criadoEm, "dd/MM/yyyy", { locale: ptBR })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copiarCodigo(codigo.codigo)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => excluirCodigo(codigo.id)}
                          className="text-danger hover:text-danger"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </Layout>
  );
}