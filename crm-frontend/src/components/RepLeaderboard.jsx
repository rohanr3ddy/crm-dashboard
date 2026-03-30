import { useState, useMemo } from 'react'

const fmt = (n) => `$${(n / 1000).toFixed(0)}K`
const pctColor = (p) => p >= 100 ? '#10b981' : p >= 75 ? '#f59e0b' : '#ef4444'

const SortIcon = ({ col, sortCol, sortDir }) => {
  if (sortCol !== col) return <span style={{ color: '#334155', marginLeft: '4px' }}>↕</span>
  return <span style={{ color: '#6366f1', marginLeft: '4px' }}>{sortDir === 'asc' ? '↑' : '↓'}</span>
}

const TH = ({ children, col, align = 'left', sortCol, sortDir, onSort }) => (
  <th
    onClick={() => onSort(col)}
    style={{
      textAlign: align,
      padding: '8px 12px',
      cursor: 'pointer',
      userSelect: 'none',
      whiteSpace: 'nowrap',
    }}
  >
    {children}<SortIcon col={col} sortCol={sortCol} sortDir={sortDir} />
  </th>
)

export default function RepLeaderboard({ reps }) {
  const [sortCol, setSortCol] = useState('total_arr')
  const [sortDir, setSortDir] = useState('desc')

  // Assign fixed ARR rank once — never changes regardless of sort
  const rankedReps = useMemo(() => {
    const byArr = [...reps].sort((a, b) => b.total_arr - a.total_arr)
    const rankMap = new Map(byArr.map((r, i) => [r.rep_id, i + 1]))
    return reps.map(r => ({ ...r, arr_rank: rankMap.get(r.rep_id) }))
  }, [reps])

  const onSort = (col) => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortCol(col); setSortDir('desc') }
  }

  const sorted = [...rankedReps].sort((a, b) => {
	const av = a[sortCol] ?? ''
	const bv = b[sortCol] ?? ''
	if (typeof av === 'string' || typeof bv === 'string') {
		return sortDir === 'asc'
		  ? String(av).localeCompare(String(bv))
		  : String(bv).localeCompare(String(av))
	}
	return sortDir === 'asc' ? av - bv : bv - av
  })

  const thProps = { sortCol, sortDir, onSort }

  return (
    <div className="card">
      <h2>Rep Leaderboard</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr style={{ color: '#64748b', borderBottom: '1px solid #2d3154' }}>
            <TH col="arr_rank" align="center" {...thProps}>#</TH>
            <TH col="name" {...thProps}>Rep</TH>
            <TH col="team" {...thProps}>Team</TH>
            <TH col="total_arr" align="right" {...thProps}>Closed ARR</TH>
            <TH col="closed_deals" align="right" {...thProps}>Deals</TH>
            <TH col="win_rate_pct" align="right" {...thProps}>Win Rate</TH>
            <TH col="quota_attainment_pct" align="right" {...thProps}>Quota Att.</TH>
          </tr>
        </thead>
        <tbody>
          {sorted.map((r) => (
            <tr key={r.rep_id} style={{ borderBottom: '1px solid #1e2235' }}>
              <td style={{ padding: '10px 12px', textAlign: 'center', color: '#64748b', fontWeight: 500 }}>
                #{r.arr_rank}
              </td>
              <td style={{ padding: '10px 12px', color: '#f1f5f9', fontWeight: 500 }}>{r.name}</td>
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