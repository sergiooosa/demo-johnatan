import * as XLSX from "xlsx";

export function exportToXlsx(filename: string, rows: any[], sheetName = "Datos") {
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, filename);
}

export function exportToCsv(filename: string, rows: any[]) {
  const ws = XLSX.utils.json_to_sheet(rows);
  const csv = XLSX.utils.sheet_to_csv(ws);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

// Helper function to generate filename with date range
export function generateFilename(prefix: string, startDate?: Date, endDate?: Date, format: 'xlsx' | 'csv' = 'xlsx'): string {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  
  let rangeStr = '';
  if (startDate && endDate) {
    const start = startDate.toISOString().split('T')[0];
    const end = endDate.toISOString().split('T')[0];
    rangeStr = `_${start}_${end}`;
  }
  
  return `${prefix}${rangeStr}_${dateStr}.${format}`;
}

// Sanitize filename for different OS
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[<>:"/\\|?*]/g, '_')
    .replace(/\s+/g, '_')
    .toLowerCase();
}