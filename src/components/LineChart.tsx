"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface PerformancePoint {
  date: string;
  accumulated_return_pct: number;
}

interface Props {
  data: PerformancePoint[];
}

export function LineChartComponent({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
        <Line type="monotone" dataKey="accumulated_return_pct" stroke="#3b82f6" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
