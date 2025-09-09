import React, { useState } from 'react';
import { Sucursal } from '../types/branches';

interface BranchCardProps {
  sucursal: Sucursal;
  totalInversion: number;
  totalLeads: number;
}

export default function BranchCard({ sucursal, totalInversion, totalLeads }: BranchCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Función para formatear moneda
  const formatCurrency = (num: number): string => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  // Función para formatear porcentaje
  const formatPercentage = (num: number): string => {
    return num.toFixed(1) + '%';
  };

  // Calcular porcentajes de distribución
  const porcentajeInversion = ((sucursal.inversionPublicidad / totalInversion) * 100).toFixed(1);
  const porcentajeLeads = ((sucursal.leadsDistribuidos / totalLeads) * 100).toFixed(1);
  const porcentajeCalificados = ((sucursal.leadsCalificados / sucursal.leadsDistribuidos) * 100).toFixed(1);
  const porcentajeCitas = ((sucursal.citasConcretadas / sucursal.leadsCalificados) * 100).toFixed(1);
  const porcentajeVentas = ((sucursal.clientesMitigados / sucursal.citasConcretadas) * 100).toFixed(1);
  const porcentajeConversionTotal = ((sucursal.clientesMitigados / sucursal.leadsDistribuidos) * 100).toFixed(1);

  // Calcular costo por lead
  const costoPorLead = sucursal.inversionPublicidad / sucursal.leadsDistribuidos;

  // Encontrar mejor vendedor
  const mejorVendedor = sucursal.vendedores.reduce((prev, current) => 
    (prev.ventasRealizadas > current.ventasRealizadas) ? prev : current
  );

  // Colores por sucursal - azules oscuros futuristas
  const branchColors = {
    Miami: 'from-blue-900 to-blue-800',
    Orlando: 'from-indigo-900 to-indigo-800',
    Tampa: 'from-slate-900 to-slate-800',
    Jacksonville: 'from-cyan-900 to-cyan-800',
    Atlanta: 'from-blue-950 to-indigo-900'
  };

  const branchColor = branchColors[sucursal.nombre as keyof typeof branchColors] || 'from-gray-500 to-gray-600';

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${branchColor} p-6 shadow-xl border backdrop-blur-sm hover-lift group`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>
      
      {/* Header */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">
              🏢 {sucursal.nombre}
            </h3>
            <p className="text-white/80 text-sm">
              {sucursal.vendedores.length} vendedores activos
            </p>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-white/70 hover:text-white text-2xl transition-colors duration-200"
          >
            {isExpanded ? '−' : '+'}
          </button>
        </div>

        {/* Métricas principales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-white">
              {formatCurrency(sucursal.inversionPublicidad)}
            </div>
            <div className="text-white/70 text-xs">Inversión</div>
            <div className="text-white/60 text-xs">({porcentajeInversion}%)</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white">
              {sucursal.leadsDistribuidos}
            </div>
            <div className="text-white/70 text-xs">Leads</div>
            <div className="text-white/60 text-xs">({porcentajeLeads}%)</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white">
              {sucursal.citasConcretadas}
            </div>
            <div className="text-white/70 text-xs">Citas</div>
            <div className="text-white/60 text-xs">({porcentajeCitas}%)</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white">
              {sucursal.clientesMitigados}
            </div>
            <div className="text-white/70 text-xs">Ventas</div>
            <div className="text-white/60 text-xs">({porcentajeConversionTotal}%)</div>
          </div>
        </div>

        {/* Mejor vendedor */}
        <div className="bg-white/10 rounded-xl p-3 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white/80 text-sm">🏆 Mejor Vendedor</div>
              <div className="text-white font-semibold">{mejorVendedor.nombre}</div>
            </div>
            <div className="text-right">
              <div className="text-white font-bold">{mejorVendedor.ventasRealizadas} ventas</div>
              <div className="text-white/70 text-sm">{formatPercentage(mejorVendedor.tasaConversion)} conversión</div>
            </div>
          </div>
        </div>

        {/* Expandible Content */}
        {isExpanded && (
          <div className="mt-4 space-y-4 animate-fadeIn">
            {/* Métricas detalladas */}
            <div className="bg-white/10 rounded-xl p-4">
              <h4 className="text-white font-semibold mb-3">📊 Métricas Detalladas</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-white/70">Costo por Lead</div>
                  <div className="text-white font-semibold">{formatCurrency(costoPorLead)}</div>
                </div>
                <div>
                  <div className="text-white/70">Leads Calificados</div>
                  <div className="text-white font-semibold">{sucursal.leadsCalificados} ({porcentajeCalificados}%)</div>
                </div>
                <div>
                  <div className="text-white/70">Costos Oficina</div>
                  <div className="text-white font-semibold">{formatCurrency(sucursal.costosOficina)}</div>
                </div>
              </div>
            </div>

            {/* Vendedores */}
            <div className="bg-white/10 rounded-xl p-4">
              <h4 className="text-white font-semibold mb-3">👥 Vendedores</h4>
              <div className="space-y-3">
                {sucursal.vendedores.map((vendedor) => (
                  <div key={vendedor.id} className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-white font-medium">{vendedor.nombre}</div>
                      <div className="text-white/70 text-sm">{formatPercentage(vendedor.tasaConversion)} conversión</div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-xs">
                      <div className="text-center">
                        <div className="text-blue-300 font-semibold">{vendedor.leadsAsignados}</div>
                        <div className="text-white/60">Leads</div>
                      </div>
                      <div className="text-center">
                        <div className="text-indigo-300 font-semibold">{vendedor.citasRealizadas}</div>
                        <div className="text-white/60">Citas</div>
                      </div>
                      <div className="text-center">
                        <div className="text-cyan-300 font-semibold">{vendedor.clientesMitigados}</div>
                        <div className="text-white/60">Mitigados</div>
                      </div>
                      <div className="text-center">
                        <div className="text-slate-300 font-semibold">{vendedor.ventasRealizadas}</div>
                        <div className="text-white/60">Ventas</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}