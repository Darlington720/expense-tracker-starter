import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const COLORS = {
  food: '#f87171',
  housing: '#60a5fa',
  utilities: '#fbbf24',
  transport: '#34d399',
  entertainment: '#a78bfa',
  salary: '#fb923c',
  other: '#94a3b8',
}

function SpendingChart({ transactions }) {
  const spending = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount)
      return acc
    }, {})

  const data = Object.entries(spending).map(([name, value]) => ({ name, value }))

  if (data.length === 0) {
    return null
  }

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="name" tick={{ fill: '#555a63', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#555a63', fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip
            formatter={(value) => `$${value.toFixed(2)}`}
            contentStyle={{
              background: '#13151d',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 8,
              color: '#e8e6e3',
              fontSize: 13,
            }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name] || '#8884d8'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SpendingChart
