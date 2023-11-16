import { Inter } from 'next/font/google'
import DeviceData from '@/components/devicedata/DeviceData'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col justify-between  ${inter.className}`}
    >
   
     <DeviceData/>
    </main>
  )
}
