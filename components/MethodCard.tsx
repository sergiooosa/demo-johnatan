import { METHOD_COLOR } from '../lib/colors';

interface MethodCardProps {
  method: string;
  children: React.ReactNode;
}

export default function MethodCard({ method, children }: MethodCardProps) {
  const methodColor = METHOD_COLOR[method];
  
  if (methodColor) {
    return (
      <div 
        className="glass glow rounded-xl p-6 shadow-lg transition-transform duration-200 hover:scale-[1.01] relative"
        style={{
          border: `2px solid ${methodColor}66`, // 40% opacity
          boxShadow: `0 0 12px ${methodColor}33`, // glow suave
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 0 18px ${methodColor}60`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = `0 0 12px ${methodColor}33`;
        }}
      >
        {children}
      </div>
    );
  }

  // Fallback para métodos sin color específico
  return (
    <div className="glass glow card-accent p-6 shadow-lg transition-transform duration-200 hover:scale-[1.01]">
      {children}
    </div>
  );
}