import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, 
  Plus, 
  Settings, 
  Trash2, 
  Edit, 
  Key,
  Globe,
  Coins,
  Shield,
  Check,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Gateway {
  id: string;
  name: string;
  type: 'pixup' | 'cripto';
  active: boolean;
  credentials: {
    clientId?: string;
    clientSecret?: string;
    apiKey?: string;
    webhookUrl?: string;
    walletAddress?: string;
  };
  createdAt: string;
}

export default function ConfigPagamento() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGateway, setEditingGateway] = useState<Gateway | null>(null);
  
  const [formData, setFormData] = useState({
    type: '' as 'pixup' | 'cripto' | '',
    clientId: '',
    clientSecret: '',
    apiKey: '',
    webhookUrl: '',
    walletAddress: '',
    active: true
  });

  // Mock data - futuramente virá do backend
  const [gateways, setGateways] = useState<Gateway[]>([
    {
      id: '1',
      name: 'PIXup Gateway Principal',
      type: 'pixup',
      active: true,
      credentials: {
        clientId: 'pix_***************',
        clientSecret: '***************',
        webhookUrl: 'https://api.exemplo.com/webhook'
      },
      createdAt: '2025-01-10'
    },
    {
      id: '2', 
      name: 'Bitcoin Wallet',
      type: 'cripto',
      active: false,
      credentials: {
        walletAddress: 'bc1***************',
        apiKey: '***************'
      },
      createdAt: '2025-01-08'
    }
  ]);

  const resetForm = () => {
    setFormData({
      type: '',
      clientId: '',
      clientSecret: '',
      apiKey: '',
      webhookUrl: '',
      walletAddress: '',
      active: true
    });
    setEditingGateway(null);
  };

  const openAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (gateway: Gateway) => {
    setEditingGateway(gateway);
    setFormData({
      type: gateway.type,
      clientId: gateway.credentials.clientId || '',
      clientSecret: gateway.credentials.clientSecret || '',
      apiKey: gateway.credentials.apiKey || '',
      webhookUrl: gateway.credentials.webhookUrl || '',
      walletAddress: gateway.credentials.walletAddress || '',
      active: gateway.active
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.type) {
      toast({
        title: "Erro",
        description: "Selecione o tipo de gateway",
        variant: "destructive"
      });
      return;
    }

    // Validações específicas por tipo
    if (formData.type === 'pixup') {
      if (!formData.clientId || !formData.clientSecret) {
        toast({
          title: "Erro", 
          description: "Client ID e Client Secret são obrigatórios para PIXup",
          variant: "destructive"
        });
        return;
      }
    } else if (formData.type === 'cripto') {
      if (!formData.walletAddress || !formData.apiKey) {
        toast({
          title: "Erro",
          description: "Wallet Address e API Key são obrigatórios para Cripto",
          variant: "destructive"
        });
        return;
      }
    }

    const gatewayData: Gateway = {
      id: editingGateway?.id || Date.now().toString(),
      name: `${formData.type === 'pixup' ? 'PIXup' : 'Cripto'} Gateway ${gateways.length + 1}`,
      type: formData.type,
      active: formData.active,
      credentials: {
        ...(formData.type === 'pixup' && {
          clientId: formData.clientId,
          clientSecret: formData.clientSecret,
          webhookUrl: formData.webhookUrl
        }),
        ...(formData.type === 'cripto' && {
          walletAddress: formData.walletAddress,
          apiKey: formData.apiKey
        })
      },
      createdAt: editingGateway?.createdAt || new Date().toISOString().split('T')[0]
    };

    if (editingGateway) {
      setGateways(prev => prev.map(g => g.id === editingGateway.id ? gatewayData : g));
      toast({
        title: "Sucesso",
        description: "Gateway atualizado com sucesso!"
      });
    } else {
      setGateways(prev => [...prev, gatewayData]);
      toast({
        title: "Sucesso", 
        description: "Gateway adicionado com sucesso!"
      });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    setGateways(prev => prev.filter(g => g.id !== id));
    toast({
      title: "Gateway removido",
      description: "Gateway foi removido com sucesso"
    });
  };

  const toggleGatewayStatus = (id: string) => {
    setGateways(prev => prev.map(g => 
      g.id === id ? { ...g, active: !g.active } : g
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <CreditCard className="h-7 w-7 text-primary" />
            Configuração de Pagamentos
          </h1>
          <p className="text-foreground-secondary mt-1">
            Gerencie os gateways de pagamento da plataforma
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={openAddDialog}
              className="bg-gradient-primary hover:opacity-90 text-white shadow-finver hover:shadow-finver-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Gateway
            </Button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                {editingGateway ? 'Editar Gateway' : 'Novo Gateway de Pagamento'}
              </DialogTitle>
              <DialogDescription>
                Configure as credenciais do gateway de pagamento
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              {/* Tipo de Gateway */}
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Gateway</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value: 'pixup' | 'cripto') => 
                    setFormData(prev => ({ ...prev, type: value }))
                  }
                  disabled={!!editingGateway}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pixup">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        PIXup
                      </div>
                    </SelectItem>
                    <SelectItem value="cripto">
                      <div className="flex items-center gap-2">
                        <Coins className="h-4 w-4" />
                        Criptomoeda
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Campos PIXup */}
              {formData.type === 'pixup' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="clientId">Client ID</Label>
                    <Input
                      id="clientId"
                      type="text"
                      placeholder="Seu Client ID do PIXup"
                      value={formData.clientId}
                      onChange={(e) => setFormData(prev => ({ ...prev, clientId: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="clientSecret">Client Secret</Label>
                    <Input
                      id="clientSecret"
                      type="password"
                      placeholder="Seu Client Secret do PIXup"
                      value={formData.clientSecret}
                      onChange={(e) => setFormData(prev => ({ ...prev, clientSecret: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="webhookUrl">Webhook URL (Opcional)</Label>
                    <Input
                      id="webhookUrl"
                      type="url"
                      placeholder="https://sua-api.com/webhook"
                      value={formData.webhookUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, webhookUrl: e.target.value }))}
                    />
                  </div>
                </>
              )}

              {/* Campos Cripto */}
              {formData.type === 'cripto' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="walletAddress">Wallet Address</Label>
                    <Input
                      id="walletAddress"
                      type="text"
                      placeholder="Endereço da carteira de criptomoeda"
                      value={formData.walletAddress}
                      onChange={(e) => setFormData(prev => ({ ...prev, walletAddress: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">API Key</Label>
                    <Input
                      id="apiKey"
                      type="password"
                      placeholder="Sua API Key"
                      value={formData.apiKey}
                      onChange={(e) => setFormData(prev => ({ ...prev, apiKey: e.target.value }))}
                    />
                  </div>
                </>
              )}

              {/* Status */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Gateway Ativo</Label>
                  <p className="text-sm text-foreground-secondary">
                    Habilitar gateway para receber pagamentos
                  </p>
                </div>
                <Switch 
                  checked={formData.active}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleSave}
                className="bg-gradient-primary hover:opacity-90 text-white"
              >
                {editingGateway ? 'Atualizar' : 'Salvar'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Gateways List */}
      <div className="grid gap-4">
        {gateways.map((gateway) => (
          <Card key={gateway.id} className="shadow-finver hover:shadow-finver-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    gateway.type === 'pixup' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-orange-100 text-orange-600'
                  }`}>
                    {gateway.type === 'pixup' ? (
                      <Globe className="h-5 w-5" />
                    ) : (
                      <Coins className="h-5 w-5" />
                    )}
                  </div>
                  
                  <div>
                    <CardTitle className="text-lg">{gateway.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Badge variant={gateway.type === 'pixup' ? 'default' : 'secondary'}>
                        {gateway.type === 'pixup' ? 'PIXup' : 'Criptomoeda'}
                      </Badge>
                      <Badge variant={gateway.active ? 'default' : 'secondary'}>
                        {gateway.active ? (
                          <><Check className="h-3 w-3 mr-1" />Ativo</>
                        ) : (
                          <><X className="h-3 w-3 mr-1" />Inativo</>
                        )}
                      </Badge>
                    </CardDescription>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={gateway.active}
                    onCheckedChange={() => toggleGatewayStatus(gateway.id)}
                  />
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => openEditDialog(gateway)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDelete(gateway.id)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gateway.type === 'pixup' ? (
                  <>
                    <div className="space-y-1">
                      <Label className="text-sm font-medium flex items-center gap-1">
                        <Key className="h-3 w-3" />
                        Client ID
                      </Label>
                      <p className="text-sm text-foreground-secondary font-mono bg-background-secondary p-2 rounded border">
                        {gateway.credentials.clientId}
                      </p>
                    </div>
                    
                    <div className="space-y-1">
                      <Label className="text-sm font-medium flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        Client Secret
                      </Label>
                      <p className="text-sm text-foreground-secondary font-mono bg-background-secondary p-2 rounded border">
                        {gateway.credentials.clientSecret}
                      </p>
                    </div>
                    
                    {gateway.credentials.webhookUrl && (
                      <div className="space-y-1 md:col-span-2">
                        <Label className="text-sm font-medium flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          Webhook URL
                        </Label>
                        <p className="text-sm text-foreground-secondary font-mono bg-background-secondary p-2 rounded border">
                          {gateway.credentials.webhookUrl}
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="space-y-1">
                      <Label className="text-sm font-medium flex items-center gap-1">
                        <Coins className="h-3 w-3" />
                        Wallet Address
                      </Label>
                      <p className="text-sm text-foreground-secondary font-mono bg-background-secondary p-2 rounded border">
                        {gateway.credentials.walletAddress}
                      </p>
                    </div>
                    
                    <div className="space-y-1">
                      <Label className="text-sm font-medium flex items-center gap-1">
                        <Key className="h-3 w-3" />
                        API Key
                      </Label>
                      <p className="text-sm text-foreground-secondary font-mono bg-background-secondary p-2 rounded border">
                        {gateway.credentials.apiKey}
                      </p>
                    </div>
                  </>
                )}
                
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Data de Criação</Label>
                  <p className="text-sm text-foreground-secondary">
                    {new Date(gateway.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {gateways.length === 0 && (
          <Card className="text-center p-8 border-dashed">
            <CreditCard className="h-12 w-12 mx-auto text-foreground-secondary mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Nenhum gateway configurado
            </h3>
            <p className="text-foreground-secondary mb-4">
              Adicione seu primeiro gateway de pagamento para começar a receber pagamentos
            </p>
            <Button 
              onClick={openAddDialog}
              className="bg-gradient-primary hover:opacity-90 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Primeiro Gateway
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}