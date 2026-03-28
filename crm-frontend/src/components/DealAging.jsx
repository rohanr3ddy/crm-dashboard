const fmt = (n) => `$${(n / 1000).toFixed(0)}K`
const ageColor = (d) => d > 120 ? '#ef4444' : d > 60 ? '#f59e0b' : '#10b981'

export default function DealAging({ deals }) {
  return (
    <div className="card">
      <h2>Deal Aging — Stale Pipeline Risk</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr style={{ color: '#64748b', borderBottom: '1px solid #2d3154' }}>
            <th style={{ textAlign: 'left', padding: '8px 12px' }}>Account</th>
            <th style={{ textAlign: 'left', padding: '8px 12px' }}>Rep</th>
            <th style={{ textAlign: 'left', padding: '8px 12px' }}>Stage</th>
            <th style={{ textAlign: 'right', padding: '8px 12px' }}>ARR</th>
            <th style={{ textAlign: 'right', padding: '8px 12px' }}>Days Open</th>
            <th style={{ textAlign: 'right', padding: '8px 12px' }}>Close Date</th>
          </tr>
        </thead>
        <tbody>
          {deals.slice(0, 15).map((d) => (
            <tr key={d.opp_id} style={{ borderBottom: '1px solid #1e2235' }}>
              <td style={{ padding: '10px 12px', color: '#f1f5f9', fontWeight: 500 }}>{d.company_name}</td>
              <td style={{ padding: '10px 12px', color: '#94a3b8' }}>{d.name}</td>
              <td style={{ padding: '10px 12px', color: '#94a3b8' }}>{d.stage}</td>
              <td style={{ padding: '10px 12px', textAlign: 'right', color: '#6366f1', fontWeight: 600 }}>{fmt(d.arr_usd)}</td>
              <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700, color: ageColor(d.days_open) }}>
                {d.days_open}d
              </td>
              <td style={{ padding: '10px 12px', textAlign: 'right', color: '#64748b' }}>
                {new Date(d.close_date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}