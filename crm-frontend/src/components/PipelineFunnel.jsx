import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const fmt = (v) => v >= 1000000 ? `$${(v/1000000).toFixed(1)}M` : `$${(v/1000).toFixed(0)}K`

export default function PipelineFunnel({ data }) {
  const filtered = data.filter(d => !['Closed Won', 'Closed Lost'].includes(d.stage))

  return (
    <div className="card">
      <h2>Active Pipeline by Stage</h2>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={filtered}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d3154" />
          <XAxis dataKey="stage" tick={{ fill: '#64748b', fontSize: 12 }} tickLine={false} />
          <YAxis tickFormatter={fmt} tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} axisLine={false} />
          <Tooltip
            formatter={(v, n) => [n === 'total_arr' ? fmt(v) : v, n === 'total_arr' ? 'ARR' : 'Deals']}
            contentStyle={{ background: '#1a1d2e', border: '1px solid #2d3154', borderRadius: '8px' }}
          />
          <Bar dataKey="total_arr" fill="#6366f1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}