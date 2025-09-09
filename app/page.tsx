'use client';

import { useState, useEffect } from 'react';
import dashboardData from '../data/dashboard-metrics.json';
import adsData from '../data/ads-metrics.json';
import branchesData from '../data/branches.json';
import { DashboardMetrics } from '../types/dashboard';
import { AdMetrics } from '../types/ads';
import { Sucursal } from '../types/branches';
import Header from '../components/Header';
import MetricCard from '../components/MetricCard';
import AdsTable from '../components/AdsTable';
import ConversionFunnel from '../components/ConversionFunnel';
import BranchesSection from '../components/BranchesSection';

export default function Dashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics>(dashboardData);
  const [ads, setAds] = useState<AdMetrics[]>(adsData);
  const [sucursales, setSucursales] = useState<Sucursal[]>(branchesData);

  // Función para formatear números
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-slate-900">
      {/* Header con saludo personalizado */}
      <Header />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Sección de Métricas Principales */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Métricas Principales
            </h2>
            <p className="text-white/70">
              Análisis integral de tu campaña de marketing digital
            </p>
          </div>
          
          {/* Grid de Métricas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {/* Inversión en Anuncios */}
            <MetricCard
              title="Inversión en Anuncios"
              value={formatCurrency(metrics.inversionAnuncios)}
              variation={metrics.variaciones.inversionAnuncios}
              icon="💰"
              color="blue"
            />
            
            {/* Impresiones */}
            <MetricCard
              title="Impresiones"
              value={formatNumber(metrics.impresiones)}
              variation={metrics.variaciones.impresiones}
              icon="👁️"
              color="cyan"
            />
            
            {/* CTR */}
            <MetricCard
              title="CTR"
              value={formatPercentage(metrics.ctr)}
              variation={metrics.variaciones.ctr}
              icon="🎯"
              color="green"
            />
            
            {/* Leads Generados */}
            <MetricCard
              title="Leads Generados"
              value={metrics.leadsGenerados.toLocaleString()}
              variation={metrics.variaciones.leadsGenerados}
              icon="📊"
              color="purple"
            />
            
            {/* Leads Calificados */}
            <MetricCard
              title="Leads Calificados"
              value={metrics.leadsCalificados.toLocaleString()}
              variation={metrics.variaciones.leadsCalificados}
              icon="✅"
              color="emerald"
            />
          </div>
          
          {/* Segunda fila de métricas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-6">
            {/* Reuniones Concretadas */}
            <MetricCard
              title="Reuniones Concretadas"
              value={metrics.reunionesConcretadas.toLocaleString()}
              variation={metrics.variaciones.reunionesConcretadas}
              icon="📅"
              color="orange"
            />
            
            {/* Clientes Mitigados */}
            <MetricCard
              title="Clientes Mitigados"
              value={metrics.clientesMitigados.toLocaleString()}
              variation={metrics.variaciones.clientesMitigados}
              icon="🤝"
              color="pink"
            />
            
            {/* Costo por Cliente */}
            <MetricCard
              title="Costo por Cliente"
              value={formatCurrency(metrics.costoPorCliente)}
              variation={metrics.variaciones.costoPorCliente}
              icon="💵"
              color="yellow"
            />
            
            {/* Facturación */}
            <MetricCard
              title="Facturación"
              value={formatCurrency(metrics.facturacion)}
              variation={metrics.variaciones.facturacion}
              icon="📈"
              color="indigo"
            />
            
            {/* ROAS */}
            <MetricCard
              title="ROAS"
              value={metrics.roas.toFixed(2) + 'x'}
              variation={metrics.variaciones.roas}
              icon="🚀"
              color="red"
            />
          </div>
        </section>
        
        {/* Sección de Resumen */}
        <section className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 mb-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Resumen Ejecutivo
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-300 mb-2">
                  {formatPercentage((metrics.clientesMitigados / metrics.leadsGenerados) * 100)}
                </div>
                <div className="text-white/70">Tasa de Conversión</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-300 mb-2">
                  {formatPercentage((metrics.leadsCalificados / metrics.leadsGenerados) * 100)}
                </div>
                <div className="text-white/70">Tasa de Calificación</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-300 mb-2">
                  {formatPercentage((metrics.reunionesConcretadas / metrics.leadsCalificados) * 100)}
                </div>
                <div className="text-white/70">Tasa de Reuniones</div>
              </div>
            </div>
          </div>
        </section>

        {/* Embudo de Conversión */}
        <section className="mb-12">
          <ConversionFunnel 
            leadsGenerados={metrics.leadsGenerados}
            leadsCalificados={metrics.leadsCalificados}
            citasConcretadas={metrics.reunionesConcretadas}
            ventasRealizadas={metrics.clientesMitigados}
          />
        </section>

        {/* Segunda Etapa - Métricas por Anuncio */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              📈 Análisis por Anuncio
            </h2>
            <p className="text-white/70">
              Rendimiento detallado de cada campaña publicitaria
            </p>
          </div>
          
          <AdsTable ads={ads} />
        </section>

        {/* Tercera Etapa - Análisis por Sucursales */}
        <section className="mb-12">
          <BranchesSection sucursales={sucursales} />
        </section>
      </main>
    </div>
  );
}