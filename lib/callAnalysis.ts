import callAnalysisData from "@/data/call_analysis.json";
import { CallAnalysisNote } from "@/types";

const firstNames = ['María', 'Carlos', 'Ana', 'Luis', 'Sofia', 'Juan', 'Laura', 'Pedro', 'Carmen', 'Diego', 'Isabella', 'Miguel', 'Valentina', 'Andrés', 'Camila'];
const lastNames = ['García', 'Rodríguez', 'López', 'Martínez', 'González', 'Pérez', 'Sánchez', 'Ramírez', 'Torres', 'Flores'];

const getRandomElement = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export function maskPhone(phone?: string): string {
  if (!phone) return '';
  const parts = phone.split(' ');
  if (parts.length >= 3) {
    return `${parts[0]} ${parts[1]} •••${parts[parts.length - 1].slice(-4)}`;
  }
  return phone.replace(/\d(?=\d{4})/g, '•');
}

export function generateCallAnalysis(
  leadName: string, 
  closer: string, 
  resultado: string,
  monto?: number
): CallAnalysisNote {
  const firstName = leadName.split(' ')[0] || getRandomElement(firstNames);
  const lastName = leadName.split(' ')[1] || getRandomElement(lastNames);
  const phone = `+57 ${getRandomInt(300, 320)} ${getRandomInt(100, 999)} ${getRandomInt(1000, 9999)}`;
  
  let objetivo: "Descubrimiento" | "Demo" | "Cierre" | "Seguimiento";
  let objecciones: string[] = [];
  let sentimiento: "Positivo" | "Neutro" | "Negativo";
  let resumen: string;
  let acciones: string[] = [];
  let cita: string | undefined;
  let transcripcion: string[] = [];

  switch (resultado) {
    case 'Venta':
      objetivo = Math.random() > 0.5 ? 'Cierre' : 'Demo';
      objecciones = Math.random() > 0.6 ? [] : [getRandomElement(['precio', 'tiempo'])];
      sentimiento = 'Positivo';
      resumen = `${firstName} mostró interés desde el inicio. Presentamos la solución y cerró ${monto ? `por ${monto}` : 'plan anual'}.`;
      acciones = ['Enviar factura', 'Agendar onboarding', 'Confirmar datos de pago'];
      cita = new Date(Date.now() + getRandomInt(1, 3) * 24 * 60 * 60 * 1000).toISOString().split('.')[0];
      transcripcion = [
        `Lead: Me gusta lo que veo, ¿cuáles son los pasos?`,
        `Closer: Te explico el proceso de implementación...`,
        `Lead: Perfecto, vamos adelante.`
      ];
      break;
      
    case 'Oferta enviada':
      objetivo = getRandomElement(['Demo', 'Seguimiento']) as "Demo" | "Seguimiento";
      objecciones = [getRandomElement(['precio', 'tiempo', 'confianza', 'presupuesto'])];
      sentimiento = Math.random() > 0.3 ? 'Neutro' : 'Positivo';
      resumen = `${firstName} mostró interés pero necesita evaluar. Envié propuesta personalizada.`;
      acciones = ['Enviar propuesta', 'Seguimiento en 48h', 'Preparar caso de éxito similar'];
      cita = new Date(Date.now() + getRandomInt(2, 5) * 24 * 60 * 60 * 1000).toISOString().split('.')[0];
      transcripcion = [
        `Lead: Me parece interesante, ¿podrían enviar más detalles?`,
        `Closer: Por supuesto, te preparo una propuesta personalizada.`,
        `Lead: Perfecto, la revisaré con el equipo.`
      ];
      break;
      
    case 'Perdida':
      objetivo = getRandomElement(['Descubrimiento', 'Cierre']) as "Descubrimiento" | "Cierre";
      objecciones = [getRandomElement(['precio', 'presupuesto', 'timing', 'necesidad'])];
      sentimiento = 'Negativo';
      resumen = `${firstName} no ve valor suficiente o no tiene presupuesto. No es el momento adecuado.`;
      acciones = ['Marcar para re-contacto en 6 meses', 'Actualizar perfil'];
      transcripcion = [
        `Lead: No creo que sea lo que necesitamos ahora.`,
        `Closer: ¿Qué te preocupa específicamente?`,
        `Lead: El presupuesto y timing no nos funciona.`
      ];
      break;
      
    case 'Seguimiento':
      objetivo = getRandomElement(['Descubrimiento', 'Demo']) as "Descubrimiento" | "Demo";
      objecciones = [getRandomElement(['tiempo', 'información'])];
      sentimiento = 'Neutro';
      resumen = `Primera llamada con ${firstName}. Identifiqué interés, pero necesita más información.`;
      acciones = ['Enviar material informativo', 'Agendar demo', 'Calificar mejor el lead'];
      cita = new Date(Date.now() + getRandomInt(3, 7) * 24 * 60 * 60 * 1000).toISOString().split('.')[0];
      transcripcion = [
        `Lead: Cuéntame más sobre lo que hacen.`,
        `Closer: Te explico nuestro enfoque y casos de éxito...`,
        `Lead: Interesante, me gustaría ver una demo.`
      ];
      break;
      
    default: // No calificada
      objetivo = 'Descubrimiento';
      objecciones = [getRandomElement(['necesidad', 'timing', 'presupuesto'])];
      sentimiento = 'Negativo';
      resumen = `${firstName} no cumple con el perfil o no hay necesidad real.`;
      acciones = ['Descalificar y archivar'];
      transcripcion = [
        `Lead: No tenemos esa necesidad actualmente.`,
        `Closer: ¿En qué momento podría ser relevante?`,
        `Lead: Realmente no veo que aplique para nosotros.`
      ];
      break;
  }

  return {
    id: `ca_${Date.now()}_${getRandomInt(100, 999)}`,
    leadName,
    phone,
    closer,
    objetivo,
    resultado: resultado as any,
    objecciones,
    sentimiento,
    resumen,
    acciones,
    cita,
    transcripcion
  };
}

export function getCallAnalysis(leadName: string, closer: string, resultado?: string): CallAnalysisNote {
  const existing = (callAnalysisData as CallAnalysisNote[]).find(
    note => note.leadName === leadName && note.closer === closer
  );
  
  if (existing) {
    return existing;
  }
  
  return generateCallAnalysis(leadName, closer, resultado || 'Seguimiento');
}