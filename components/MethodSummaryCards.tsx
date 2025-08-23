import { Method } from '../types';
import { money0, safeDiv, x } from '../utils/helpers';
import { METHOD_COLOR } from '../lib/colors';

interface MethodSummaryCardsProps {
  methods: Method[];
}

export default function MethodSummaryCards({ methods }: MethodSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
      {methods.map((method) => {
        const methodColor = METHOD_COLOR[method.method];
        const roas = method.spend > 0 ? safeDiv(method.cash, method.spend) : 0;
        
        return (
          <div
            key={method.method}
            className="glass glow rounded-xl p-4 shadow-lg transition-all duration-300 hover:scale-[1.02] relative"
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
            {/* Method name with color indicator */}
            <div className="flex items-center gap-2 mb-3">
              {methodColor && (
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: methodColor }}
                />
              )}
              <h4 className="text-sm font-semibold text-tx1 truncate">{method.method}</h4>
            </div>
            
            {/* Key metrics */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-tx2">Ventas</span>
                <span className="text-sm font-bold text-tx1">{method.sales}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-tx2">Inversión en Ads</span>
                <span className="text-sm font-semibold text-tx1">{money0(method.spend ?? 0)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-tx2">Cash</span>
                <span className="text-sm font-semibold text-tx1">{money0(method.cash)}</span>
              </div>
              
              {method.spend > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-tx2">ROAS</span>
                  <span className={`text-sm font-semibold ${roas >= 3 ? 'text-[#58F178]' : roas >= 1.5 ? 'text-[#FFD84D]' : 'text-[#FF6B6B]'}`}>
                    {x(roas)}
                  </span>
                </div>
              )}
              
              {/* Special indicators */}
              {method.method === 'Prospección' && method.messages && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-tx2">Mensajes</span>
                  <span className="text-xs text-tx1">{method.messages}</span>
                </div>
              )}
              
              {method.method === 'Orgánico' && method.videos && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-tx2">Videos</span>
                  <span className="text-xs text-tx1">{method.videos}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}