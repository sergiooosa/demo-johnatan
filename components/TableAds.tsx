import React, { useState, Fragment } from 'react';
import { Ad, SubCampaign } from '../types';
import { money0, money2, safeDiv, x } from '../utils/helpers';
import { getAdCampaigns } from '../lib/campaigns';

interface TableAdsProps {
  ads: Ad[];
}

export default function TableAds({ ads }: TableAdsProps) {
  // Filter only Meta Ads
  const metaAds = ads.filter(ad => ad.medium === "Meta Ads");
  
  // Initialize with all Meta Ads expanded by default
  const [expandedAds, setExpandedAds] = useState<Set<string>>(
    new Set(metaAds.map(ad => ad.adId))
  );
  
  // Sort by sales descending
  const sortedAds = [...metaAds].sort((a, b) => b.sales - a.sales);

  const toggleExpanded = (adId: string) => {
    const newExpanded = new Set(expandedAds);
    if (newExpanded.has(adId)) {
      newExpanded.delete(adId);
    } else {
      newExpanded.add(adId);
    }
    setExpandedAds(newExpanded);
  };

  const isExpanded = (adId: string) => expandedAds.has(adId);

  // Calculate metrics for campaigns
  const getCampaignMetrics = (campaign: SubCampaign) => {
    const cpaq = campaign.cpaq ?? safeDiv(campaign.spend, campaign.agendasQ);
    const cpsq = campaign.cpsq ?? safeDiv(campaign.spend, campaign.showsQ);
    const cac = campaign.cac ?? safeDiv(campaign.spend, campaign.sales);
    return { cpaq, cpsq, cac };
  };

  return (
    <div 
      className="glass glow rounded-xl p-6 shadow-lg overflow-x-auto transition-all duration-300"
      style={{
        border: '2px solid #3B82F699',
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
      <h3 className="text-lg font-semibold text-tx1 mb-4">Anuncios por Rendimiento</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-2 text-tx2">Ad / Campaña</th>
            <th className="text-left py-3 px-2 text-tx2">Medio</th>
            <th className="text-right py-3 px-2 text-tx2">Spend</th>
            <th className="text-right py-3 px-2 text-tx2">AgendasQ</th>
            <th className="text-right py-3 px-2 text-tx2">ShowsQ</th>
            <th className="text-right py-3 px-2 text-tx2">Ventas</th>
            <th className="text-right py-3 px-2 text-tx2">Cash</th>
            <th className="text-right py-3 px-2 text-tx2">CPA-Q</th>
            <th className="text-right py-3 px-2 text-tx2">CPS-Q</th>
            <th className="text-right py-3 px-2 text-tx2">CAC</th>
            <th className="text-right py-3 px-2 text-tx2">ROAS</th>
          </tr>
        </thead>
        <tbody>
          {sortedAds.map((ad) => {
            const campaigns = getAdCampaigns(ad);
            const expanded = isExpanded(ad.adId);
            
            return (
              <Fragment key={ad.adId}>
                {/* Parent Row - Ad Name and Medium */}
                <tr 
                  className="border-t border-white/10 bg-white/4 hover:bg-white/6 cursor-pointer transition-colors"
                  onClick={() => toggleExpanded(ad.adId)}
                >
                  <td className="py-3 px-2" colSpan={2}>
                    <div className="flex items-center gap-2">
                      <svg 
                        className={`w-4 h-4 transition-transform ${expanded ? 'rotate-90' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="font-medium">{ad.adName}</span>
                      <span className="text-white/70">· {ad.medium}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-white/40 text-right" colSpan={9}>
                    — ver {campaigns.length} campañas —
                  </td>
                </tr>
                
                {/* Child Rows - Campaigns */}
                {expanded && campaigns.map((campaign, index) => {
                  const metrics = getCampaignMetrics(campaign);
                  
                  return (
                    <tr 
                      key={`${ad.adId}-${campaign.name}`} 
                      className="border-t border-white/5 hover:bg-white/6 hover:ring-1 hover:ring-white/15 transition-colors"
                    >
                      <td className="py-2 px-2 pl-8">
                        <strong className="text-tx1">{campaign.name}</strong>
                      </td>
                      <td className="py-2 px-2 text-tx2">{ad.medium}</td>
                      <td className="py-2 px-2 text-right">{money0(campaign.spend)}</td>
                      <td className="py-2 px-2 text-right">{campaign.agendasQ}</td>
                      <td className="py-2 px-2 text-right">{campaign.showsQ}</td>
                      <td className="py-2 px-2 text-right font-semibold">{campaign.sales}</td>
                      <td className="py-2 px-2 text-right">{money0(campaign.cash)}</td>
                      <td className="py-2 px-2 text-right">{money2(metrics.cpaq)}</td>
                      <td className="py-2 px-2 text-right">{money2(metrics.cpsq)}</td>
                      <td className="py-2 px-2 text-right">{money0(metrics.cac)}</td>
                      <td className="py-2 px-2 text-right">{x(campaign.roas)}</td>
                    </tr>
                  );
                })}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
} 