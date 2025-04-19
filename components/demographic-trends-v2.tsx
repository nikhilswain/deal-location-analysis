// app/demographics/page.tsx
import DataPanel from "@/components/ui/data-panel";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";

const COLORS = ["#9b87f5", "#7E69AB", "#33C3F0", "#D6BCFA", "#8E9196"];

const demographicData = [
  { name: "2018", population: 93, income: 86 },
  { name: "2019", population: 96, income: 89 },
  { name: "2020", population: 97, income: 91 },
  { name: "2021", population: 99, income: 94 },
  { name: "2022", population: 100, income: 100 },
  { name: "2023", population: 102, income: 103 },
];

const workforceData = [
  { name: "Logistics", value: 35 },
  { name: "Office", value: 25 },
  { name: "Retail", value: 20 },
  { name: "Manufacturing", value: 15 },
  { name: "Other", value: 5 },
];

const DemographicPage = () => {
  const isMobile = useIsMobile(); // Optional if not used in rendering

  return (
    <div className="p-4">
      <DataPanel title="Demographic Trends">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={demographicData}
                margin={{ top: 10, right: 10, left: -20, bottom: 10 }}
              >
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide domain={[80, 110]} />
                <Tooltip
                  formatter={(value) => [`${value} (Index)`, ""]}
                  contentStyle={{
                    borderRadius: "4px",
                    border: "none",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: "12px", marginTop: "-10px" }}
                />
                <Bar
                  name="Population Growth"
                  dataKey="population"
                  fill="#9b87f5"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  name="Income Growth"
                  dataKey="income"
                  fill="#33C3F0"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={workforceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                >
                  {workforceData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, ""]}
                  contentStyle={{
                    borderRadius: "4px",
                    border: "none",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </DataPanel>
    </div>
  );
};

export default DemographicPage;
