import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts'

function formatter (x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export default function PopularityChart (props) {
  return (
    <ResponsiveContainer width='100%' aspect={2.5}>
      <LineChart id={props.name} data={props.records}>
        <XAxis dataKey='year' interval={9} />
        <YAxis label={{ formatter }} />
        <Tooltip separator=': ' />
        <Legend />
        <Line
          name='Assigned female at birth'
          type='monotoneX'
          dot={false}
          dataKey='afabCount'
          stroke='#e74694'
          strokeWidth={4}
          activeDot={{ r: 7 }}
        />
        <Line
          name='Assigned male at birth'
          type='linear'
          dot={false}
          dataKey='amabCount'
          stroke='#319795'
          strokeWidth={4}
          activeDot={{ r: 7 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
