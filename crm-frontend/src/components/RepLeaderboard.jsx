const fmt = (n) => `$${(n / 1000).toFixed(0)}K`
const pctColor = (p) => p >= 100 ? '#10b981' : p >= 75 ? '#f59e0b' : '#ef4444'

export default function RepLeaderboard({ reps }) {
  return (
    <div className="card">
      <h2>Rep Leaderboard</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr style={{ color: '#64748b', borderBottom: '1px solid #2d3154' }}>
            <th style={{ textAlign: 'left', padding: '8px 12px' }}>Rep</th>
            <th style={{ textAlign: 'left', padding: '8px 12px' }}>Team</th>
            <th style={{ textAlign: 'right', padding: '8px 12px' }}>Closed ARR</th>
            <th style={{ textAlign: 'right', padding: '8px 12px' }}>Deals</th>
            <th style={{ textAlign: 'right', padding: '8px 12px' }}>Win Rate</th>
            <th style={{ textAlign: 'right', padding: '8px 12px' }}>Quota Att.</th>
          </tr>
        </thead>
        <tbody>
          {reps.map((r, i) => (
            <tr key={r.rep_id} style={{ borderBottom: '1px solid #1e2235' }}>
              <td style={{ padding: '10px 12px', color: '#f1f5f9', fontWeight: 500 }}>
                <span style={{ color: '#64748b', marginRight: '8px' }}>#{i + 1}</span>{r.name}
              </td>
              <td style={{ padding: '10px 12px', color: '#94a3b8' }}>{r.team}</td>
              <td style={{ padding: '10px 12px', textAlign: 'right', color: '#6366f1', fontWeight: 600 }}>{fmt(r.total_arr)}</td>
              <td style={{ padding: '10px 12px', textAlign: 'right', color: '#94a3b8' }}>{r.closed_deals}</td>
              <td style={{ padding: '10px 12px', textAlign: 'right', color: '#94a3b8' }}>{r.win_rate_pct}%</td>
              <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 600, color: pctColor(r.quota_attainment_pct) }}>
                {r.quota_attainment_pct}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}