import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-4">Go to Page with client Session</h1>
      <Link href="/page-with-client">
        <span className="text-blue-500 hover:underline">
          Page with client session
        </span>
      </Link>

      <h1 className="text-3xl mt-8 mb-4">Go to Page with server Session</h1>
      <Link href="/page-with-server">
        <span className="text-blue-500 hover:underline">
          Page with server session
        </span>
      </Link>
    </div>
  )
}
