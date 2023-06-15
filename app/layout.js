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
  description: 'Valal - Your one-stop-shop for concise and accurate summaries of the web!',

}

/*
  TO-DO: 
    1. switch focus to API, develop the API first and UI second
    2. document / debug project to establish debugging points to make it easier to scale 
    3. make it possible to only extract meaningful text from the website
    4. make it possible to submit an array of websites to crawl and summarize
    5. maybe set limits for users using too many tokens?

    setting limits would mean that the website would need some kind of a subscription service
    I really don't think anybody will use this site outside of just testing it from my portfolio, 
    but if it ends up being more useful than I thought, we'll cross that bridge when we get to it

    if we have a limit of 5 USD a month with our API, I guess we can set the limit at 0.50 USD for how much the user can spend for free


*/

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
