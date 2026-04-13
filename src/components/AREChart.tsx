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
  <div className="w-full glass-card p-6 rounded-xl">
    <ResponsiveContainer width="100%" height={320}>
      <ComposedChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(14, 87%, 55%)" stopOpacity={0.9} />
            <stop offset="100%" stopColor="hsl(14, 87%, 55%)" stopOpacity={0.4} />
          </linearGradient>
          <linearGradient id="leadGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(168, 100%, 35%)" />
            <stop offset="100%" stopColor="hsl(168, 100%, 50%)" />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 18%)" />
        <XAxis dataKey="month" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis yAxisId="spend" orientation="left" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis yAxisId="leads" orientation="right" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(220, 25%, 12%)",
            border: "1px solid hsl(220, 20%, 20%)",
            borderRadius: 12,
            color: "#fff",
            boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)",
          }}
        />
        <Bar yAxisId="spend" dataKey="spend" fill="url(#spendGradient)" radius={[6, 6, 0, 0]} barSize={28} name="Spend (₹K)" />
        <Line yAxisId="leads" type="monotone" dataKey="leads" stroke="url(#leadGradient)" strokeWidth={3} dot={{ fill: "hsl(168, 100%, 40%)", r: 5, strokeWidth: 2, stroke: "hsl(220, 30%, 8%)" }} name="Leads" />
      </ComposedChart>
    </ResponsiveContainer>
    <p className="text-xs text-muted-foreground text-center mt-4 font-medium">
      Month 1: ₹1.75L / 150 leads → Month 60: ₹35K / 50,000+ leads
    </p>
  </div>
);

export default AREChart;
