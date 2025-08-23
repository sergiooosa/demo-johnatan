import { KpiCardProps } from '../types';
import { getBadgeColor } from '../utils/helpers';

export default function KpiCard({ title, value, variation, badge }: KpiCardProps) {
  // Define border colors based on metric type
  const getBorderColor = (title: string): string => {
    switch (title) {
      case 'Ventas realizadas':
        return '#34A853'; // verde
      case 'Cash Collected':
        return '#3B82F6'; // azul
      case 'Facturación':
        return '#7C3AED'; // morado suave
      default:
        return '#3B82F6'; // azul suave para el resto
    }
  };

  // No badges for any metrics - clean design
  const showBadge = false;

  const borderColor = getBorderColor(title);

  return (
    <div 
      className="glass glow rounded-xl p-6 shadow-lg transition-all duration-300 hover:scale-[1.01]"
      style={{
        border: `2px solid ${borderColor}99`, // 60% opacity
        boxShadow: `0 0 12px ${borderColor}40`, // 25% opacity
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = `2px solid ${borderColor}E6`; // 90% opacity
        e.currentTarget.style.boxShadow = `0 0 18px ${borderColor}80`; // 50% opacity
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = `2px solid ${borderColor}99`; // 60% opacity
        e.currentTarget.style.boxShadow = `0 0 12px ${borderColor}40`; // 25% opacity
      }}
    >
      <h3 className="text-sm font-medium text-tx2 mb-2">{title}</h3>
      <div className="text-2xl font-bold text-tx1 mb-2">{value}</div>
      {variation && (
        <div className="text-sm text-tx2">{variation}</div>
      )}
      {showBadge && badge && (
        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border whitespace-nowrap ${getBadgeColor(badge)}`}>
          {badge}
        </span>
      )}
    </div>
  );
} 