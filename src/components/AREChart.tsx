import { BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from "recharts";

const data = [
  { month: "M1", spend: 175, leads: 150 },
  { month: "M6", spend: 175, leads: 555 },
  { month: "M12", spend: 130, leads: 1590 },
  { month: "M18", spend: 100, leads: 3270 },
  { month: "M24", spend: 100, leads: 5880 },
  { month: "M36", spend: 50, leads: 13000 },
  { month: "M48", spend: 50, leads: 26800 },
  { month: "M60", spend: 35, leads: 50180 },
];

const AREChart = () => (
  <div className="w-full">
    <ResponsiveContainer width="100%" height={350}>
      <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(218, 45%, 22%)" />
        <XAxis dataKey="month" tick={{ fill: "hsl(211, 24%, 58%)", fontSize: 12 }} axisLine={{ stroke: "hsl(218, 45%, 22%)" }} />
        <YAxis yAxisId="spend" orientation="left" tick={{ fill: "hsl(211, 24%, 58%)", fontSize: 12 }} axisLine={{ stroke: "hsl(218, 45%, 22%)" }} label={{ value: "Spend ₹K", angle: -90, position: "insideLeft", fill: "hsl(211, 24%, 58%)", fontSize: 11 }} />
        <YAxis yAxisId="leads" orientation="right" tick={{ fill: "hsl(211, 24%, 58%)", fontSize: 12 }} axisLine={{ stroke: "hsl(218, 45%, 22%)" }} label={{ value: "Leads", angle: 90, position: "insideRight", fill: "hsl(211, 24%, 58%)", fontSize: 11 }} />
        <Tooltip contentStyle={{ backgroundColor: "hsl(213, 56%, 17%)", border: "1px solid hsl(218, 45%, 22%)", borderRadius: 8, color: "#fff" }} />
        <Bar yAxisId="spend" dataKey="spend" fill="hsl(14, 87%, 55%)" radius={[4, 4, 0, 0]} barSize={30} name="Spend (₹K)" />
        <Line yAxisId="leads" type="monotone" dataKey="leads" stroke="hsl(170, 100%, 39%)" strokeWidth={3} dot={{ fill: "hsl(170, 100%, 39%)", r: 4 }} name="Leads" />
      </ComposedChart>
    </ResponsiveContainer>
    <p className="text-xs text-muted-foreground text-center mt-3">
      Month 1: ₹1.75L / 150 leads → Month 60: ₹35K / 50,000+ leads
    </p>
  </div>
);

export default AREChart;
