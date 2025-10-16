'use client'

import { signIn } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Github, Eye, EyeOff, Sparkles, ArrowRight, Check, Zap, Shield, Clock, Users, Star, TrendingUp, Code, Figma as FigmaIcon } from 'lucide-react'

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [language, setLanguage] = useState<'tr' | 'en'>('tr')

  const t = {
    tr: {
      title: 'Hoş Geldiniz',
      subtitle: 'Hesabınıza giriş yapın ve yapay zeka destekli kod üretimine başlayın',
      email: 'E-posta',
      password: 'Şifre',
      showPassword: 'Şifreyi göster',
      signIn: 'Giriş Yap',
      signingIn: 'Giriş yapılıyor...',
      or: 'veya',
      google: 'Google ile Giriş Yap',
      github: 'GitHub ile Giriş Yap',
      noAccount: 'Hesabınız yok mu?',
      signUp: 'Kayıt Ol',
      features: {
        title: 'Neden ScreenToCode?',
        item1: '3 ücretsiz deneme hakkı',
        item2: 'GPT-5 Vision + Claude Sonnet 4.5',
        item3: 'Figma, screenshot desteği',
        item4: 'HTML, React, Vue, Svelte export'
      },
      howToUse: {
        title: 'Nasıl Kullanılır?',
        step1: 'Giriş yapın',
        step1Desc: 'Google veya GitHub hesabınızla hızlıca giriş yapın',
        step2: 'Tasarım yükleyin',
        step2Desc: 'Figma bağlantısı veya ekran görüntüsü yükleyin',
        step3: 'Kodunuzu alın',
        step3Desc: 'Saniyeler içinde kodunuz hazır!'
      },
      benefits: {
        title: 'Platform Özellikleri',
        speed: 'Hızlı Üretim',
        speedDesc: 'Saniyeler içinde production-ready kod',
        quality: 'Yüksek Kalite',
        qualityDesc: 'Temiz, optimize edilmiş ve modern kod',
        support: '7/24 Destek',
        supportDesc: 'Sorularınız için her zaman hazırız',
        secure: 'Güvenli & Özel',
        secureDesc: 'Tasarımlarınız güvende kalır'
      },
      info: {
        title: 'Bilgi',
        description: 'ScreenToCode, tasarımlarınızı hızlıca koda dönüştüren bir yapay zeka aracıdır.'
      },
      freeTrialInfo: '3 ücretsiz deneme hakkı',
      error: 'Giriş başarısız. Lütfen tekrar deneyin.'
    },
    en: {
      title: 'Welcome Back',
      subtitle: 'Sign in to your account and start generating AI-powered code',
      email: 'Email',
      password: 'Password',
      showPassword: 'Show password',
      signIn: 'Sign In',
      signingIn: 'Signing in...',
      or: 'or',
      google: 'Sign in with Google',
      github: 'Sign in with GitHub',
      noAccount: 'Don\'t have an account?',
      signUp: 'Sign Up',
      features: {
        title: 'Why ScreenToCode?',
        item1: '3 free trial credits',
        item2: 'GPT-5 Vision + Claude Sonnet 4.5',
        item3: 'Figma, screenshot support',
        item4: 'Export as HTML, React, Vue, Svelte'
      },
      howToUse: {
        title: 'How to Use',
        step1: 'Sign in',
        step1Desc: 'Quickly sign in with your Google or GitHub account',
        step2: 'Upload design',
        step2Desc: 'Upload a Figma link or screenshot',
        step3: 'Get your code',
        step3Desc: 'Your code will be ready in seconds!'
      },
      benefits: {
        title: 'Platform Features',
        speed: 'Fast Generation',
        speedDesc: 'Production-ready code in seconds',
        quality: 'High Quality',
        qualityDesc: 'Clean, optimized and modern code',
        support: '24/7 Support',
        supportDesc: 'We are always ready for your questions',
        secure: 'Secure & Private',
        secureDesc: 'Your designs stay safe'
      },
      info: {
        title: 'Info',
        description: 'ScreenToCode is an AI tool that converts your designs into code quickly.'
      },
      freeTrialInfo: '3 free trial credits',
      error: 'Sign in failed. Please try again.'
    }
  }

  const content = t[language]

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError(content.error)
        setLoading(false)
      } else {
        // 5 saniye loading göster
        setTimeout(() => {
          router.push('/app')
        }, 5000)
      }
    } catch (err) {
      setError(content.error)
      setLoading(false)
    }
  }

  const handleSocialSignIn = async (provider: 'google' | 'github') => {
    setLoading(true)
    try {
      await signIn(provider, { callbackUrl: '/app' })
      // 5 saniye loading göster (sosyal giriş için redirect olacağından otomatik gösteriliyor)
    } catch (err) {
      setError(content.error)
      setLoading(false)
    }
  }

  // Custom cursor tracking
  useEffect(() => {
    const cursor = document.getElementById('cursor')
    const trail1 = document.getElementById('cursor-trail-1')
    const trail2 = document.getElementById('cursor-trail-2')
    const trail3 = document.getElementById('cursor-trail-3')
    const trail4 = document.getElementById('cursor-trail-4')
    let mouseX = 0
    let mouseY = 0
    let trail1X = 0, trail1Y = 0
    let trail2X = 0, trail2Y = 0
    let trail3X = 0, trail3Y = 0
    let trail4X = 0, trail4Y = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (cursor) {
        cursor.style.left = `${mouseX - 12}px`
        cursor.style.top = `${mouseY - 12}px`
      }
    }

    const animateTrail = () => {
      trail1X += (mouseX - trail1X) * 0.25
      trail1Y += (mouseY - trail1Y) * 0.25
      
      trail2X += (trail1X - trail2X) * 0.2
      trail2Y += (trail1Y - trail2Y) * 0.2
      
      trail3X += (trail2X - trail3X) * 0.15
      trail3Y += (trail2Y - trail3Y) * 0.15
      
      trail4X += (trail3X - trail4X) * 0.1
      trail4Y += (trail3Y - trail4Y) * 0.1
      
      if (trail1) {
        trail1.style.left = `${trail1X - 10}px`
        trail1.style.top = `${trail1Y - 10}px`
      }
      if (trail2) {
        trail2.style.left = `${trail2X - 8}px`
        trail2.style.top = `${trail2Y - 8}px`
      }
      if (trail3) {
        trail3.style.left = `${trail3X - 6}px`
        trail3.style.top = `${trail3Y - 6}px`
      }
      if (trail4) {
        trail4.style.left = `${trail4X - 4}px`
        trail4.style.top = `${trail4Y - 4}px`
      }
      
      requestAnimationFrame(animateTrail)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animateTrail()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        body {
          cursor: none !important;
        }
      `}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[10000] flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 mx-auto animate-pulse">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <div className="text-2xl font-black text-white mb-2">ScreenToCode</div>
              <div className="text-gray-400 text-sm">{content.signingIn}</div>
            </div>
          </div>
        )}
        {/* Custom Cursor */}
        <div id="cursor" className="fixed w-6 h-6 pointer-events-none z-[9999]">
          <div className="absolute inset-0 bg-purple-500 rounded-full blur-sm" />
          <div className="absolute inset-0 bg-pink-400 rounded-full blur-md opacity-70" />
        </div>
        {/* Cursor Trail */}
        <div id="cursor-trail-1" className="fixed w-5 h-5 pointer-events-none z-[9997]">
          <div className="absolute inset-0 bg-purple-400 rounded-full blur-sm opacity-60" />
        </div>
        <div id="cursor-trail-2" className="fixed w-4 h-4 pointer-events-none z-[9996]">
          <div className="absolute inset-0 bg-purple-400 rounded-full blur-sm opacity-45" />
        </div>
        <div id="cursor-trail-3" className="fixed w-4 h-4 pointer-events-none z-[9995]">
          <div className="absolute inset-0 bg-pink-400 rounded-full blur-sm opacity-30" />
        </div>
        <div id="cursor-trail-4" className="fixed w-3 h-3 pointer-events-none z-[9994]">
          <div className="absolute inset-0 bg-pink-300 rounded-full blur-sm opacity-20" />
        </div>

        {/* Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '700ms' }} />
        </div>

      {/* Language Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-1">
          <button
            onClick={() => setLanguage('tr')}
            className={`px-3 py-1.5 rounded-md text-sm font-bold transition ${
              language === 'tr' 
                ? 'bg-white text-purple-600' 
                : 'text-white/70 hover:text-white'
            }`}
          >
            🇹🇷 TR
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-3 py-1.5 rounded-md text-sm font-bold transition ${
              language === 'en' 
                ? 'bg-white text-purple-600' 
                : 'text-white/70 hover:text-white'
            }`}
          >
            🇺🇸 EN
          </button>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Left Side - Professional Branding */}
        <div className="hidden lg:block space-y-8">
          <Link href="/landing" className="inline-flex items-center gap-3 group">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-7 h-7 text-white group-hover:rotate-180 transition-all duration-700" />
            </div>
            <div>
              <span className="text-3xl font-black text-white block">ScreenToCode</span>
              <span className="text-xs text-purple-300 font-semibold">AI-POWERED DESIGN TO CODE</span>
            </div>
          </Link>

          <div>
            <h1 className="text-5xl font-black text-white mb-4 leading-tight">
              {content.title}
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {content.subtitle}
            </p>

            {/* Quick Features with Icons */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: Zap, text: content.features.item1 },
                { icon: Sparkles, text: content.features.item2 },
                { icon: FigmaIcon, text: content.features.item3 },
                { icon: Code, text: content.features.item4 },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                    <feature.icon className="w-4 h-4 text-purple-300" />
                  </div>
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Detailed Benefits */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-bold text-white mb-4">{content.benefits.title}</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Zap, title: content.benefits.speed, desc: content.benefits.speedDesc },
                  { icon: Shield, title: content.benefits.quality, desc: content.benefits.qualityDesc },
                  { icon: Clock, title: content.benefits.support, desc: content.benefits.supportDesc },
                  { icon: Shield, title: content.benefits.secure, desc: content.benefits.secureDesc },
                ].map((benefit, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <benefit.icon className="w-4 h-4 text-purple-400" />
                      <span className="text-sm font-bold text-white">{benefit.title}</span>
                    </div>
                    <p className="text-xs text-gray-400">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">{content.info.title}</h3>
              <p className="text-gray-300 mb-4 text-sm">{content.info.description}</p>
              <div className="flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-lg px-3 py-2">
                <Sparkles className="w-4 h-4 text-purple-300" />
                <span className="text-white text-sm">{content.freeTrialInfo}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="lg:hidden mb-8 text-center">
            <Link href="/landing" className="inline-flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black text-white">ScreenToCode</span>
            </Link>
            <h2 className="text-3xl font-black text-white mb-2">{content.title}</h2>
            <p className="text-gray-300">{content.subtitle}</p>
          </div>

          {/* Social Sign In Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialSignIn('google')}
              disabled={loading}
              className="w-full bg-white hover:bg-gray-50 text-gray-900 py-4 rounded-xl font-semibold transition flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              <Mail className="w-5 h-5 text-red-500" />
              {content.google}
            </button>

            <button
              onClick={() => handleSocialSignIn('github')}
              disabled={loading}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-xl font-semibold transition flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed border border-white/10"
            >
              <Github className="w-5 h-5" />
              {content.github}
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/5 text-gray-400 font-medium">{content.or}</span>
            </div>
          </div>

          {/* Email Sign In Form */}
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                {content.email}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                {content.password}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-xl font-bold text-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 shadow-lg shadow-purple-500/50"
            >
              {loading ? content.signingIn : content.signIn}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-gray-400 mt-6">
            {content.noAccount}{' '}
            <Link href="/auth/signup" className="text-purple-400 hover:text-purple-300 font-semibold">
              {content.signUp}
            </Link>
          </p>

          {/* How to use steps */}
          <div className="mt-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">{content.howToUse.title}</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-300 font-bold">1</span>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{content.howToUse.step1}</div>
                  <div className="text-gray-400 text-xs">{content.howToUse.step1Desc}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-300 font-bold">2</span>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{content.howToUse.step2}</div>
                  <div className="text-gray-400 text-xs">{content.howToUse.step2Desc}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-300 font-bold">3</span>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{content.howToUse.step3}</div>
                  <div className="text-gray-400 text-xs">{content.howToUse.step3Desc}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
    </>
  )
}
