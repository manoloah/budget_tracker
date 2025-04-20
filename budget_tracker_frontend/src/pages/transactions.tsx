// File: src/pages/transactions.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  source: string;
  category: { name: string } | null;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/report/?month=2025-03')
      .then(res => setTransactions(res.data))
      .catch(err => console.error('Error fetching transactions:', err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Transactions</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-sm">
          <thead className="text-left border-b border-zinc-700">
            <tr>
              <th className="p-2">Date</th>
              <th className="p-2">Description</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Category</th>
              <th className="p-2">Source</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, index) => (
              <tr key={index} className="border-b border-zinc-800">
                <td className="p-2">{txn.date}</td>
                <td className="p-2">{txn.description}</td>
                <td className="p-2">${txn.amount.toFixed(2)}</td>
                <td className="p-2">{txn.category?.name || 'Uncategorized'}</td>
                <td className="p-2">{txn.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
