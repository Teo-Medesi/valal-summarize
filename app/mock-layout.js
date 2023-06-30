"use client"
import DesktopNavbar from './components/UI/DesktopNavbar'
import MobileNavbar from './components/UI/MobileNavbar'
import MobileBanner from './components/UI/MobileBanner'
import { Auth0Provider } from '@auth0/auth0-react'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function MockLayout({ children }) {

  return (
      <Auth0Provider clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID} domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN} authorizationParams={{ redirect_uri: (process.env.NEXT_PUBLIC_MODE === "DEVELOPMENT") ? "http://localhost:3000" : "https://valal-summarize.vercel.app"}}>
        <body className={inter.className + " overflow-x-hidden"}>
          <DesktopNavbar className="max-h-[10vh]"/>
          <MobileBanner className="max-h-[10vh]"/>
          <main className='h-[80vh] md:h-[90vh]'>{children}</main>
          <MobileNavbar className="max-h-[10vh]"/>
        </body>
      </Auth0Provider>

  )
}
