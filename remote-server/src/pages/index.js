import { Inter } from 'next/font/google'
import DeviceData from '@/components/devicedata/DeviceData'
import Login from '@/components/LoginPage/Login'
import { useState } from 'react'
import Link from 'next/link'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [isLoggedIn, setLoggedIn] = useState(false)

  const handleLogin = () => {
    setLoggedIn(true)
  }
  return (
    <main
      className={`flex min-h-screen flex-col justify-between  ${inter.className}`}
    >
    
        {!isLoggedIn ? (
          <Login onLogin={handleLogin}/>
        ): (
          <>
          <DeviceData/>
          </>
        )}
        <Link href='/datable'>
        Go to DataTable
        </Link>
    </main>
  
  )
}
