'use client'

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  {
    name: "Delta",
    value: 55,
    color: "#84cc16",
  },
  {
    name: "Alpha",
    value: 34,
    color: "#3b82f6",
  },
  {
    name: "Beta",
    value: 11,
    color: "#f97316",
  },
];

const TeamDistributionChart = () => {
  return (
    <ResponsiveContainer width="100%" height={150}>
        <PieChart>
            <Tooltip labelClassName='font-bold' wrapperClassName='[&_.recharts-tooltip-item]
            :!text-black dark:[&_.recharts-tooltip-item]:!text-white !text-sm dark:!bg-black rounded-md dark:!border-border' />
            <Pie data={data} dataKey="value" name="name">
                {
                    data.map((items , i )=> (
                        <Cell key={i} fill={items.color}  />
                    ))
                }
            </Pie>
        </PieChart>
    </ResponsiveContainer>
  )
}

export default TeamDistributionChart