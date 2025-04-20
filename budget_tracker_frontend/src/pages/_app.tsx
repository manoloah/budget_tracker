import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Sidebar from '@/components/Sidebar'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex h-screen bg-background text-white">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <Component {...pageProps} />
      </main>
    </div>
  )
}
