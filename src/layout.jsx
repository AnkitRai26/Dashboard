import { Inter } from 'next/font/google'
import { cn } from './lib/utils'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={cn('antialiased', inter.variable)}>
        {children}
      </body>
    </html>
  )
}
