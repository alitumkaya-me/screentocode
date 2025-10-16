'use client'

import { signIn } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Github, Eye, EyeOff, Sparkles, ArrowRight, User, Check, Zap, Shield, Clock, Users, Star, TrendingUp, Code, Figma as FigmaIcon, Gift, Rocket } from 'lucide-react'

export default function SignUpPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [language, setLanguage] = useState<'tr' | 'en'>('tr')

  const t = {
    tr: {
      title: 'Hesap Oluştur',
      subtitle: 'Ücretsiz hesap oluşturun ve 3 deneme hakkının keyfini çıkarın',
      name: 'Ad Soyad',
      email: 'E-posta',
      password: 'Şifre',
      passwordHint: 'En az 8 karakter',
      showPassword: 'Şifreyi göster',
      signUp: 'Hesap Oluştur',
      signingUp: 'Oluşturuluyor...',
      or: 'veya',
      google: 'Google ile Kayıt Ol',
      github: 'GitHub ile Kayıt Ol',
      hasAccount: 'Zaten hesabınız var mı?',
      signIn: 'Giriş Yap',
      benefits: {
        title: 'Ücretsiz Plana Dahil',
        item1: '3 kod üretimi/ay',
        item2: 'Tüm AI modelleri',
        item3: 'Demo tasarımlar',
        item4: 'HTML export'
      },
      howToUse: {
        title: 'Nasıl Kullanılır?',
        step1: 'Kayıt olun',
        step1Desc: 'Hızlıca hesabınızı oluşturun',
        step2: 'Tasarım yükleyin',
        step2Desc: 'Figma bağlantısı veya ekran görüntüsü yükleyin',
        step3: 'Kodunuzu alın',
        step3Desc: 'Saniyeler içinde kodunuz hazır!'
      },
      whyJoin: {
        title: 'Neden Katılmalısınız?',
        instant: 'Anında Başlayın',
        instantDesc: 'Kredi kartı gerektirmez, hemen kullanın',
        trial: 'Ücretsiz Deneme',
        trialDesc: '3 tam özellikli kod üretimi',
        upgrade: 'Her Zaman Yükseltebilirsiniz',
        upgradeDesc: 'İhtiyacınız olduğunda premium’a geçin'
      },
      features: {
        ai: 'En Güçlü AI',
        aiDesc: 'GPT-5 Vision + Claude Sonnet 4.5',
        multi: 'Çoklu Framework',
        multiDesc: 'React, Vue, Svelte, HTML',
        fast: 'Süper Hızlı',
        fastDesc: '5 dakika içinde production-ready',
        support: 'Premium Destek',
        supportDesc: '7/24 yardım ve dokümantasyon'
      },
      error: 'Kayıt başarısız. Lütfen tekrar deneyin.',
      terms: 'Kaydolarak',
      termsLink: 'Kullanım Şartları',
      and: 've',
      privacyLink: 'Gizlilik Politikası',
      accept: 'kabul ediyorsunuz'
    },
    en: {
      title: 'Create Account',
      subtitle: 'Create a free account and enjoy 3 trial credits',
      name: 'Full Name',
      email: 'Email',
      password: 'Password',
      passwordHint: 'At least 8 characters',
      showPassword: 'Show password',
      signUp: 'Sign Up',
      signingUp: 'Creating...',
      or: 'or',
      google: 'Sign up with Google',
      github: 'Sign up with GitHub',
      hasAccount: 'Already have an account?',
      signIn: 'Sign In',
      benefits: {
        title: 'Free Plan Includes',
        item1: '3 generations/month',
        item2: 'All AI models',
        item3: 'Demo designs',
        item4: 'HTML export'
      },
      howToUse: {
        title: 'How to Use',
        step1: 'Sign up',
        step1Desc: 'Create your account quickly',
        step2: 'Upload design',
        step2Desc: 'Upload a Figma link or screenshot',
        step3: 'Get your code',
        step3Desc: 'Your code will be ready in seconds!'
      },
      whyJoin: {
        title: 'Why Join Us?',
        instant: 'Start Instantly',
        instantDesc: 'No credit card required, use immediately',
        trial: 'Free Trial',
        trialDesc: '3 full-featured code generations',
        upgrade: 'Upgrade Anytime',
        upgradeDesc: 'Switch to premium when you need it'
      },
      features: {
        ai: 'Most Powerful AI',
        aiDesc: 'GPT-5 Vision + Claude Sonnet 4.5',
        multi: 'Multi Framework',
        multiDesc: 'React, Vue, Svelte, HTML',
        fast: 'Super Fast',
        fastDesc: 'Production-ready in 5 minutes',
        support: 'Premium Support',
        supportDesc: '24/7 help and documentation'
      },
      error: 'Sign up failed. Please try again.',
      terms: 'By signing up, you agree to our',
      termsLink: 'Terms of Service',
      and: 'and',
      privacyLink: 'Privacy Policy',
      accept: ''
    }
  }

  const content = t[language]

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Mock sign up - gerçek uygulamada API endpoint'e istek atılmalı
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

  const handleSocialSignUp = async (provider: 'google' | 'github') => {
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
              <div className="text-gray-400 text-sm">{content.signingUp}</div>
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
        {/* Left Side - Professional Benefits */}
        <div className="hidden lg:block space-y-8">
          <Link href="/landing" className="inline-flex items-center gap-3 group">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-7 h-7 text-white group-hover:rotate-180 transition-all duration-700" />
            </div>
            <div>
              <span className="text-3xl font-black text-white block">ScreenToCode</span>
              <span className="text-xs text-purple-300 font-semibold">START FOR FREE TODAY</span>
            </div>
          </Link>

          <div>
            <h1 className="text-5xl font-black text-white mb-4 leading-tight">
              {content.title}
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {content.subtitle}
            </p>

            {/* Why Join Cards */}
            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-bold text-white mb-4">{content.whyJoin.title}</h3>
              {[
                { icon: Gift, title: content.whyJoin.instant, desc: content.whyJoin.instantDesc },
                { icon: Rocket, title: content.whyJoin.trial, desc: content.whyJoin.trialDesc },
                { icon: TrendingUp, title: content.whyJoin.upgrade, desc: content.whyJoin.upgradeDesc },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-bold mb-1">{item.title}</div>
                      <div className="text-sm text-gray-400">{item.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Features Grid */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Sparkles, title: content.features.ai, desc: content.features.aiDesc },
                  { icon: Code, title: content.features.multi, desc: content.features.multiDesc },
                  { icon: Zap, title: content.features.fast, desc: content.features.fastDesc },
                  { icon: Shield, title: content.features.support, desc: content.features.supportDesc },
                ].map((feature, i) => (
                  <div key={i} className="text-center">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <feature.icon className="w-6 h-6 text-purple-300" />
                    </div>
                    <div className="text-white font-bold text-sm mb-1">{feature.title}</div>
                    <div className="text-xs text-gray-400">{feature.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Free Benefits List */}
            <div className="mt-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <h4 className="text-sm font-bold text-white mb-3">{content.benefits.title}</h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  content.benefits.item1,
                  content.benefits.item2,
                  content.benefits.item3,
                  content.benefits.item4
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
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

          {/* Social Sign Up Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialSignUp('google')}
              disabled={loading}
              className="w-full bg-white hover:bg-gray-50 text-gray-900 py-4 rounded-xl font-semibold transition flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              <Mail className="w-5 h-5 text-red-500" />
              {content.google}
            </button>

            <button
              onClick={() => handleSocialSignUp('github')}
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

          {/* Email Sign Up Form */}
          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                {content.name}
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                {content.email}
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                />
              </div>
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
                  minLength={8}
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
              <p className="text-xs text-gray-500 mt-1">{content.passwordHint}</p>
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
              {loading ? content.signingUp : content.signUp}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          {/* Terms */}
          <p className="text-center text-xs text-gray-500 mt-4">
            {content.terms}{' '}
            <Link href="/terms" className="text-purple-400 hover:text-purple-300">
              {content.termsLink}
            </Link>
            {' '}{content.and}{' '}
            <Link href="/privacy" className="text-purple-400 hover:text-purple-300">
              {content.privacyLink}
            </Link>
            {content.accept && ` ${content.accept}`}
          </p>

          {/* Sign In Link */}
          <p className="text-center text-gray-400 mt-6">
            {content.hasAccount}{' '}
            <Link href="/auth/signin" className="text-purple-400 hover:text-purple-300 font-semibold">
              {content.signIn}
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
