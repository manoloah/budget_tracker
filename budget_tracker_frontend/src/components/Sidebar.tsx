// File: src/components/Sidebar.tsx
import { Home, List, BarChart, Wallet, Settings } from 'lucide-react';
import Link from 'next/link';

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: List, label: 'Transactions', href: '/transactions' },
  { icon: BarChart, label: 'Cash Flow', href: '/cashflow' },
  { icon: Wallet, label: 'Accounts', href: '/accounts' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-900 border-r border-zinc-800 p-4">
      <h1 className="text-xl font-bold mb-6">Budget Tracker</h1>
      <nav className="flex flex-col gap-4">
        {navItems.map(({ icon: Icon, label, href }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-3 text-sm hover:bg-zinc-800 p-2 rounded-md"
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}