import MockLayout from './app/mock-layout'
import './globals.css'

export const metadata = {
  title: 'Valal-Summarize',
  description: 'Valal - Your one-stop-shop for concise and accurate summaries of the web!',

}

export default function RootLayout({ children }) {

  return (
    <html lang="en" className='overflow-x-hidden'>
      <MockLayout children={children} />
    </html>
  )
}
