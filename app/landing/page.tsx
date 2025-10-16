'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { 
  Sparkles, Zap, Code, Palette, Download, Shield, CheckCircle, Star, 
  ArrowRight, Layers, Clock, Users, TrendingUp, Github, Twitter, Linkedin,
  Menu, X, ChevronRight, Play, Rocket, Award, BarChart3, Upload, Code2, Globe,
  Moon, Sun
} from 'lucide-react'
import { type Language, useTranslation, formatPrice } from '@/lib/i18n'

export default function LandingPage() {
  const router = useRouter()
  const [language, setLanguage] = useState<Language>('tr')
  const [isLoading, setIsLoading] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  
  const t = useTranslation(language)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  // Neural Network Effect
  useEffect(() => {
    const canvas = document.getElementById('neural-canvas') as HTMLCanvasElement
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Neural network nodes (neurons)
    const neurons: {
      x: number
      y: number
      vx: number
      vy: number
      connections: number[]
      activated: boolean
      activationLevel: number
    }[] = []

    const numNeurons = 80
    const connectionDistance = 200
    const activationDistance = 150
    let mouseX = canvas.width / 2
    let mouseY = canvas.height / 2

    // Create neurons with random positions and velocities
    for (let i = 0; i < numNeurons; i++) {
      neurons.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        connections: [],
        activated: false,
        activationLevel: 0
      })
    }

    // Calculate connections between neurons
    const updateConnections = () => {
      neurons.forEach((neuron, i) => {
        neuron.connections = []
        neurons.forEach((other, j) => {
          if (i !== j) {
            const dx = other.x - neuron.x
            const dy = other.y - neuron.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            
            if (distance < connectionDistance) {
              neuron.connections.push(j)
            }
          }
        })
      })
    }

    updateConnections()

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const isDark = document.documentElement.classList.contains('dark')

      // Update neuron positions (slow drift)
      neurons.forEach(neuron => {
        neuron.x += neuron.vx
        neuron.y += neuron.vy

        // Bounce off edges
        if (neuron.x < 0 || neuron.x > canvas.width) neuron.vx *= -1
        if (neuron.y < 0 || neuron.y > canvas.height) neuron.vy *= -1

        // Keep in bounds
        neuron.x = Math.max(0, Math.min(canvas.width, neuron.x))
        neuron.y = Math.max(0, Math.min(canvas.height, neuron.y))

        // Check activation by mouse proximity
        const dx = mouseX - neuron.x
        const dy = mouseY - neuron.y
        const distToMouse = Math.sqrt(dx * dx + dy * dy)

        if (distToMouse < activationDistance) {
          neuron.activated = true
          neuron.activationLevel = Math.min(1, neuron.activationLevel + 0.1)
        } else {
          neuron.activated = false
          neuron.activationLevel = Math.max(0, neuron.activationLevel - 0.05)
        }
      })

      // Periodically update connections
      if (Math.random() < 0.01) {
        updateConnections()
      }

      // Draw connections (synapses)
      neurons.forEach((neuron, i) => {
        neuron.connections.forEach(targetIndex => {
          const target = neurons[targetIndex]
          const dx = target.x - neuron.x
          const dy = target.y - neuron.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Calculate connection strength based on activation
          const strength = (neuron.activationLevel + target.activationLevel) / 2
          const baseAlpha = isDark ? 0.04 : 0.03
          const alpha = baseAlpha + strength * 0.2

          // Draw connection
          const gradient = ctx.createLinearGradient(neuron.x, neuron.y, target.x, target.y)
          
          if (isDark) {
            gradient.addColorStop(0, `rgba(139, 92, 246, ${alpha})`)
            gradient.addColorStop(0.5, `rgba(168, 85, 247, ${alpha + 0.1})`)
            gradient.addColorStop(1, `rgba(139, 92, 246, ${alpha})`)
          } else {
            gradient.addColorStop(0, `rgba(147, 51, 234, ${alpha})`)
            gradient.addColorStop(0.5, `rgba(168, 85, 247, ${alpha + 0.1})`)
            gradient.addColorStop(1, `rgba(147, 51, 234, ${alpha})`)
          }

          ctx.strokeStyle = gradient
          ctx.lineWidth = strength > 0.3 ? 2 : 1
          ctx.beginPath()
          ctx.moveTo(neuron.x, neuron.y)
          ctx.lineTo(target.x, target.y)
          ctx.stroke()

          // Draw signal particles on active connections
          if (strength > 0.5) {
            const progress = (Date.now() % 2000) / 2000
            const particleX = neuron.x + dx * progress
            const particleY = neuron.y + dy * progress

            ctx.fillStyle = isDark ? 'rgba(192, 132, 252, 0.8)' : 'rgba(168, 85, 247, 0.8)'
            ctx.beginPath()
            ctx.arc(particleX, particleY, 2, 0, Math.PI * 2)
            ctx.fill()
          }
        })
      })

      // Draw neurons
      neurons.forEach(neuron => {
        const size = 3 + neuron.activationLevel * 5

        // Outer glow when activated
        if (neuron.activationLevel > 0) {
          const glowSize = size + 8
          const gradient = ctx.createRadialGradient(neuron.x, neuron.y, 0, neuron.x, neuron.y, glowSize)
          
          if (isDark) {
            gradient.addColorStop(0, `rgba(168, 85, 247, ${neuron.activationLevel * 0.3})`)
            gradient.addColorStop(0.5, `rgba(139, 92, 246, ${neuron.activationLevel * 0.15})`)
            gradient.addColorStop(1, 'rgba(168, 85, 247, 0)')
          } else {
            gradient.addColorStop(0, `rgba(147, 51, 234, ${neuron.activationLevel * 0.25})`)
            gradient.addColorStop(0.5, `rgba(168, 85, 247, ${neuron.activationLevel * 0.12})`)
            gradient.addColorStop(1, 'rgba(147, 51, 234, 0)')
          }

          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(neuron.x, neuron.y, glowSize, 0, Math.PI * 2)
          ctx.fill()
        }

        // Main neuron body
        ctx.fillStyle = neuron.activationLevel > 0
          ? (isDark ? `rgba(192, 132, 252, ${0.4 + neuron.activationLevel * 0.2})` : `rgba(168, 85, 247, ${0.4 + neuron.activationLevel * 0.2})`)
          : (isDark ? 'rgba(139, 92, 246, 0.25)' : 'rgba(147, 51, 234, 0.25)')
        
        ctx.beginPath()
        ctx.arc(neuron.x, neuron.y, size, 0, Math.PI * 2)
        ctx.fill()

        // Inner highlight
        if (neuron.activationLevel > 0.5) {
          ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.4)'
          ctx.beginPath()
          ctx.arc(neuron.x, neuron.y, size * 0.4, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      requestAnimationFrame(animate)
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      
      // Reposition neurons proportionally
      neurons.forEach(neuron => {
        neuron.x = Math.min(neuron.x, canvas.width)
        neuron.y = Math.min(neuron.y, canvas.height)
      })
      
      updateConnections()
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [isDarkMode])

  const handleCheckout = async (plan: string) => {
    setIsLoading(true)
    try {
      const response = await axios.post('/api/iyzico/checkout', {
        plan,
        userEmail: 'user@example.com',
        userName: 'Test User',
      })

      if (response.data.success && response.data.paymentPageUrl) {
        window.location.href = response.data.paymentPageUrl
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Ödeme başlatılamadı. Lütfen tekrar deneyin.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <style jsx global>{`
        * {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 2L16 10L9 11L6 16L2 2Z" fill="%23a855f7" stroke="%23ffffff" stroke-width="1"/></svg>') 2 2, auto !important;
        }
        
        body {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 2L16 10L9 11L6 16L2 2Z" fill="%23a855f7" stroke="%23ffffff" stroke-width="1"/></svg>') 2 2, auto !important;
        }
        
        button, a, [role="button"] {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 2L16 10L9 11L6 16L2 2Z" fill="%23c084fc" stroke="%23ffffff" stroke-width="1"/></svg>') 2 2, pointer !important;
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.2s both;
        }
        
        /* Text overflow fix */
        h1, h2, h3, h4, h5, h6, p, span, a, button {
          overflow: visible !important;
          line-height: 1.4 !important;
        }
      `}</style>
      
      <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden transition-colors duration-300">
      {/* Neural Network Background */}
      <div className="fixed inset-0 z-0">
        {/* Canvas for neural network */}
        <canvas 
          id="neural-canvas" 
          className="absolute inset-0 w-full h-full"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 dark:bg-gradient-to-b dark:from-black/40 dark:via-transparent dark:to-black/60 bg-gradient-to-b from-white/50 via-transparent to-white/70 pointer-events-none" />
      </div>

      {/* Header */}
      <header className={`fixed top-0 w-full z-[60] transition-all duration-300 pointer-events-auto ${scrollY > 50 ? 'bg-white/80 dark:bg-black/60 backdrop-blur-xl border-b border-gray-200 dark:border-white/5' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => router.push('/landing')}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 blur-xl opacity-60 group-hover:opacity-100 transition-all duration-300" />
                <Sparkles className="w-9 h-9 text-purple-400 relative z-10 group-hover:rotate-180 transition-all duration-700" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  ScreenToCode
                </span>
                <span className="text-[10px] text-gray-500 -mt-1 font-medium tracking-wider">AI POWERED</span>
              </div>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden lg:flex gap-10 items-center">
              {[
                { label: language === 'tr' ? t.navFeatures : t.navFeatures, id: 'features' },
                { label: language === 'tr' ? t.navPricing : t.navPricing, id: 'pricing' },
                { label: language === 'tr' ? t.navHowItWorks : t.navHowItWorks, id: 'how-it-works' },
                { label: language === 'tr' ? t.navFAQ : t.navFAQ, id: 'faq' },
              ].map((item, i) => (
                <a 
                  key={i}
                  href={`#${item.id}`} 
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-110 font-medium relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </nav>
            
            {/* Right side controls */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language Switcher - Kompakt */}
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg p-0.5">
                <button
                  onClick={() => setLanguage('tr')}
                  className={`px-3 py-1 rounded text-xs font-bold transition ${
                    language === 'tr' 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  TR
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded text-xs font-bold transition ${
                    language === 'en' 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Dark Mode Toggle - Kompakt */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-300 dark:border-white/10 rounded-lg transition"
                title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 text-yellow-500" />
                ) : (
                  <Moon className="w-4 h-4 text-purple-600" />
                )}
              </button>
              
              {/* Sign In Button */}
              <button
                onClick={() => router.push('/auth/signin')}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-4 py-2 rounded-lg font-semibold transition hover:scale-105 border border-gray-300 dark:border-white/10 hover:border-purple-500"
              >
                {language === 'tr' ? 'Giriş Yap' : 'Sign In'}
              </button>
              
              {/* CTA Button - %100 Ücretsiz ekli */}
              <button
                onClick={() => router.push('/app')}
                className="relative group overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white px-6 py-2.5 rounded-xl font-bold transition hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Rocket className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                  <span className="flex flex-col items-start leading-tight">
                    <span className="text-sm">{language === 'tr' ? 'Hemen Dene' : 'Try Now'}</span>
                    <span className="text-[10px] opacity-90">{language === 'tr' ? '%100 Ücretsiz' : '100% Free'}</span>
                  </span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 dark:bg-black/95 backdrop-blur-2xl border-t border-gray-200/50 dark:border-white/5">
            <div className="container mx-auto px-6 py-6 space-y-4">
              {[
                { label: language === 'tr' ? t.navFeatures : t.navFeatures, id: 'features' },
                { label: language === 'tr' ? t.navPricing : t.navPricing, id: 'pricing' },
                { label: language === 'tr' ? t.navHowItWorks : t.navHowItWorks, id: 'how-it-works' },
                { label: language === 'tr' ? t.navFAQ : t.navFAQ, id: 'faq' },
              ].map((item, i) => (
                <a 
                  key={i}
                  href={`#${item.id}`}
                  className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              
              {/* Mobile Dark Mode Toggle */}
              <div className="flex items-center justify-between py-2 border-t border-white/10 mt-4 pt-4">
                <span className="text-gray-400 text-sm font-medium">
                  {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                </span>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
                >
                  {isDarkMode ? (
                    <Sun className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-purple-400" />
                  )}
                </button>
              </div>
              
              <button
                onClick={() => { router.push('/app'); setMobileMenuOpen(false); }}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-bold"
              >
                Ücretsiz Başla
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-20 px-6 z-10">
        <div className="container mx-auto text-center max-w-6xl">
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 backdrop-blur-sm border border-purple-500/30 dark:border-purple-500/20 px-6 py-3 rounded-full mb-10 hover:scale-105 transition-all duration-300 cursor-pointer group"
          >
            <div className="relative">
              <Sparkles className="w-5 h-5 text-purple-400 group-hover:rotate-12 transition-transform" />
              <div className="absolute inset-0 bg-purple-400 blur-md opacity-50" />
            </div>
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-700 via-pink-700 to-blue-700 dark:from-purple-300 dark:via-pink-300 dark:to-blue-300 bg-clip-text text-transparent">
              {t.heroTag}
            </span>
            <div className="flex gap-1 items-center">
              <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-green-600 dark:text-green-400 font-bold">{t.heroLive}</span>
            </div>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.05] tracking-tight">
            <span className="block text-gray-900 dark:text-white mb-3">{t.heroTitle1}</span>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              {t.heroTitle2}
            </span>
            <span className="block text-gray-900 dark:text-white mt-3">{t.heroTitle3}</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-14 max-w-4xl mx-auto leading-relaxed">
            {t.heroSubtitle1}
            <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-bold"> {t.heroSubtitle2} </span>
            {t.heroSubtitle3}
            <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-bold"> {t.heroSubtitle4} </span>
            {t.heroSubtitle5}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-20">
            <button
              onClick={() => router.push('/app')}
              className="group relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-500 hover:via-pink-500 hover:to-blue-500 text-white px-12 py-6 rounded-2xl text-lg font-black transition-all duration-300 hover:scale-110 hover:shadow-[0_0_60px_rgba(168,85,247,0.8)] animate-pulse hover:animate-none"
            >
              <div className="relative z-10 flex items-center justify-center gap-3">
                <Zap className="w-7 h-7 group-hover:rotate-12 group-hover:scale-125 transition-transform duration-300" />
                <span>{t.heroCTA1}</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform duration-300" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            </button>
            
            <button
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative overflow-hidden bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 backdrop-blur-sm text-gray-900 dark:text-white px-12 py-6 rounded-2xl text-lg font-black transition-all duration-300 hover:scale-105 border-2 border-gray-300 dark:border-white/10 hover:border-purple-500 dark:hover:border-purple-500/50 flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-purple-500/30"
            >
              <TrendingUp className="w-6 h-6 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" />
              {t.heroCTA2}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Users, label: '15,000+', sublabel: t.heroStats2Label, color: 'from-purple-500 to-pink-500' },
              { icon: Code, label: '250K+', sublabel: t.heroStats1Label, color: 'from-pink-500 to-red-500' },
              { icon: Clock, label: '< 15sn', sublabel: t.heroStats3Label, color: 'from-blue-500 to-cyan-500' },
              { icon: Star, label: '4.9/5', sublabel: language === 'tr' ? 'Kullanıcı Puanı' : 'User Rating', color: 'from-yellow-500 to-orange-500' },
            ].map((stat, i) => (
              <div 
                key={i}
                className="group relative bg-white dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-2xl p-8 hover:bg-gray-50 dark:hover:bg-white/[0.05] transition-all duration-300 hover:scale-105 hover:border-purple-400 dark:hover:border-purple-500/30 hover:shadow-xl shadow-gray-200/50 dark:shadow-none"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl" />
                <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-black text-gray-900 dark:text-white mb-2">{stat.label}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32 px-6 z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <div className="inline-block bg-purple-500/10 border border-purple-500/30 dark:border-purple-500/20 px-4 py-2 rounded-full mb-6">
              <span className="text-purple-600 dark:text-purple-400 font-bold text-sm">{t.featuresTag}</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
              {t.featuresTitle1}
              <span className="block bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent mt-2">
                {t.featuresTitle2}
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t.featuresSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: Zap, 
                title: t.feature1Title, 
                desc: t.feature1Desc,
                color: 'from-yellow-500 to-orange-500',
              },
              { 
                icon: Code, 
                title: t.feature2Title, 
                desc: t.feature2Desc,
                color: 'from-blue-500 to-cyan-500',
              },
              { 
                icon: Sparkles, 
                title: t.feature3Title, 
                desc: t.feature3Desc,
                color: 'from-purple-500 to-pink-500',
              },
              { 
                icon: Palette, 
                title: t.feature4Title, 
                desc: t.feature4Desc,
                color: 'from-pink-500 to-red-500',
              },
              { 
                icon: Layers, 
                title: t.feature5Title, 
                desc: t.feature5Desc,
                color: 'from-green-500 to-emerald-500',
              },
              { 
                icon: Download, 
                title: t.feature6Title, 
                desc: t.feature6Desc,
                color: 'from-indigo-500 to-purple-500',
              },
            ].map((feature, i) => (
              <div 
                key={i}
                className="group relative bg-white dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-3xl p-8 hover:bg-gray-50 dark:hover:bg-white/[0.05] transition-all duration-500 hover:scale-105 hover:border-purple-400 dark:hover:border-purple-500/30 hover:shadow-2xl shadow-gray-200/50 dark:shadow-none dark:hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/5 group-hover:to-blue-500/5 rounded-3xl transition-all duration-500" />
                
                <div className={`relative bg-gradient-to-br ${feature.color} p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 dark:group-hover:from-purple-400 dark:group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative py-32 px-6 z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <div className="inline-block bg-blue-500/10 border border-blue-500/30 dark:border-blue-500/20 px-4 py-2 rounded-full mb-6">
              <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">{t.pricingSectionTag}</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
              {t.pricingSectionTitle1}
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mt-2">
                {t.pricingSectionTitle2}
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t.pricingSectionSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="group relative bg-white dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-3xl p-8 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 hover:shadow-xl shadow-gray-200/50 dark:shadow-none">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t.pricingFreeTitle}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t.pricingFreeDesc}</p>
              </div>
              
              <div className="mb-8">
                <span className="text-5xl font-black text-gray-900 dark:text-white">{formatPrice(0, language)}</span>
                <span className="text-gray-600 dark:text-gray-400 ml-2">{t.pricingPerMonth}</span>
              </div>

              <ul className="space-y-4 mb-10">
                {[
                  t.pricingFree1,
                  t.pricingFree2,
                  t.pricingFree3,
                  t.pricingFree4
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => router.push('/app')}
                className="w-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white py-4 rounded-xl font-bold transition-all duration-300 border border-gray-300 dark:border-white/10 hover:scale-105"
              >
                {t.pricingFreeButton}
              </button>
            </div>

            {/* Pro Plan - Featured */}
            <div className="group relative scale-105 z-10">
              {/* Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
              
              <div className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-3xl p-[2px]">
                <div className="bg-black rounded-3xl p-8">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs font-black px-6 py-2 rounded-full flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      {t.pricingProPopular}
                    </div>
                  </div>

                  <div className="mb-8 mt-4">
                    <h3 className="text-2xl font-bold text-white mb-2">{t.pricingProTitle}</h3>
                    <p className="text-purple-200">{t.pricingProDesc}</p>
                  </div>
                  
                  <div className="mb-8">
                    <span className="text-5xl font-black bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">₺699</span>
                    <span className="text-purple-200 ml-2">/ay</span>
                  </div>

                  <ul className="space-y-4 mb-10">
                    {[
                      t.pricingPro1,
                      t.pricingPro2,
                      t.pricingPro3,
                      t.pricingPro4,
                      t.pricingPro5,
                      t.pricingPro6
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-white">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleCheckout('pro')}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-white to-purple-100 hover:from-purple-100 hover:to-white text-purple-600 py-4 rounded-xl font-black transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-3 border-purple-600/30 border-t-purple-600 rounded-full animate-spin" />
                        {language === 'tr' ? 'Yükleniyor...' : 'Loading...'}
                      </>
                    ) : (
                      <>
                        <Rocket className="w-5 h-5" />
                        {t.pricingUpgradePro}
                        <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/*ENterprise Plan */}
            <div className="group relative bg-white dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-3xl p-8 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 hover:shadow-xl shadow-gray-200/50 dark:shadow-none">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t.pricingEnterpriseTitle}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t.pricingEnterpriseDesc}</p>
              </div>
              
              <div className="mb-8">
                <span className="text-5xl font-black text-gray-900 dark:text-white">{formatPrice(100, language)}</span>
                <span className="text-gray-600 dark:text-gray-400 ml-2">{t.pricingPerMonth}</span>
              </div>

              <ul className="space-y-4 mb-10">
                {[
                  t.pricingEnterprise1,
                  t.pricingEnterprise2,
                  t.pricingEnterprise3,
                  t.pricingEnterprise4,
                  t.pricingEnterprise5,
                  t.pricingEnterprise6
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCheckout('enterprise')}
                className="w-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white py-4 rounded-xl font-bold transition-all duration-300 border border-gray-300 dark:border-white/10 hover:scale-105"
              >
                {t.pricingEnterpriseButton}
              </button>
            </div>
          </div>

          {/* Money Back Guarantee */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/30 dark:border-green-500/20 px-6 py-3 rounded-full">
              <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-green-700 dark:text-green-400 font-bold">{t.pricingGuarantee}</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative py-32 px-6 z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <div className="inline-block bg-blue-500/10 border border-blue-500/30 dark:border-blue-500/20 px-4 py-2 rounded-full mb-6">
              <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">{t.howItWorksTag}</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
              {t.howItWorksTitle1}
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mt-2">
                {t.howItWorksTitle2}
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t.howItWorksSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: '01',
                icon: Upload,
                title: t.step1Title,
                desc: t.step1Desc,
                color: 'from-purple-500 to-pink-500'
              },
              {
                step: '02',
                icon: Sparkles,
                title: t.step2Title,
                desc: t.step2Desc,
                color: 'from-pink-500 to-orange-500'
              },
              {
                step: '03',
                icon: Code2,
                title: t.step3Title,
                desc: t.step3Desc,
                color: 'from-orange-500 to-yellow-500'
              }
            ].map((item, i) => (
              <div key={i} className="relative group">
                {/* Connecting Line (except last) */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-purple-500/30 to-transparent" />
                )}
                
                <div className="relative bg-white dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-3xl p-8 hover:bg-gray-50 dark:hover:bg-white/[0.05] transition-all duration-300 hover:scale-105 hover:border-purple-400 dark:hover:border-purple-500/30 hover:shadow-xl shadow-gray-200/50 dark:shadow-none">
                  {/* Step Number - Sol üstte içeride */}
                  <div className="absolute top-4 left-4 text-7xl font-black text-gray-900/5 dark:text-white/5 group-hover:text-gray-900/10 dark:group-hover:text-white/10 transition-all duration-300">
                    {item.step}
                  </div>
                  
                  {/* Icon */}
                  <div className={`relative bg-gradient-to-br ${item.color} p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <item.icon className="w-10 h-10 text-white" />
                    <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Demo CTA */}
          <div className="mt-20 text-center">
            <button
              onClick={() => router.push('/app')}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Play className="w-6 h-6" />
                {t.demoCTA}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <p className="text-gray-600 dark:text-gray-500 text-sm mt-4">{t.demoCTASubtitle}</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative py-32 px-6 z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-20">
            <div className="inline-block bg-purple-500/10 border border-purple-500/30 dark:border-purple-500/20 px-4 py-2 rounded-full mb-6">
              <span className="text-purple-600 dark:text-purple-400 font-bold text-sm">{t.faqTag}</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
              {t.faqTitle1}
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mt-2">
                {t.faqTitle2}
              </span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { q: t.faq1Q, a: t.faq1A },
              { q: t.faq2Q, a: t.faq2A },
              { q: t.faq3Q, a: t.faq3A },
              { q: t.faq4Q, a: t.faq4A },
              { q: t.faq5Q, a: t.faq5A },
              { q: t.faq6Q, a: t.faq6A },
              { q: t.faq7Q, a: t.faq7A },
              { q: t.faq8Q, a: t.faq8A },
            ].map((faq, i) => (
              <div 
                key={i}
                className="group bg-white dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-2xl p-6 hover:bg-gray-50 dark:hover:bg-white/[0.05] transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-500/30 hover:shadow-lg shadow-gray-200/50 dark:shadow-none"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <span className="text-sm font-black text-white">?</span>
                  </div>
                  {faq.q}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed pl-11">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 text-center bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 border border-purple-500/30 dark:border-purple-500/20 rounded-3xl p-10">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {t.faqContactTitle}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t.faqContactDesc}
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50">
              {t.faqContactButton}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-gray-200/50 dark:border-white/5 py-16 px-6 z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-8 h-8 text-purple-400" />
                <span className="text-xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  ScreenToCode
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                AI destekli yeni nesil tasarımdan koda dönüştürme platformu. Saniyeler içinde production-ready kod.
              </p>
              <div className="flex gap-3">
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-300 dark:border-white/10 rounded-lg transition-all hover:scale-110"
                >
                  <Twitter className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors" />
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-300 dark:border-white/10 rounded-lg transition-all hover:scale-110"
                >
                  <Github className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-300 dark:border-white/10 rounded-lg transition-all hover:scale-110"
                >
                  <Linkedin className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors" />
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-gray-900 dark:text-white font-bold mb-4">{t.footerProductTitle}</h4>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
                <li><a href="#features" className="hover:text-gray-900 dark:hover:text-white transition-colors">{t.navFeatures}</a></li>
                <li><a href="#pricing" className="hover:text-gray-900 dark:hover:text-white transition-colors">{t.navPricing}</a></li>
                <li><a href="#how-it-works" className="hover:text-gray-900 dark:hover:text-white transition-colors">{t.navHowItWorks}</a></li>
                <li><a href="/app" className="hover:text-gray-900 dark:hover:text-white transition-colors">{t.footerTryNow}</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-gray-900 dark:text-white font-bold mb-4">{t.footerResourcesTitle}</h4>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
                <li><a href="#faq" className="hover:text-gray-900 dark:hover:text-white transition-colors">{t.navFAQ}</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">{t.footerDocumentation}</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">{t.footerAPI}</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">{t.footerBlog}</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-gray-900 dark:text-white font-bold mb-4">Yasal</h4>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Gizlilik Politikası</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Kullanım Şartları</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">KVKK</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">İletişim</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-2 text-sm">
              <p className="text-gray-600 dark:text-gray-400">
                {t.footerRights}
              </p>
              <span className="hidden md:inline text-gray-400 dark:text-gray-600">•</span>
              <p className="text-gray-600 dark:text-gray-500 flex items-center gap-2">
                <a 
                  href="https://www.arsuztech.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent font-bold hover:from-purple-500 hover:to-pink-500 dark:hover:from-purple-300 dark:hover:to-pink-300 transition-all"
                >
                  ArsuzTech
                </a>
                {t.footerProduct}
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse"></div>
                {t.footerSystemsUp}
              </span>
              <span>🇹🇷 Türkiye</span>
              <span>{t.footerPoweredBy}</span>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </>
  )
}
