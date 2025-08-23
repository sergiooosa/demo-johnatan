import { Method } from '../types';
import { money0, safeDiv, x } from '../utils/helpers';
import { METHOD_COLOR, A10 } from '../lib/colors';
import { exportToXlsx, generateFilename } from '../lib/export';

interface TableMethodsProps {
  methods: Method[];
}

export default function TableMethods({ methods }: TableMethodsProps) {
  const handleExportMethods = () => {
    const data = methods.map(method => ({
      Medio: method.method,
      Spend: method.spend,
      Agendas: method.agendasQ,
      Shows: method.showsQ,
      Ventas: method.sales,
      Cash: method.cash,
      ROAS: method.spend > 0 ? safeDiv(method.cash, method.spend).toFixed(2) : '—',
      Mensajes: method.messages || '—',
      Videos: method.videos || '—'
    }));

    const filename = generateFilename('metodos_marketing');
    exportToXlsx(filename, data, 'Métodos de Marketing');
  };

  return (
    <div 
      className="glass glow rounded-xl p-6 shadow-lg overflow-x-auto transition-all duration-300"
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
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-tx1">Resumen por Medio</h3>
        <button
          onClick={handleExportMethods}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-white/8 hover:bg-white/12 border border-white/15 text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Exportar métodos (XLSX)
        </button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-2 text-tx2">Medio</th>
            <th className="text-right py-3 px-2 text-tx2">Spend</th>
            <th className="text-right py-3 px-2 text-tx2">Agendas</th>
            <th className="text-right py-3 px-2 text-tx2">Shows</th>
            <th className="text-right py-3 px-2 text-tx2">Ventas</th>
            <th className="text-right py-3 px-2 text-tx2">Cash</th>
            <th className="text-right py-3 px-2 text-tx2">ROAS</th>
            <th className="text-right py-3 px-2 text-tx2">Indicador</th>
          </tr>
        </thead>
        <tbody>
          {methods.map((method) => {
            const ring = METHOD_COLOR[method.method] ? { boxShadow: `0 0 0 1px ${A10(METHOD_COLOR[method.method])}` } : undefined;
            return (
              <tr 
                key={method.method} 
                style={ring}
                className="border-t border-white/10 hover:bg-white/6 hover:ring-1 hover:ring-white/15 transition-colors"
              >
                <td className="py-3 px-2 font-medium">{method.method}</td>
              <td className="py-3 px-2 text-right">{money0(method.spend)}</td>
              <td className="py-3 px-2 text-right">{method.agendasQ}</td>
              <td className="py-3 px-2 text-right">{method.showsQ}</td>
              <td className="py-3 px-2 text-right font-semibold">{method.sales}</td>
              <td className="py-3 px-2 text-right">{money0(method.cash)}</td>
              <td className="py-3 px-2 text-right">
                {method.spend > 0 ? x(safeDiv(method.cash, method.spend)) : '—'}
              </td>
              <td className="py-3 px-2 text-right text-tx2">
                {method.method === 'Prospección' && method.messages ? `${method.messages} Mensajes` : 
                 method.method === 'Orgánico' && method.videos ? `${method.videos} Videos` : '—'}
              </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
} 