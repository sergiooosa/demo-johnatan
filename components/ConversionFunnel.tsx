import React from 'react';

interface ConversionFunnelProps {
  leadsGenerados: number;
  leadsCalificados: number;
  citasConcretadas: number;
  ventasRealizadas: number;
}

export default function ConversionFunnel({ 
  leadsGenerados, 
  leadsCalificados, 
  citasConcretadas, 
  ventasRealizadas 
}: ConversionFunnelProps) {
  
  // Calcular porcentajes
  const porcentajeCalificados = ((leadsCalificados / leadsGenerados) * 100).toFixed(1);
  const porcentajeCitas = ((citasConcretadas / leadsCalificados) * 100).toFixed(1);
  const porcentajeVentas = ((ventasRealizadas / citasConcretadas) * 100).toFixed(1);
  const porcentajeVentasTotal = ((ventasRealizadas / leadsGenerados) * 100).toFixed(1);

  // Datos para el embudo
  const funnelData = [
    {
      stage: 'Leads Generados',
      count: leadsGenerados,
      percentage: '100%',
      color: 'from-blue-900 to-blue-800',
      icon: '📊',
      width: '100%'
    },
    {
      stage: 'Leads Calificados',
      count: leadsCalificados,
      percentage: `${porcentajeCalificados}%`,
      color: 'from-indigo-900 to-indigo-800',
      icon: '✅',
      width: `${porcentajeCalificados}%`
    },
    {
      stage: 'Citas Concretadas',
      count: citasConcretadas,
      percentage: `${porcentajeCitas}%`,
      color: 'from-slate-900 to-slate-800',
      icon: '📅',
      width: `${(citasConcretadas / leadsGenerados) * 100}%`
    },
    {
      stage: 'Ventas Realizadas',
      count: ventasRealizadas,
      percentage: `${porcentajeVentas}%`,
      color: 'from-cyan-900 to-cyan-800',
      icon: '💰',
      width: `${porcentajeVentasTotal}%`
    }
  ];

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">
          🎯 Embudo de Conversión
        </h3>
        <p className="text-white/70">
          Proceso completo desde leads hasta ventas
        </p>
      </div>

      {/* Embudo Visual */}
      <div className="space-y-4 mb-8">
        {funnelData.map((stage, index) => (
          <div key={index} className="relative">
            {/* Etapa del embudo */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{stage.icon}</div>
                <div>
                  <div className="text-white font-semibold text-lg">
                    {stage.stage}
                  </div>
                  <div className="text-white/70 text-sm">
                    {stage.count.toLocaleString()} leads
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  {stage.percentage}
                </div>
                <div className="text-white/70 text-sm">
                  {index === 0 ? 'Base' : `vs ${funnelData[index - 1].stage}`}
                </div>
              </div>
            </div>

            {/* Barra de progreso visual */}
            <div className="mt-3 relative">
              <div className="w-full h-8 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${stage.color} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
                  style={{ width: stage.width }}
                >
                  {/* Efecto de brillo animado */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                </div>
              </div>
              
              {/* Flecha hacia abajo (excepto en la última etapa) */}
              {index < funnelData.length - 1 && (
                <div className="flex justify-center mt-2">
                  <div className="text-white/50 text-2xl animate-bounce">
                    ↓
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Métricas de Resumen */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/20">
        <div className="text-center">
          <div className="text-xl font-bold text-blue-300 mb-1">
            {porcentajeCalificados}%
          </div>
          <div className="text-white/70 text-sm">Tasa Calificación</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-indigo-300 mb-1">
            {porcentajeCitas}%
          </div>
          <div className="text-white/70 text-sm">Tasa Citas</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-cyan-300 mb-1">
            {porcentajeVentas}%
          </div>
          <div className="text-white/70 text-sm">Tasa Cierre</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-slate-300 mb-1">
            {porcentajeVentasTotal}%
          </div>
          <div className="text-white/70 text-sm">Conversión Total</div>
        </div>
      </div>

      {/* Análisis de Pérdidas */}
      <div className="mt-6 p-4 bg-white/5 rounded-2xl">
        <h4 className="text-white font-semibold mb-3">📉 Análisis de Pérdidas</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-white/80">
            <span>Leads no calificados:</span>
            <span className="text-blue-300 font-semibold">
              {leadsGenerados - leadsCalificados} ({(100 - parseFloat(porcentajeCalificados)).toFixed(1)}%)
            </span>
          </div>
          <div className="flex justify-between text-white/80">
            <span>Calificados sin cita:</span>
            <span className="text-indigo-300 font-semibold">
              {leadsCalificados - citasConcretadas} ({(100 - parseFloat(porcentajeCitas)).toFixed(1)}%)
            </span>
          </div>
          <div className="flex justify-between text-white/80">
            <span>Citas sin venta:</span>
            <span className="text-cyan-300 font-semibold">
              {citasConcretadas - ventasRealizadas} ({(100 - parseFloat(porcentajeVentas)).toFixed(1)}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}