import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import TRPCContext from '@/context/TRPCContext'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/context/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="relative flex flex-col min-h-screen">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TRPCContext>
              <Navbar /> 
              {children}
            </TRPCContext>
          </ThemeProvider>
        </main>
      </body>
    </html>
  )
}
