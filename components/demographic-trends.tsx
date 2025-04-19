"use client"

import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
} from "recharts"

const populationData = [
  { year: 2018, population: 92400 },
  { year: 2019, population: 93100 },
  { year: 2020, population: 93800 },
  { year: 2021, population: 94600 },
  { year: 2022, population: 95500 },
  { year: 2023, population: 96700 },
]

const incomeData = [
  { year: 2018, income: 68500 },
  { year: 2019, income: 70200 },
  { year: 2020, income: 71800 },
  { year: 2021, income: 73500 },
  { year: 2022, income: 75100 },
  { year: 2023, income: 76900 },
]

const workforceData = [
  { name: "Professional Services", value: 28 },
  { name: "Healthcare", value: 22 },
  { name: "Retail", value: 18 },
  { name: "Manufacturing", value: 12 },
  { name: "Education", value: 10 },
  { name: "Other", value: 10 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

export function DemographicTrends() {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Demographic Trends</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium mb-3">Population Growth</h3>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={populationData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <XAxis dataKey="year" tick={{ fontSize: 12 }} tickLine={{ stroke: "#888" }} />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${value / 1000}k`}
                  tickLine={{ stroke: "#888" }}
                />
                <Tooltip
                  formatter={(value) => [`${value.toLocaleString()}`, "Population"]}
                  labelFormatter={(label) => `Year: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="population"
                  stroke="#0088FE"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-center">
            <div className="text-xs text-muted-foreground">5-Year Growth</div>
            <div className="text-sm font-medium">+4.7%</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium mb-3">Income Trends</h3>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incomeData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <XAxis dataKey="year" tick={{ fontSize: 12 }} tickLine={{ stroke: "#888" }} />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${value / 1000}k`}
                  tickLine={{ stroke: "#888" }}
                />
                <Tooltip
                  formatter={(value) => [`${value.toLocaleString()}`, "Income"]}
                  labelFormatter={(label) => `Year: ${label}`}
                />
                <Bar dataKey="income" fill="#00C49F" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-center">
            <div className="text-xs text-muted-foreground">5-Year Growth</div>
            <div className="text-sm font-medium">+12.3%</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium mb-3">Workforce Composition</h3>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <Pie
                  data={workforceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {workforceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  iconSize={8}
                  iconType="circle"
                  wrapperStyle={{ fontSize: "10px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
