const fmt = (n) => n >= 1000000 ? `$${(n / 1000000).toFixed(1)}M` : `$${(n / 1000).toFixed(0)}K`

export default function ForecastGauge({ forecast }) {
  if (!forecast) return <div className="card"><h2>Forecast vs Quota</h2></div>

  const pct = Math.min(forecast.attainment_pct, 100)
  const color = pct >= 90 ? '#10b981' : pct >= 70 ? '#f59e0b' : '#ef4444'

  return (
    <div className="card">
      <h2>Forecast vs Quota</h2>
      <div style={{ textAlign: 'center', padding: '12px 0' }}>
        <div style={{ fontSize: '48px', fontWeight: 800, color }}>{forecast.attainment_pct}%</div>
        <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '20px' }}>Quota Attainment</div>
        <div style={{
          height: '8px', background: '#2d3154', borderRadius: '4px', overflow: 'hidden', marginBottom: '20px'
        }}>
          <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: '4px', transition: 'width 1s ease' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8' }}>
          <span>Closed Won<br /><strong style={{ color: '#f1f5f9' }}>{fmt(forecast.closed_won_usd)}</strong></span>
          <span>Weighted Pipeline<br /><strong style={{ color: '#f1f5f9' }}>{fmt(forecast.weighted_pipeline_usd)}</strong></span>
          <span>Total Quota<br /><strong style={{ color: '#f1f5f9' }}>{fmt(forecast.total_quota_usd)}</strong></span>
        </div>
      </div>
    </div>
  )
}