import { Area, AreaChart, ResponsiveContainer } from "recharts";

export default function AirChart({ data }: { data: { hour: number; pm: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <Area type="monotone" dataKey="pm" stroke="#3f7374" fill="#a8c7c7" fillOpacity={0.45} strokeWidth={1.5} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
