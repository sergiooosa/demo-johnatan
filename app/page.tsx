'use client';

import { useState, useEffect } from 'react';
import adsData from '../data/ads.json';
import methodsData from '../data/methods.json';
import closersData from '../data/closers.json';
import { Ad, Method, Closer, DateFilterType, DateRange } from '../types';
import { sum, safeDiv, money0, money2, pct, x, getRandomVariation, getBadge } from '../utils/helpers';
import { getDefaultDateRange } from '../utils/dateFilters';

// Components
import Section from '../components/Section';
import KpiCard from '../components/KpiCard';
import TableAds from '../components/TableAds';
import TableMethods from '../components/TableMethods';
import TableClosers from '../components/TableClosers';
import BarCashVsSpend from '../components/BarCashVsSpend';
import ROASChart from '../components/ROASChart';
import DateFilter from '../components/DateFilter';
import MethodSummaryCards from '../components/MethodSummaryCards';

export default function Dashboard() {
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<DateFilterType>('30days');
  const [dateRange, setDateRange] = useState<DateRange>(getDefaultDateRange());

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/New_York'
    };
    setLastUpdate(now.toLocaleString('es-ES', options));
  }, []);

  const handleFilterChange = (filterType: DateFilterType, range: DateRange) => {
    setActiveFilter(filterType);
    setDateRange(range);
  };

  // Calculate totals for Ads (only where spend > 0)
  const adsWithSpend = adsData.filter((ad: Ad) => ad.spend > 0);
  const spendAdsTotal = sum(adsWithSpend.map((ad: Ad) => ad.spend));
  const agendasQTotal = sum(adsWithSpend.map((ad: Ad) => ad.agendasQ));
  const showsQTotal = sum(adsWithSpend.map((ad: Ad) => ad.showsQ));
  const salesTotal = sum(adsWithSpend.map((ad: Ad) => ad.sales));
  const cashAdsTotal = sum(adsWithSpend.map((ad: Ad) => ad.cash));

  // Calculate totals from all methods (Ads + Prospección + Orgánico)
  const salesTotalAll = sum(methodsData.map((m: Method) => m.sales || 0));
  const cashTotalAll = sum(methodsData.map((m: Method) => m.cash || 0));
  const billingTotal = methodsData.some(m => typeof (m as any).billing === "number")
    ? sum(methodsData.map(m => (m as any).billing || 0))
    : cashTotalAll; // fallback temporal

  // Calculate KPIs
  const cpaQ = safeDiv(spendAdsTotal, agendasQTotal);
  const cpsQ = safeDiv(spendAdsTotal, showsQTotal);
  const cac = safeDiv(spendAdsTotal, salesTotal);
  const roasGeneral = safeDiv(cashAdsTotal, spendAdsTotal);

  // Calculate sales totals
  const totalSales = sum(closersData.map((closer: Closer) => closer.sales));
  const totalCash = sum(closersData.map((closer: Closer) => closer.cash));
  const totalAgendas = sum(closersData.map((closer: Closer) => closer.agendas));
  const totalShows = sum(closersData.map((closer: Closer) => closer.shows));
  const totalLeads = sum(closersData.map((closer: Closer) => closer.leads));

  const cierrePercentage = safeDiv(totalSales, totalAgendas);
  const showPercentage = safeDiv(totalShows, totalAgendas);

  // State for variations to avoid hydration mismatch
  const [variations, setVariations] = useState<string[]>([]);

  useEffect(() => {
    // Generate variations only on client side
    setVariations([
      getRandomVariation(),
      getRandomVariation(),
      getRandomVariation(),
      getRandomVariation(),
      getRandomVariation(),
      getRandomVariation(),
      getRandomVariation(),
      getRandomVariation(),
      getRandomVariation()
    ]);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass border-b border-border p-6 mb-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-tx1 mb-2">Dashboard Tracker</h1>
          <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-tx2">
            <span>Actualización diaria 12:00 pm (GMT-5)</span>
            <span>Última actualización: {lastUpdate}</span>
          </div>
          <div className="text-xs text-tx2 mt-1">
            Datos filtrados por rango de fechas seleccionado
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-12">
        {/* Date Filter Section */}
        <DateFilter
          activeFilter={activeFilter}
          dateRange={dateRange}
          onFilterChange={handleFilterChange}
        />

        {/* SECCIÓN 1 — TOTAL (Adquisición) */}
        <Section title="TOTAL (Adquisición)">
          <div className="space-y-6">
            {/* Fila 1: Métricas de Adquisición */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              <KpiCard
                title="Inversión total en Ads"
                value={money0(spendAdsTotal)}
                variation={variations[0]}
              />
              <KpiCard
                title="Agendas conseguidas"
                value={agendasQTotal.toString()}
                variation={variations[1]}
              />
              <KpiCard
                title="CPA-Q"
                value={money2(cpaQ)}
                variation={variations[2]}
              />
              <KpiCard
                title="CPS-Q"
                value={money2(cpsQ)}
                variation={variations[3]}
              />
              <KpiCard
                title="CAC"
                value={money0(cac)}
                variation={variations[7]}
              />
            </div>
            
            {/* Fila 2: Métricas de Ventas y Resultados */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <KpiCard
                title="Ventas realizadas"
                value={salesTotalAll.toLocaleString()}
                variation={variations[4]}
              />
              <KpiCard
                title="Cash Collected"
                value={money0(cashTotalAll)}
                variation={variations[5]}
              />
              <KpiCard
                title="Facturación"
                value={money0(billingTotal)}
                variation={variations[6]}
              />
              <KpiCard
                title="ROAS General"
                value={spendAdsTotal > 0 ? x(roasGeneral) : '—'}
                variation={variations[8]}
              />
            </div>
          </div>
        </Section>

        {/* SECCIÓN 2 — MÉTRICAS DE ANUNCIOS / ORIGEN DE VENTAS */}
        <Section title="MÉTRICAS DE ANUNCIOS / ORIGEN DE VENTAS">
          <div className="space-y-8">
            {/* Method Summary Cards */}
            <MethodSummaryCards methods={methodsData} />
            
            <TableAds ads={adsData} />
            <TableMethods methods={methodsData} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <BarCashVsSpend methods={methodsData} />
              <ROASChart methods={methodsData} />
            </div>
          </div>
        </Section>

        {/* SECCIÓN 3 — VENTAS (Tracker de Closers) */}
        <Section title="VENTAS (Tracker de Closers)">
          <div className="space-y-8">
            {/* Sales Totals */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <KpiCard
                title="Cierres"
                value={totalSales.toString()}
              />
              <KpiCard
                title="Cash Collected"
                value={money0(totalCash)}
              />
              <KpiCard
                title="Facturación"
                value={money0(totalCash)}
              />
              <KpiCard
                title="% Cierre"
                value={pct(cierrePercentage)}
              />
              <KpiCard
                title="% Show"
                value={pct(showPercentage)}
              />
            </div>
            
            <TableClosers closers={closersData} dateRange={dateRange} />
          </div>
        </Section>
      </main>
    </div>
  );
} 