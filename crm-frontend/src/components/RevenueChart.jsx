import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const fmt = (n) => n >= 1000000 ? `$${(n / 1000000).toFixed(1)}M` : `$${(n / 1000).toFixed(0)}K`

export default function RevenueChart({ data }) {
  return (
    <div className="card">
      <h2>Revenue Over Time</h2>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d3154" />
          <XAxis
            dataKey="month"
            stroke="#64748b"
            fontSize={11}
            tickFormatter={(val) => {
              const [year, month] = val.split('-')
              return new Date(year, month - 1).toLocaleString('default', { month: 'short' })
            }}
          />
          <YAxis stroke="#64748b" fontSize={11} tickFormatter={fmt} />
          <Tooltip
            contentStyle={{ background: '#1a1d2e', border: '1px solid #2d3154', borderRadius: '8px' }}
            labelStyle={{ color: '#94a3b8' }}
            formatter={(v) => [fmt(v), 'ARR']}
          />
          <Line type="monotone" dataKey="arr_usd" stroke="#6366f1" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}