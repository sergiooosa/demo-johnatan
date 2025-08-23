import { useState } from 'react';
import { Method } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { safeDiv, x } from '../utils/helpers';
import { METHOD_COLOR, TX1, TX2 } from '../lib/colors';

interface ROASChartProps {
  methods: Method[];
}

export default function ROASChart({ methods }: ROASChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Filter only paid methods and calculate ROAS
  const paidMethods = methods
    .filter(method => method.spend > 0)
    .map(method => ({
      name: method.method,
      method: method.method,
      ROAS: safeDiv(method.cash, method.spend),
    }));

  return (
    <div 
      className="glass glow rounded-xl p-6 shadow-lg transition-all duration-300"
      style={{
        border: '2px solid #3B82F699', // azul suave uniforme
        boxShadow: '0 0 12px #3B82F640',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = '2px solid #3B82F6E6';
        e.currentTarget.style.boxShadow = '0 0 18px #3B82F680';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = '2px solid #3B82F699';
        e.currentTarget.style.boxShadow = '0 0 12px #3B82F640';
      }}
    >
      <h3 className="text-lg font-semibold text-tx1 mb-4">ROAS por Medio</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={paidMethods}>
          <CartesianGrid stroke="rgba(255,255,255,.14)" strokeDasharray="4 6" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: "rgba(230,236,255,.9)" }}
            fontSize={12}
          />
          <YAxis 
            tick={{ fill: "rgba(230,236,255,.75)" }}
            fontSize={12}
            tickFormatter={(value) => `${value.toFixed(1)}x`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(0,0,0,0.8)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: 'white'
            }}
            formatter={(value: number) => [x(value), 'ROAS']}
          />
          <Bar 
            dataKey="ROAS" 
            radius={[10, 10, 0, 0]}
            onMouseMove={(_, i) => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {paidMethods.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={METHOD_COLOR[entry.method]}
                style={{ 
                  filter: activeIndex === index 
                    ? "brightness(1.15) drop-shadow(0 6px 18px rgba(255,255,255,.22))" 
                    : "none" 
                }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 