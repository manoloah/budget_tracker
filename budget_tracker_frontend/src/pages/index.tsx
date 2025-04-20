// File: src/pages/index.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ReportRow {
  category__name: string;
  total: number;
}

export default function Dashboard() {
  const [data, setData] = useState<ReportRow[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/report/?month=2025-03')
      .then(res => setData(res.data))
      .catch(err => console.error('Failed to fetch report data:', err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Budget vs Actuals</h2>
      <div className="bg-zinc-800 p-4 rounded-md">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="category__name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Bar dataKey="total" fill="#00e0d1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}