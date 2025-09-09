export interface DashboardMetrics {
  inversionAnuncios: number;
  impresiones: number;
  ctr: number;
  leadsGenerados: number;
  leadsCalificados: number;
  reunionesConcretadas: number;
  clientesMitigados: number;
  costoPorCliente: number;
  facturacion: number;
  roas: number;
  variaciones: {
    inversionAnuncios: string;
    impresiones: string;
    ctr: string;
    leadsGenerados: string;
    leadsCalificados: string;
    reunionesConcretadas: string;
    clientesMitigados: string;
    costoPorCliente: string;
    facturacion: string;
    roas: string;
  };
}