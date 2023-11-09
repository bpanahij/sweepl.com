import Image from 'next/image'
import { Inter } from 'next/font/google'
import dynamic from "next/dynamic"

const dumping = require("./results.json")
const sweeping = require("./street_sweeping.json")

const inter = Inter({ subsets: ['latin'] })

const MapView = dynamic(() => import("@/components/HeatMap"), { ssr:false })


export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <MapView data={dumping} />

      <MapView data={sweeping} />
    </main>
  )
}
