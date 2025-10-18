'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (response.ok) {
        setDebugInfo(data.debug)
        setSuccess(true)
      } else {
        setError(data.error || 'Bir hata oluştu')
      }
    } catch (err) {
      setError('Ağ hatası. Lütfen tekrar deneyin.')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    const userExists = debugInfo?.userExists
    const hasResendKey = debugInfo?.hasResendKey

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 p-4">
        <div className="w-full max-w-md">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-purple-100 dark:border-purple-500/20">
            <div className="text-center mb-6">
              {userExists ? (
                <>
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    {hasResendKey ? 'Email Gönderildi! 📧' : 'İşlem Tamamlandı'}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    <strong className="text-purple-600 dark:text-purple-400">{email}</strong> adresine şifre sıfırlama linki gönderildi.
                  </p>

                  {hasResendKey ? (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30 rounded-lg p-4 mb-4">
                      <p className="text-sm text-green-800 dark:text-green-200 font-medium mb-2">
                        ✅ Email Başarıyla Gönderildi
                      </p>
                      <p className="text-xs text-green-700 dark:text-green-300">
                        • Email kutunuzu kontrol edin<br/>
                        • SPAM klasörünü de kontrol edin<br/>
                        • Link 1 saat geçerli
                      </p>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-500/30 rounded-lg p-4 mb-4">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium mb-2">
                        💡 Development Mode
                      </p>
                      <p className="text-xs text-yellow-700 dark:text-yellow-300 mb-2">
                        Email göndermek için RESEND_API_KEY gerekli.
                      </p>
                      <p className="text-xs text-yellow-700 dark:text-yellow-300">
                        Reset link'i <strong>console'da (F12)</strong> bulabilirsiniz.
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
                    Kayıt Bulunamadı
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    <strong className="text-red-600 dark:text-red-400">{email}</strong> adresi sistemde kayıtlı değil.
                  </p>

                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-lg p-4 mb-4">
                    <p className="text-sm text-red-800 dark:text-red-200 font-medium mb-2">
                      ❌ Bu Email Adresi Kayıtlı Değil
                    </p>
                    <p className="text-xs text-red-700 dark:text-red-300">
                      • Email adresinizi kontrol edin<br/>
                      • Veya yeni hesap oluşturun
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="space-y-3">
              <Link
                href="/auth/signin"
                className="block w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all duration-200 text-center"
              >
                Giriş Sayfasına Dön
              </Link>
              {!userExists && (
                <Link
                  href="/auth/signup"
                  className="block w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-all duration-200 text-center"
                >
                  Yeni Hesap Oluştur
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-purple-100 dark:border-purple-500/20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Şifremi Unuttum
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Email adresinizi girin, size şifre sıfırlama linki gönderelim.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-lg p-4">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Adresi
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="ornek@email.com"
                className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Gönderiliyor...' : 'Şifre Sıfırlama Linki Gönder'}
            </button>

            <div className="text-center">
              <Link
                href="/auth/signin"
                className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium"
              >
                ← Giriş Sayfasına Dön
              </Link>
            </div>
          </form>
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-lg p-4">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>

            <div className="text-center">
              <Link
                href="/auth/signin"
                className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium"
              >
                ← Back to Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
