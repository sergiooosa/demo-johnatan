export interface Vendedor {
  id: number;
  nombre: string;
  leadsAsignados: number;
  citasRealizadas: number;
  clientesMitigados: number;
  ventasRealizadas: number;
  tasaConversion: number;
}

export interface Sucursal {
  id: number;
  nombre: string;
  inversionPublicidad: number;
  leadsDistribuidos: number;
  leadsCalificados: number;
  citasConcretadas: number;
  clientesMitigados: number;
  costosOficina: number;
  vendedores: Vendedor[];
}