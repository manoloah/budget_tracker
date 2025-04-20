// File: src/pages/_app.tsx
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Sidebar from '@/components/Sidebar';

// This is the top-level layout wrapper for all pages (used in Pages Router)
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex h-screen bg-background text-white">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
