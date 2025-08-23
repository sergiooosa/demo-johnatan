import React, { Fragment, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CallAnalysisNote } from '../types';
import { exportToCsv, generateFilename, sanitizeFilename } from '../lib/export';

interface CallAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  callNote: CallAnalysisNote;
}

export default function CallAnalysisModal({ isOpen, onClose, callNote }: CallAnalysisModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableElementRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      firstFocusableElementRef.current?.focus();
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const getResultadoColor = (resultado: string) => {
    switch (resultado) {
      case 'Venta':
        return 'bg-[rgba(88,241,120,0.1)] text-[#58F178] border-[#58F178]';
      case 'Oferta enviada':
        return 'bg-[rgba(255,216,77,0.1)] text-[#FFD84D] border-[#FFD84D]';
      case 'Seguimiento':
        return 'bg-[rgba(59,130,246,0.1)] text-[#3B82F6] border-[#3B82F6]';
      case 'Perdida':
      case 'No calificada':
        return 'bg-[rgba(255,107,107,0.1)] text-[#FF6B6B] border-[#FF6B6B]';
      default:
        return 'bg-white/10 text-white border-white/20';
    }
  };

  const handleExportCall = () => {
    const data = [{
      Lead: callNote.leadName,
      Estado: callNote.resultado,
      Teléfono: callNote.phone,
      Closer: callNote.closer
    }];
    
    const filename = generateFilename(
      sanitizeFilename(`analisis_${callNote.leadName}`),
      new Date(),
      new Date(),
      'csv'
    );
    exportToCsv(filename, data);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
      style={{ backgroundColor: 'rgba(11,18,36,0.92)' }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-md rounded-2xl border border-white/10 shadow-2xl p-6 text-white max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: '#0E152B' }}
      >
        <h3 className="text-xl font-bold mb-6" style={{ color: '#E6ECFF' }}>
          Análisis de Llamada
        </h3>

        {/* Información esencial */}
        <div className="space-y-4 mb-6">
          <div>
            <p className="text-sm mb-1" style={{ color: '#9DA9C0' }}>Lead</p>
            <p className="text-lg font-medium" style={{ color: '#E6ECFF' }}>{callNote.leadName}</p>
          </div>
          
          <div>
            <p className="text-sm mb-2" style={{ color: '#9DA9C0' }}>Estado</p>
            <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full border ${getResultadoColor(callNote.resultado)}`}>
              {callNote.resultado}
            </span>
          </div>
          
          <div>
            <p className="text-sm mb-1" style={{ color: '#9DA9C0' }}>Teléfono</p>
            <p className="text-lg font-medium" style={{ color: '#E6ECFF' }}>{callNote.phone}</p>
          </div>
          
          <div>
            <p className="text-sm mb-1" style={{ color: '#9DA9C0' }}>Closer</p>
            <p className="text-lg font-medium" style={{ color: '#E6ECFF' }}>{callNote.closer}</p>
          </div>
        </div>

        {/* Análisis Automático */}
        <div className="mb-8">
          <p className="text-sm mb-2 font-bold" style={{ color: '#9DA9C0' }}>Análisis Automático</p>
          <p className="text-sm leading-relaxed" style={{ color: '#E6ECFF' }}>
            La llamada mostró interés inicial del lead, se identificaron objeciones comunes sobre precio y confianza, pero el closer logró manejar la situación con seguridad. Se recomienda dar seguimiento en los próximos días para reforzar compromiso.
          </p>
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={handleExportCall}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-white/8 hover:bg-white/12 border border-white/15 text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Exportar análisis (CSV)
          </button>
          <button
            ref={firstFocusableElementRef}
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}