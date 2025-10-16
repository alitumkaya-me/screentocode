'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams?.get('session_id') || null
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!sessionId) {
      router.push('/landing')
      return
    }

    // Simulate verification delay
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [sessionId, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Verifying payment...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800/50 border border-slate-700 rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">Payment Successful! 🎉</h1>
        <p className="text-gray-400 mb-8">
          Welcome to ScreenToCode Pro! Your subscription is now active.
        </p>

        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 mb-8">
          <h3 className="text-white font-semibold mb-2">What's Next?</h3>
          <ul className="text-sm text-gray-300 space-y-2 text-left">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Unlimited screenshot generations
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Export to all frameworks
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Priority support access
            </li>
          </ul>
        </div>

        <Link 
          href="/app" 
          className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition group"
        >
          Start Creating
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition" />
        </Link>

        <p className="text-sm text-gray-500 mt-6">
          Receipt sent to your email
        </p>
      </div>
    </div>
  )
}
