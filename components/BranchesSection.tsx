import React from 'react';
import { Sucursal } from '../types/branches';
import BranchCard from './BranchCard';

interface BranchesSectionProps {
  sucursales: Sucursal[];
}

export default function BranchesSection({ sucursales }: BranchesSectionProps) {
  // Calcular totales
  const totalInversion = sucursales.reduce((sum, sucursal) => sum + sucursal.inversionPublicidad, 0);
  const totalLeads = sucursales.reduce((sum, sucursal) => sum + sucursal.leadsDistribuidos, 0);
  const totalCitas = sucursales.reduce((sum, sucursal) => sum + sucursal.citasConcretadas, 0);
  const totalVentas = sucursales.reduce((sum, sucursal) => sum + sucursal.clientesMitigados, 0);
  const totalVendedores = sucursales.reduce((sum, sucursal) => sum + sucursal.vendedores.length, 0);

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

  // Calcular conversión total
  const conversionTotal = ((totalVentas / totalLeads) * 100).toFixed(1);

  return (
    <div className="space-y-8">
      {/* Header con resumen general */}
      <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">
            🏢 Análisis por Sucursales
          </h2>
          <p className="text-white/70">
            Distribución de inversión, leads y rendimiento por oficina
          </p>
        </div>

        {/* Resumen general */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-300 mb-1">
              {formatCurrency(totalInversion)}
            </div>
            <div className="text-white/70 text-sm">Inversión Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-300 mb-1">
              {totalLeads.toLocaleString()}
            </div>
            <div className="text-white/70 text-sm">Leads Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-300 mb-1">
              {totalCitas.toLocaleString()}
            </div>
            <div className="text-white/70 text-sm">Citas Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-300 mb-1">
              {totalVentas.toLocaleString()}
            </div>
            <div className="text-white/70 text-sm">Ventas Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-200 mb-1">
              {totalVendedores}
            </div>
            <div className="text-white/70 text-sm">Vendedores</div>
          </div>
        </div>

        {/* Métricas de eficiencia */}
        <div className="mt-6 pt-6 border-t border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-xl font-bold text-blue-300 mb-1">
                {formatPercentage(parseFloat(conversionTotal))}
              </div>
              <div className="text-white/70 text-sm">Conversión Total</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-indigo-300 mb-1">
                {formatCurrency(totalInversion / totalLeads)}
              </div>
              <div className="text-white/70 text-sm">Costo Promedio por Lead</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-cyan-300 mb-1">
                {formatCurrency(totalInversion / totalVentas)}
              </div>
              <div className="text-white/70 text-sm">Costo por Venta</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tarjetas de sucursales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sucursales.map((sucursal) => (
          <BranchCard
            key={sucursal.id}
            sucursal={sucursal}
            totalInversion={totalInversion}
            totalLeads={totalLeads}
          />
        ))}
      </div>

      {/* Ranking de sucursales */}
      <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          🏆 Ranking de Sucursales
        </h3>
        
        <div className="space-y-4">
          {sucursales
            .sort((a, b) => b.clientesMitigados - a.clientesMitigados)
            .map((sucursal, index) => {
              const conversion = ((sucursal.clientesMitigados / sucursal.leadsDistribuidos) * 100).toFixed(1);
              const mejorVendedor = sucursal.vendedores.reduce((prev, current) => 
                (prev.ventasRealizadas > current.ventasRealizadas) ? prev : current
              );
              
              return (
                <div key={sucursal.id} className="flex items-center justify-between bg-white/5 rounded-xl p-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅'}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-lg">{sucursal.nombre}</div>
                      <div className="text-white/70 text-sm">
                        {sucursal.vendedores.length} vendedores • Mejor: {mejorVendedor.nombre}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold text-lg">{sucursal.clientesMitigados} ventas</div>
                    <div className="text-white/70 text-sm">{conversion}% conversión</div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}