import React from "react"
import {Inter} from 'next/font/google'
import '../assets/css/globals.css'

const inter = Inter({subsets: ['latin']})

export const metadata = {
  title: 'Parama ne oldu?',
  description: 'Paranızın döviz/altın karşısında ne kadar eridiğini kolayca görün.',
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={"bg-gray-100"}>
    <body className={inter.className}>{children}</body>
    </html>
  )
}
