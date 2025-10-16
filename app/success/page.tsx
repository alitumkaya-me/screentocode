'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CheckCircle, ArrowRight, Sparkles, Zap, Trophy, Gift, Star } from 'lucide-react'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const payment = searchParams?.get?.('payment') || null
  const mock = (searchParams?.get?.('mock') || 'false')
  const [loading, setLoading] = useState(true)
  const [confetti, setConfetti] = useState(true)

  useEffect(() => {
    if (!payment) {
      // Eğer query param gelmediyse kullanıcıyı yeniden yönlendir
      router.push('/landing')
      return
    }

    setTimeout(() => {
      setLoading(false)
    }, 1500)

    // Hide confetti after 5 seconds
    setTimeout(() => {
      setConfetti(false)
    }, 5000)
  }, [payment, router])

  useEffect(() => {
    const cursor = document.getElementById('cursor')
    const trail = document.getElementById('cursor-trail')
    let mouseX = 0
    let mouseY = 0
    let trailX = 0
    let trailY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (cursor) {
        cursor.style.left = `${mouseX - 12}px`
        cursor.style.top = `${mouseY - 12}px`
      }
    }

    const animateTrail = () => {
      trailX += (mouseX - trailX) * 0.15
      trailY += (mouseY - trailY) * 0.15
      
      if (trail) {
        trail.style.left = `${trailX - 4}px`
        trail.style.top = `${trailY - 4}px`
      }
      
      requestAnimationFrame(animateTrail)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animateTrail()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          {/* Animated Background */}
          <div className="fixed inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '700ms' }}></div>
          </div>
          
          <div className="relative z-10">
            <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-xl text-gray-400">Ödeme doğrulanıyor...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden cursor-comet">
      {/* Custom Cursor */}
      <div id="cursor" className="fixed w-6 h-6 pointer-events-none z-[9999] mix-blend-screen">
        <div className="absolute inset-0 bg-purple-500 rounded-full blur-sm animate-pulse" />
        <div className="absolute inset-0 bg-pink-400 rounded-full blur-md opacity-60" />
      </div>
      <div id="cursor-trail" className="fixed w-2 h-2 pointer-events-none z-[9998]">
        <div className="absolute inset-0 bg-purple-400 rounded-full blur-sm opacity-40" />
      </div>

      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-blue-900/20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '700ms' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1400ms' }} />
      </div>

      {/* Confetti Effect */}
      {confetti && (
        <div className="fixed inset-0 z-20 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-purple-500 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                animation: `fall ${2 + Math.random() * 3}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: Math.random()
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          {/* Success Card */}
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
            
            <div className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 px-8 py-12 text-center">
                {/* Animated Success Icon */}
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-white/30 rounded-full blur-2xl animate-pulse"></div>
                  <div className="relative w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <CheckCircle className="w-20 h-20 text-white animate-bounce" strokeWidth={2.5} />
                  </div>
                </div>

                <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
                  Harika! 🎉
                </h1>
                <p className="text-xl text-green-50 font-medium">
                  Ödemeniz başarıyla tamamlandı!
                </p>
                
                {mock && (
                  <div className="mt-4 inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/30 px-4 py-2 rounded-full">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 text-sm font-bold">TEST MODU</span>
                  </div>
                )}
              </div>

              <div className="p-8 md:p-12">
                {/* Welcome Message */}
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-white mb-3">
                    ScreenToCode Pro'ya Hoş Geldin! 🚀
                  </h2>
                  <p className="text-gray-400 text-lg">
                    Artık tüm premium özelliklere erişebilirsin
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-10">
                  {[
                    { 
                      icon: Zap, 
                      title: 'Sınırsız Üretim', 
                      desc: 'İstediğin kadar kod üret',
                      color: 'from-yellow-500 to-orange-500'
                    },
                    { 
                      icon: Trophy, 
                      title: 'Tüm Frameworkler', 
                      desc: 'HTML, React, Vue, Svelte',
                      color: 'from-purple-500 to-pink-500'
                    },
                    { 
                      icon: Star, 
                      title: 'Öncelikli Destek', 
                      desc: '7/24 hızlı yanıt',
                      color: 'from-blue-500 to-cyan-500'
                    },
                    { 
                      icon: Gift, 
                      title: 'Watermark Yok', 
                      desc: 'Tamamen temiz kod',
                      color: 'from-green-500 to-emerald-500'
                    },
                  ].map((feature, i) => (
                    <div 
                      key={i}
                      className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.05] hover:border-purple-500/30 transition-all duration-300 hover:scale-105"
                    >
                      <div className={`bg-gradient-to-br ${feature.color} p-3 rounded-xl w-fit mb-4`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-white font-bold text-lg mb-1">{feature.title}</h3>
                      <p className="text-gray-400 text-sm">{feature.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Next Steps */}
                <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-8 mb-10">
                  <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-purple-400" />
                    Şimdi Ne Yapmalısın?
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'İlk profesyonel kodunu üret',
                      'Tüm framework seçeneklerini dene',
                      'Kodlarını ZIP olarak indir',
                      'Community Discord\'umuza katıl'
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-purple-400 text-sm font-bold">{i + 1}</span>
                        </div>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-4">
                  <button
                    onClick={() => router.push('/app')}
                    className="group w-full relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-500 hover:via-pink-500 hover:to-blue-500 text-white px-10 py-6 rounded-2xl text-lg font-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(168,85,247,0.6)]"
                  >
                    <div className="relative z-10 flex items-center justify-center gap-3">
                      <Rocket className="w-6 h-6 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                      <span>Hemen Kod Üretmeye Başla</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  </button>

                  <button
                    onClick={() => router.push('/landing')}
                    className="w-full bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white px-10 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 border-2 border-white/10"
                  >
                    Ana Sayfaya Dön
                  </button>
                </div>

                {/* Receipt Info */}
                <div className="mt-8 text-center">
                  <p className="text-gray-500 text-sm">
                    📧 Fatura e-posta adresinize gönderildi
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 space-y-4">
            <div className="text-center">
              <p className="text-gray-500 text-sm">
                Sorularınız mı var? <a href="mailto:support@screentocode.ai" className="text-purple-400 hover:text-purple-300 transition-colors">Destek ekibimizle iletişime geç</a>
              </p>
            </div>
            
            <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-center items-center gap-2 text-sm">
              <p className="text-gray-400">
                © 2025 ScreenToCode. Tüm hakları saklıdır.
              </p>
              <span className="hidden md:inline text-gray-600">•</span>
              <p className="text-gray-500 flex items-center gap-2">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">ArsuzTech</span>
                ürünüdür
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        html, body, div, button, a, input, textarea, select {
          cursor: none !important;
        }
        
        body {
          cursor: none !important;
        }
        
        .cursor-comet {
          cursor: none !important;
        }
        
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}

function Rocket({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
}
