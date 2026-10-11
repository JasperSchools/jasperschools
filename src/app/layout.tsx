import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jasper Primary School - Nyairongo',
  description: 'Creating bright paths together. A nonprofit primary school in rural Uganda dedicated to quality education for all children.',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans" suppressHydrationWarning>{children}</body>
    </html>
  )
}