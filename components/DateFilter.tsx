import { useState } from 'react';
import { DateFilterType, DateRange } from '../types';
import { dateFilterOptions, formatDateRange } from '../utils/dateFilters';

interface DateFilterProps {
  activeFilter: DateFilterType;
  dateRange: DateRange;
  onFilterChange: (filterType: DateFilterType, range: DateRange) => void;
}

export default function DateFilter({ activeFilter, dateRange, onFilterChange }: DateFilterProps) {
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [customStartDate, setCustomStartDate] = useState(dateRange.startDate);
  const [customEndDate, setCustomEndDate] = useState(dateRange.endDate);

  const handleFilterClick = (filterType: DateFilterType) => {
    if (filterType === 'custom') {
      setShowCustomPicker(true);
      return;
    }

    const option = dateFilterOptions.find(opt => opt.id === filterType);
    if (option) {
      const newRange = option.getRange();
      onFilterChange(filterType, newRange);
    }
  };

  const handleCustomDateApply = () => {
    if (customStartDate && customEndDate && customStartDate <= customEndDate) {
      onFilterChange('custom', {
        startDate: customStartDate,
        endDate: customEndDate
      });
      setShowCustomPicker(false);
    }
  };

  const handleCustomDateCancel = () => {
    setCustomStartDate(dateRange.startDate);
    setCustomEndDate(dateRange.endDate);
    setShowCustomPicker(false);
  };

  return (
    <div className="mb-6">
      {/* Date Filter Toggle Group */}
      <div className="flex flex-wrap gap-2 mb-4">
        {dateFilterOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleFilterClick(option.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeFilter === option.id
                ? 'bg-white/10 border border-white/25 text-white shadow-[0_6px_18px_rgba(255,255,255,.12)]'
                : 'bg-white/5 border border-white/10 text-tx2 hover:bg-white/8 hover:border-white/20'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Date Range Display */}
      <div className="text-sm text-tx2">
        Rango seleccionado: <span className="text-tx1 font-medium">{formatDateRange(dateRange)}</span>
      </div>

      {/* Custom Date Picker Modal */}
      {showCustomPicker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="glass rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-tx1 mb-4">Seleccionar rango personalizado</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-tx2 mb-2">Fecha de inicio</label>
                <input
                  type="date"
                  value={customStartDate.toISOString().split('T')[0]}
                  onChange={(e) => setCustomStartDate(new Date(e.target.value))}
                  className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-tx1 focus:outline-none focus:ring-2 focus:ring-border"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-tx2 mb-2">Fecha de fin</label>
                <input
                  type="date"
                  value={customEndDate.toISOString().split('T')[0]}
                  onChange={(e) => setCustomEndDate(new Date(e.target.value))}
                  className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-tx1 focus:outline-none focus:ring-2 focus:ring-border"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCustomDateCancel}
                className="flex-1 px-4 py-2 text-tx2 border border-border rounded-lg hover:bg-surface transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCustomDateApply}
                disabled={!customStartDate || !customEndDate || customStartDate > customEndDate}
                className="flex-1 px-4 py-2 bg-surface border border-border text-tx1 rounded-lg hover:bg-surface/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 