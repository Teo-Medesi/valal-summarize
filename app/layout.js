"use client"
import DesktopNavbar from './components/UI/DesktopNavbar'
import MobileNavbar from './components/UI/MobileNavbar'
import MobileBanner from './components/UI/MobileBanner'
import { Auth0Provider } from '@auth0/auth0-react'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Valal-Summarize',
  description: 'Valal - Your one-stop-shop for concise and accurate summaries of web pages!',

}

export default function RootLayout({ children }) {

  return (
    <html lang="en" className='overflow-x-hidden'>
      <Auth0Provider clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID} domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN} authorizationParams={{ redirect_uri: window.location.origin }}>
        <body className={inter.className}>
          <DesktopNavbar />
          <MobileBanner />
          <main className='h-[90vh]'>{children}</main>
          <MobileNavbar />
        </body>
      </Auth0Provider>
    </html>
  )
}
