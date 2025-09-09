import React from 'react';
import { AdMetrics } from '../types/ads';

interface AdsTableProps {
  ads: AdMetrics[];
}

export default function AdsTable({ ads }: AdsTableProps) {
  // Ordenar campañas por costo por cliente calificado (más eficiente primero)
  const sortedAds = [...ads].sort((a, b) => a.costoPorClienteCalificado - b.costoPorClienteCalificado);
  
  // Mostrar solo los primeros 25 anuncios más eficientes
  const top25Ads = sortedAds.slice(0, 25);

  // Función para formatear moneda
  const formatCurrency = (num: number): string => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  // Función para formatear números
  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  // Función para obtener el color del ROAS
  const getROASColor = (roas: number): string => {
    if (roas >= 4) return 'text-blue-300 bg-blue-900/30';
    if (roas >= 3) return 'text-indigo-300 bg-indigo-900/30';
    if (roas >= 2) return 'text-cyan-300 bg-cyan-900/30';
    return 'text-slate-300 bg-slate-900/30';
  };

  // Función para obtener el color del ranking de eficiencia
  const getEfficiencyColor = (index: number): string => {
    if (index < 5) return 'text-green-300 bg-green-900/30'; // Top 5 - Excelente
    if (index < 10) return 'text-blue-300 bg-blue-900/30'; // Top 10 - Muy bueno
    if (index < 15) return 'text-yellow-300 bg-yellow-900/30'; // Top 15 - Bueno
    if (index < 20) return 'text-orange-300 bg-orange-900/30'; // Top 20 - Regular
    return 'text-red-300 bg-red-900/30'; // Resto - Necesita mejora
  };

  // Función para obtener el icono del ranking
  const getRankingIcon = (index: number): string => {
    if (index < 3) return '🥇'; // Top 3
    if (index < 5) return '🥈'; // Top 5
    if (index < 10) return '⭐'; // Top 10
    if (index < 15) return '✅'; // Top 15
    if (index < 20) return '⚠️'; // Top 20
    return '❌'; // Resto
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 overflow-hidden">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">
          📊 Top 25 Campañas Más Eficientes
        </h3>
        <p className="text-white/70">
          Las 25 campañas con mejor rendimiento organizadas por eficiencia de costo (menor costo por cliente)
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-green-900/30 text-green-300 rounded-full text-xs">🥇 Top 5: Excelente</span>
          <span className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-xs">⭐ Top 10: Muy Bueno</span>
          <span className="px-3 py-1 bg-yellow-900/30 text-yellow-300 rounded-full text-xs">✅ Top 15: Bueno</span>
          <span className="px-3 py-1 bg-orange-900/30 text-orange-300 rounded-full text-xs">⚠️ Top 20: Regular</span>
          <span className="px-3 py-1 bg-slate-900/30 text-slate-300 rounded-full text-xs">📊 Top 25: Analizar</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-center py-4 px-2 text-white/90 font-semibold text-sm">
                Ranking
              </th>
              <th className="text-left py-4 px-2 text-white/90 font-semibold text-sm">
                Nombre del Anuncio
              </th>
              <th className="text-right py-4 px-2 text-white/90 font-semibold text-sm">
                Gasto
              </th>
              <th className="text-right py-4 px-2 text-white/90 font-semibold text-sm">
                Leads
              </th>
              <th className="text-right py-4 px-2 text-white/90 font-semibold text-sm">
                Citas
              </th>
              <th className="text-right py-4 px-2 text-white/90 font-semibold text-sm">
                Clientes
              </th>
              <th className="text-right py-4 px-2 text-white/90 font-semibold text-sm">
                Facturación
              </th>
              <th className="text-right py-4 px-2 text-white/90 font-semibold text-sm">
                Costo/Cita
              </th>
              <th className="text-right py-4 px-2 text-white/90 font-semibold text-sm">
                Costo/Cliente
              </th>
              <th className="text-right py-4 px-2 text-white/90 font-semibold text-sm">
                ROAS
              </th>
            </tr>
          </thead>
          <tbody>
            {top25Ads.map((ad, index) => (
              <tr 
                key={ad.id} 
                className={`border-b border-white/10 hover:bg-white/5 transition-colors duration-200 ${
                  index % 2 === 0 ? 'bg-white/5' : 'bg-transparent'
                }`}
              >
                <td className="py-4 px-2 text-center">
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${getEfficiencyColor(index)}`}>
                    {getRankingIcon(index)} #{index + 1}
                  </div>
                </td>
                <td className="py-4 px-2">
                  <div className="text-white font-medium text-sm">
                    {ad.nombreAnuncio}
                  </div>
                </td>
                <td className="py-4 px-2 text-right">
                  <div className="text-blue-300 font-semibold">
                    {formatCurrency(ad.gasto)}
                  </div>
                </td>
                <td className="py-4 px-2 text-right">
                  <div className="text-indigo-300 font-semibold">
                    {formatNumber(ad.leadsGenerados)}
                  </div>
                </td>
                <td className="py-4 px-2 text-right">
                  <div className="text-cyan-300 font-semibold">
                    {formatNumber(ad.citasConcretadas)}
                  </div>
                </td>
                <td className="py-4 px-2 text-right">
                  <div className="text-slate-300 font-semibold">
                    {formatNumber(ad.clientesMitigados)}
                  </div>
                </td>
                <td className="py-4 px-2 text-right">
                  <div className="text-blue-200 font-semibold">
                    {formatCurrency(ad.facturacion)}
                  </div>
                </td>
                <td className="py-4 px-2 text-right">
                  <div className="text-indigo-200 font-semibold">
                    {formatCurrency(ad.costoPorCita)}
                  </div>
                </td>
                <td className="py-4 px-2 text-right">
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${getEfficiencyColor(index)}`}>
                    {formatCurrency(ad.costoPorClienteCalificado)}
                  </div>
                </td>
                <td className="py-4 px-2 text-right">
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${getROASColor(ad.roas)}`}>
                    {ad.roas.toFixed(2)}x
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Resumen de Totales */}
      <div className="mt-8 pt-6 border-t border-white/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-300 mb-1">
              {formatCurrency(top25Ads.reduce((sum, ad) => sum + ad.gasto, 0))}
            </div>
            <div className="text-white/70 text-sm">Gasto Total Top 25</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-300 mb-1">
              {formatCurrency(top25Ads.reduce((sum, ad) => sum + ad.facturacion, 0))}
            </div>
            <div className="text-white/70 text-sm">Facturación Total Top 25</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-300 mb-1">
              {formatNumber(top25Ads.reduce((sum, ad) => sum + ad.clientesMitigados, 0))}
            </div>
            <div className="text-white/70 text-sm">Clientes Total Top 25</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-300 mb-1">
              {(top25Ads.reduce((sum, ad) => sum + ad.facturacion, 0) / top25Ads.reduce((sum, ad) => sum + ad.gasto, 0)).toFixed(2)}x
            </div>
            <div className="text-white/70 text-sm">ROAS Promedio Top 25</div>
          </div>
        </div>
        
        {/* Análisis de Eficiencia */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-900/20 rounded-xl border border-green-500/30">
            <div className="text-lg font-bold text-green-300 mb-1">
              {formatCurrency(top25Ads.slice(0, 5).reduce((sum, ad) => sum + ad.costoPorClienteCalificado, 0) / 5)}
            </div>
            <div className="text-green-200 text-sm">Costo Promedio Top 5</div>
          </div>
          <div className="text-center p-4 bg-yellow-900/20 rounded-xl border border-yellow-500/30">
            <div className="text-lg font-bold text-yellow-300 mb-1">
              {formatCurrency(top25Ads.slice(10, 15).reduce((sum, ad) => sum + ad.costoPorClienteCalificado, 0) / 5)}
            </div>
            <div className="text-yellow-200 text-sm">Costo Promedio Posición 11-15</div>
          </div>
          <div className="text-center p-4 bg-slate-900/20 rounded-xl border border-slate-500/30">
            <div className="text-lg font-bold text-slate-300 mb-1">
              {formatCurrency(top25Ads.slice(20, 25).reduce((sum, ad) => sum + ad.costoPorClienteCalificado, 0) / 5)}
            </div>
            <div className="text-slate-200 text-sm">Costo Promedio Posición 21-25</div>
          </div>
        </div>
      </div>
    </div>
  );
}