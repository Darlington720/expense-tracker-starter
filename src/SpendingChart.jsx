import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const COLORS = {
  food: '#e05c5c',
  housing: '#4a7b9d',
  utilities: '#c9a84c',
  transport: '#6b9e78',
  entertainment: '#9b7ec8',
  salary: '#d4945a',
  other: '#7a7670',
}

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const { name, value } = payload[0].payload
  return (
    <div style={{
      background: '#1a1d22',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '6px',
      padding: '10px 14px',
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '13px',
    }}>
      <div style={{ color: '#8a8579', textTransform: 'capitalize', marginBottom: 4 }}>{name}</div>
      <div style={{ color: '#e8e4de', fontFamily: "'Playfair Display', serif", fontSize: '16px' }}>
        ${value.toFixed(2)}
      </div>
    </div>
  )
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
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis
            dataKey="name"
            tick={{ fill: '#5a564f', fontSize: 11, textTransform: 'capitalize' }}
            axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#5a564f', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${v}`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name] || '#7a7670'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SpendingChart
