'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { 
  ArrowLeft, Download, Copy, Sparkles, Zap, Code2, 
  Check, Loader2, Eye, Crown, Lock, Gift, X, Globe,
  Moon, Sun, FileCode, Layout, History, Settings,
  CreditCard, LogOut, Clock, User
} from 'lucide-react'
import { demoScreenshots } from '@/lib/demoData'
import { FreeTrialManager } from '@/lib/freeTrialStore'
import { type Language, useTranslation, getCurrency, formatPrice } from '@/lib/i18n'
import FigmaImportPanel from '@/components/FigmaImportPanel'

export default function AppPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [language, setLanguage] = useState<Language>('tr')
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [code, setCode] = useState<string>('')
  const [framework, setFramework] = useState<string>('html')
  const [copied, setCopied] = useState(false)
  const [remainingUses, setRemainingUses] = useState(3)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [activeTab, setActiveTab] = useState<'demos' | 'figma' | 'history' | 'settings' | 'billing'>('demos')
  
  const t = useTranslation(language)
  const currency = getCurrency(language)

  useEffect(() => {
    // Load remaining uses
    setRemainingUses(FreeTrialManager.getRemainingUses())
    
    // Check for saved tab from landing page
    const savedTab = localStorage.getItem('app-active-tab')
    if (savedTab && ['demos', 'figma', 'history', 'settings', 'billing'].includes(savedTab)) {
      setActiveTab(savedTab as 'demos' | 'figma' | 'history' | 'settings' | 'billing')
      localStorage.removeItem('app-active-tab') // Clear after use
    }
  }, [])

  // Authentication check - redirect if not signed in
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

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

      neurons.forEach(neuron => {
        neuron.x += neuron.vx
        neuron.y += neuron.vy
        if (neuron.x < 0 || neuron.x > canvas.width) neuron.vx *= -1
        if (neuron.y < 0 || neuron.y > canvas.height) neuron.vy *= -1
        neuron.x = Math.max(0, Math.min(canvas.width, neuron.x))
        neuron.y = Math.max(0, Math.min(canvas.height, neuron.y))

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

      if (Math.random() < 0.01) updateConnections()

      neurons.forEach((neuron) => {
        neuron.connections.forEach(targetIndex => {
          const target = neurons[targetIndex]
          const dx = target.x - neuron.x
          const dy = target.y - neuron.y
          const strength = (neuron.activationLevel + target.activationLevel) / 2
          const baseAlpha = isDark ? 0.04 : 0.03
          const alpha = baseAlpha + strength * 0.2

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

      neurons.forEach(neuron => {
        const size = 3 + neuron.activationLevel * 5
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

        ctx.fillStyle = neuron.activationLevel > 0
          ? (isDark ? `rgba(192, 132, 252, ${0.4 + neuron.activationLevel * 0.2})` : `rgba(168, 85, 247, ${0.4 + neuron.activationLevel * 0.2})`)
          : (isDark ? 'rgba(139, 92, 246, 0.25)' : 'rgba(147, 51, 234, 0.25)')
        ctx.beginPath()
        ctx.arc(neuron.x, neuron.y, size, 0, Math.PI * 2)
        ctx.fill()

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

  // Show loading while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 mx-auto animate-pulse">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <div className="text-2xl font-black text-white mb-2">ScreenToCode</div>
          <div className="text-gray-400 text-sm">Yükleniyor...</div>
        </div>
      </div>
    )
  }

  // Don't render if not authenticated
  if (status === 'unauthenticated') {
    return null
  }

  const handleDemoSelect = (demoId: string) => {
    // Check if user has remaining uses
    if (!FreeTrialManager.canUseTrial()) {
      setShowUpgradeModal(true)
      return
    }

    setSelectedDemo(demoId)
    setLoading(true)

    // Simulate AI processing
    setTimeout(() => {
      const demo = demoScreenshots.find(d => d.id === demoId)
      if (demo) {
        setCode(demo.previewCode)
        FreeTrialManager.decrementUse()
        setRemainingUses(FreeTrialManager.getRemainingUses())
      }
      setLoading(false)
    }, 3000) // 3 seconds simulation
  }

  const openPreview = (image: string) => {
    setPreviewImage(image)
    setPreviewOpen(true)
  }

  const closePreview = () => {
    setPreviewOpen(false)
    setPreviewImage(null)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `generated-${framework}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleUpgrade = () => {
    router.push('/landing#pricing')
  }

  return (
    <>
      <style jsx global>{`
        * {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 2L16 10L9 11L6 16L2 2Z" fill="%23a855f7" stroke="%23ffffff" stroke-width="1"/></svg>') 2 2, auto !important;
        }
      `}</style>
      
      <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden transition-colors duration-300">
      {/* Neural Network Background - Hidden on mobile */}
      <div className="hidden md:block fixed inset-0 z-0">
        <canvas 
          id="neural-canvas" 
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 dark:bg-gradient-to-b dark:from-black/40 dark:via-transparent dark:to-black/60 bg-gradient-to-b from-white/50 via-transparent to-white/70 pointer-events-none" />
      </div>

        {/* Header */}
        <header className="relative z-[60] border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/60 backdrop-blur-xl transition-colors duration-300 pointer-events-auto">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/landing" className="flex items-center gap-3 group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-2xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                {t.headerTitle}
              </span>
            </Link>
            
            {/* Right side controls */}
            <div className="flex items-center gap-3">
              {/* User Dropdown Menu */}
              {session?.user && (
                <div className="relative">
                  <button
                    onClick={() => {
                      const dropdown = document.getElementById('app-user-dropdown')
                      if (dropdown) {
                        dropdown.classList.toggle('hidden')
                      }
                    }}
                    className="flex items-center gap-2 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-full px-3 py-1.5 hover:bg-gray-200 dark:hover:bg-white/10 transition cursor-pointer"
                  >
                    {session.user.image ? (
                      <img src={session.user.image} alt={session.user.name || ''} className="w-6 h-6 rounded-full" />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs">
                        {session.user.name?.[0] || session.user.email?.[0] || 'U'}
                      </div>
                    )}
                    <div className="text-xs font-semibold text-gray-900 dark:text-white">
                      {session.user.name?.split(' ')[0] || session.user.email?.split('@')[0]}
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  <div
                    id="app-user-dropdown"
                    className="hidden absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl shadow-purple-500/20 z-50"
                  >
                    <div className="p-3 border-b border-gray-200 dark:border-white/10">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">{session.user.name || session.user.email?.split('@')[0]}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{session.user.email}</div>
                    </div>
                    
                    <div className="p-1">
                      <button
                        onClick={() => {
                          document.getElementById('app-user-dropdown')?.classList.add('hidden')
                          setActiveTab('demos')
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition"
                      >
                        <Layout className="w-4 h-4" />
                        {language === 'tr' ? 'Dashboard' : 'Dashboard'}
                      </button>
                      
                      <button
                        onClick={() => {
                          document.getElementById('app-user-dropdown')?.classList.add('hidden')
                          setActiveTab('history')
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition"
                      >
                        <Clock className="w-4 h-4" />
                        {language === 'tr' ? 'Geçmiş' : 'History'}
                      </button>
                      
                      <button
                        onClick={() => {
                          document.getElementById('app-user-dropdown')?.classList.add('hidden')
                          setActiveTab('settings')
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition"
                      >
                        <User className="w-4 h-4" />
                        {language === 'tr' ? 'Ayarlar' : 'Settings'}
                      </button>
                      
                      <button
                        onClick={() => {
                          document.getElementById('app-user-dropdown')?.classList.add('hidden')
                          setActiveTab('billing')
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition"
                      >
                        <CreditCard className="w-4 h-4" />
                        {language === 'tr' ? 'Ödeme' : 'Billing'}
                      </button>
                    </div>

                    <div className="p-1 border-t border-gray-200 dark:border-white/10">
                      <button
                        onClick={() => {
                          document.getElementById('app-user-dropdown')?.classList.add('hidden')
                          signOut({ callbackUrl: '/landing' })
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                      >
                        <LogOut className="w-4 h-4" />
                        {language === 'tr' ? 'Çıkış Yap' : 'Sign Out'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Free Trial Counter */}
              <div className="flex items-center gap-2 bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/30 rounded-full px-3 py-1.5">
                <Gift className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{remainingUses}/3</span>
              </div>

              {/* Language Toggle - Küçültülmüş */}
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg p-0.5">
                <button
                  onClick={() => setLanguage('tr')}
                  className={`px-2 py-1 rounded text-xs font-bold transition ${
                    language === 'tr' 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  🇹🇷
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-1 rounded text-xs font-bold transition ${
                    language === 'en' 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  🇺🇸
                </button>
              </div>
              
              {/* Dark Mode Toggle - Küçültülmüş */}
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

              {/* Upgrade Button */}
              <button
                onClick={() => router.push('/landing#pricing')}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1.5 rounded-lg text-sm font-semibold hover:scale-105 transition shadow-lg text-white"
              >
                <Crown className="w-4 h-4" />
                {t.headerUpgrade}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-6 py-12">
          {!code ? (
            <>
              {/* Tab Selector */}
              <div className="max-w-7xl mx-auto mb-12">
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  <button
                    onClick={() => setActiveTab('demos')}
                    className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                      activeTab === 'demos'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                        : 'bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-white/10 hover:scale-105'
                    }`}
                  >
                    <Layout className="w-5 h-5" />
                    {language === 'tr' ? 'Demo Tasarımlar' : 'Demo Designs'}
                  </button>
                  <button
                    onClick={() => setActiveTab('figma')}
                    className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                      activeTab === 'figma'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                        : 'bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-white/10 hover:scale-105'
                    }`}
                  >
                    <FileCode className="w-5 h-5" />
                    {language === 'tr' ? 'Figma İçe Aktar' : 'Import Figma'}
                  </button>
                </div>
              </div>

              {/* Demo Selection */}
              {activeTab === 'demos' && (
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-12">
                    <h1 className="text-5xl font-black mb-4">
                      <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent">
                        {t.appTitle}
                      </span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                      {t.appSubtitle}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 dark:border-blue-500/20 rounded-full px-6 py-3">
                      <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-blue-700 dark:text-blue-300 font-semibold">
                        {remainingUses} {t.appRemainingTrials}
                      </span>
                    </div>
                  </div>

                  {/* Demo Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {demoScreenshots.map((demo) => (
                    <div
                      key={demo.id}
                      className="group bg-white dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden hover:border-purple-400 dark:hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-gray-200/50 dark:shadow-none"
                    >
                      {/* Thumbnail */}
                            {/* Thumbnail */}
                            <div className="relative aspect-video overflow-hidden bg-black/20">
                              <Image
                                src={demo.thumbnail}
                                alt={demo.name}
                                width={1200}
                                height={675}
                                className="object-cover w-full h-full transform transition duration-500 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => openPreview(demo.fullImage)}
                                    className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-md backdrop-blur-sm flex items-center gap-2 text-sm"
                                  >
                                    <Eye className="w-4 h-4" /> {language === 'tr' ? 'Önizle' : 'Preview'}
                                  </button>
                                  <span className="bg-purple-500/80 px-3 py-1 rounded-full text-xs font-semibold">
                                    {demo.category === 'Landing Page' && t.categoryLanding}
                                    {demo.category === 'Dashboard' && t.categoryDashboard}
                                    {demo.category === 'E-commerce' && t.categoryEcommerce}
                                  </span>
                                </div>
                              </div>
                            </div>

                      {/* Info */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {demo.id === 'landing-modern' && (language === 'tr' ? t.demoLandingName : t.demoLandingName)}
                          {demo.id === 'dashboard-saas' && (language === 'tr' ? t.demoDashboardName : t.demoDashboardName)}
                          {demo.id === 'ecommerce-product' && (language === 'tr' ? t.demoEcommerceName : t.demoEcommerceName)}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                          {demo.id === 'landing-modern' && (language === 'tr' ? t.demoLandingDesc : t.demoLandingDesc)}
                          {demo.id === 'dashboard-saas' && (language === 'tr' ? t.demoDashboardDesc : t.demoDashboardDesc)}
                          {demo.id === 'ecommerce-product' && (language === 'tr' ? t.demoEcommerceDesc : t.demoEcommerceDesc)}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {demo.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="bg-gray-100 dark:bg-white/5 px-2 py-1 rounded text-xs text-gray-600 dark:text-gray-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Action Button */}
                        <button
                          onClick={() => handleDemoSelect(demo.id)}
                          disabled={loading || remainingUses === 0}
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 shadow-md"
                        >
                          {loading && selectedDemo === demo.id ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              {t.appGenerating}
                            </>
                          ) : remainingUses === 0 ? (
                            <>
                              <Lock className="w-4 h-4" />
                              {t.appUpgradeRequired}
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4" />
                              {t.appGenerateCode}
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                  {/* Info Box */}
                  <div className="mt-12 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 dark:from-purple-500/8 dark:via-pink-500/8 dark:to-blue-500/8 border border-purple-200/30 dark:border-white/6 rounded-2xl p-8 shadow-lg">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Crown className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t.infoTitle}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {t.infoDesc}
                        </p>
                        <button
                          onClick={handleUpgrade}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
                        >
                          {t.infoButton}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Figma Import */}
              {activeTab === 'figma' && (
                <FigmaImportPanel
                  onCodeGenerated={(generatedCode, fw) => {
                    setCode(generatedCode)
                    setFramework(fw)
                  }}
                  language={language}
                  canUseTrial={FreeTrialManager.canUseTrial()}
                  onTrialUsed={() => {
                    FreeTrialManager.decrementUse()
                    setRemainingUses(FreeTrialManager.getRemainingUses())
                  }}
                  onUpgradeRequired={() => setShowUpgradeModal(true)}
                />
              )}

              {/* History Tab */}
              {activeTab === 'history' && (
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {language === 'tr' ? 'Dönüştürme Geçmişi' : 'Conversion History'}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                      {language === 'tr' 
                        ? 'Önceki tasarımlarınızı ve Figma dönüştürmelerinizi görüntüleyin' 
                        : 'View your previous designs and Figma conversions'}
                    </p>
                  </div>

                  {/* History Items - Mock Data */}
                  <div className="space-y-4">
                    {[
                      { 
                        id: 1, 
                        type: 'Demo', 
                        name: 'Modern SaaS Landing Page', 
                        framework: 'React',
                        date: '15 Ekim 2025',
                        thumbnail: '/demo-1.jpg'
                      },
                      { 
                        id: 2, 
                        type: 'Figma', 
                        name: 'E-commerce Product Page', 
                        framework: 'Vue',
                        date: '14 Ekim 2025',
                        thumbnail: '/demo-2.jpg'
                      },
                      { 
                        id: 3, 
                        type: 'Demo', 
                        name: 'Portfolio Website', 
                        framework: 'HTML',
                        date: '12 Ekim 2025',
                        thumbnail: '/demo-3.jpg'
                      },
                    ].map((item) => (
                      <div 
                        key={item.id}
                        className="group relative bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                              <FileCode className="w-8 h-8 text-white" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.name}</h3>
                                <span className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold">
                                  {item.type}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                <span className="flex items-center gap-1">
                                  <Code2 className="w-4 h-4" />
                                  {item.framework}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {item.date}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="p-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-lg transition">
                              <Eye className="w-5 h-5" />
                            </button>
                            <button className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg transition">
                              <Download className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Empty State for new users */}
                  {/* <div className="text-center py-20">
                    <History className="w-20 h-20 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {language === 'tr' ? 'Henüz geçmiş yok' : 'No history yet'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                      {language === 'tr' 
                        ? 'İlk tasarımınızı dönüştürdüğünüzde burada görünecek' 
                        : 'Your first conversion will appear here'}
                    </p>
                    <button
                      onClick={() => setActiveTab('demos')}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition"
                    >
                      {language === 'tr' ? 'Demo ile Başla' : 'Start with Demo'}
                    </button>
                  </div> */}
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {language === 'tr' ? 'Hesap Ayarları' : 'Account Settings'}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                      {language === 'tr' 
                        ? 'Profil bilgilerinizi ve tercihlerinizi yönetin' 
                        : 'Manage your profile and preferences'}
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Profile Section */}
                    <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <User className="w-5 h-5 text-purple-500" />
                        {language === 'tr' ? 'Profil Bilgileri' : 'Profile Information'}
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            {language === 'tr' ? 'Ad Soyad' : 'Full Name'}
                          </label>
                          <input
                            type="text"
                            value={session?.user?.name || ''}
                            disabled
                            className="w-full px-4 py-3 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            {language === 'tr' ? 'E-posta' : 'Email'}
                          </label>
                          <input
                            type="email"
                            value={session?.user?.email || ''}
                            disabled
                            className="w-full px-4 py-3 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl text-gray-900 dark:text-white"
                          />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Check className="w-4 h-4 text-green-500" />
                          {language === 'tr' ? 'OAuth ile giriş yapıldı' : 'Signed in with OAuth'}
                        </div>
                      </div>
                    </div>

                    {/* Preferences */}
                    <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <Settings className="w-5 h-5 text-purple-500" />
                        {language === 'tr' ? 'Tercihler' : 'Preferences'}
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{language === 'tr' ? 'Dil' : 'Language'}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {language === 'tr' ? 'Arayüz dili' : 'Interface language'}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg p-0.5">
                            <button
                              onClick={() => setLanguage('tr')}
                              className={`px-3 py-1.5 rounded text-sm font-bold transition ${
                                language === 'tr' 
                                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                                  : 'text-gray-600 dark:text-gray-400'
                              }`}
                            >
                              🇹🇷 TR
                            </button>
                            <button
                              onClick={() => setLanguage('en')}
                              className={`px-3 py-1.5 rounded text-sm font-bold transition ${
                                language === 'en' 
                                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                                  : 'text-gray-600 dark:text-gray-400'
                              }`}
                            >
                              🇺🇸 EN
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-white/10">
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{language === 'tr' ? 'Tema' : 'Theme'}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {language === 'tr' ? 'Görünüm tercihi' : 'Appearance preference'}
                            </p>
                          </div>
                          <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-300 dark:border-white/10 rounded-lg transition"
                          >
                            {isDarkMode ? (
                              <>
                                <Sun className="w-4 h-4 text-yellow-500" />
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">Light</span>
                              </>
                            ) : (
                              <>
                                <Moon className="w-4 h-4 text-purple-500" />
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">Dark</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-red-500/5 border border-red-500/30 rounded-2xl p-8">
                      <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">
                        {language === 'tr' ? 'Tehlikeli Bölge' : 'Danger Zone'}
                      </h3>
                      <button
                        onClick={() => signOut({ callbackUrl: '/landing' })}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-bold transition"
                      >
                        <LogOut className="w-5 h-5" />
                        {language === 'tr' ? 'Hesaptan Çıkış Yap' : 'Sign Out from Account'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Billing Tab */}
              {activeTab === 'billing' && (
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {language === 'tr' ? 'Ödeme ve Abonelik' : 'Billing & Subscription'}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                      {language === 'tr' 
                        ? 'Planınızı yönetin ve ödeme geçmişinizi görüntüleyin' 
                        : 'Manage your plan and view payment history'}
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Current Plan */}
                    <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-2xl p-[2px]">
                      <div className="bg-black rounded-2xl p-8">
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-2">
                              {language === 'tr' ? 'Ücretsiz Plan' : 'Free Plan'}
                            </h3>
                            <p className="text-gray-400">
                              {language === 'tr' ? '3 ücretsiz deneme hakkı' : '3 free trial uses'}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-4xl font-black text-white">$0</div>
                            <div className="text-gray-400 text-sm">{language === 'tr' ? '/ay' : '/month'}</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-6 border-t border-white/10">
                          <div className="flex items-center gap-2 text-white">
                            <Gift className="w-5 h-5 text-purple-400" />
                            <span className="font-semibold">{remainingUses}/3 {language === 'tr' ? 'kalan kullanım' : 'uses remaining'}</span>
                          </div>
                          <button
                            onClick={() => router.push('/landing#pricing')}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2.5 rounded-xl font-bold transition flex items-center gap-2"
                          >
                            <Crown className="w-4 h-4" />
                            {language === 'tr' ? 'Pro\'ya Yükselt' : 'Upgrade to Pro'}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Payment History */}
                    <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-purple-500" />
                        {language === 'tr' ? 'Ödeme Geçmişi' : 'Payment History'}
                      </h3>
                      
                      {/* Empty State */}
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CreditCard className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                          {language === 'tr' ? 'Henüz ödeme yapılmadı' : 'No payments yet'}
                        </p>
                        <button
                          onClick={() => router.push('/landing#pricing')}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition"
                        >
                          {language === 'tr' ? 'Planları İncele' : 'View Plans'}
                        </button>
                      </div>

                      {/* Mock Payment History - uncomment when ready */}
                      {/* <div className="space-y-3">
                        {[
                          { date: '1 Ekim 2025', amount: '$29', plan: 'Pro', status: 'paid' },
                          { date: '1 Eylül 2025', amount: '$29', plan: 'Pro', status: 'paid' },
                        ].map((payment, i) => (
                          <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-xl">
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white">{payment.plan} Plan</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{payment.date}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-gray-900 dark:text-white">{payment.amount}</p>
                              <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400">
                                {language === 'tr' ? 'Ödendi' : 'Paid'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div> */}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Code Result */}
              <div className="max-w-7xl mx-auto">
                {/* Action Bar */}
                <div className="flex justify-between items-center mb-6">
                  <button
                    onClick={() => {
                      setCode('')
                      setSelectedDemo(null)
                    }}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {t.appNewDemo}
                  </button>
                  <div className="flex gap-3">
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-300 dark:border-white/10 px-4 py-2 rounded-lg transition text-gray-900 dark:text-white"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-600 dark:text-green-400" /> : <Copy className="w-4 h-4" />}
                      {copied ? t.appCopied : t.appCopy}
                    </button>
                    <button
                      onClick={downloadCode}
                      className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-2 rounded-lg transition"
                    >
                      <Download className="w-4 h-4" />
                      {t.appDownload}
                    </button>
                  </div>
                </div>

                {/* Code Editor */}
                <div className="bg-gray-50 dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200/50 dark:border-white/10 rounded-2xl overflow-hidden">
                  <div className="bg-gray-100 dark:bg-black/40 border-b border-gray-200/50 dark:border-white/10 px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <span className="font-semibold text-gray-900 dark:text-white">generated-code.html</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Eye className="w-4 h-4" />
                      {t.appProductionReady}
                    </div>
                  </div>
                  <pre className="p-6 overflow-x-auto text-sm font-mono leading-relaxed">
                    <code className="text-gray-800 dark:text-gray-300">{code}</code>
                  </pre>
                </div>

                {/* Success Message */}
                <div className="mt-6 bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <div>
                    <p className="text-green-300 font-semibold">
                      {t.appSuccess} {remainingUses} {t.appTrialsLeft}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Features Footer */}
        <div className="relative z-10 container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Zap, label: t.featureFast, sublabel: t.featureFastDesc },
              { icon: Code2, label: t.featureClean, sublabel: t.featureCleanDesc },
              { icon: Sparkles, label: t.featureAI, sublabel: t.featureAIDesc },
              { icon: Check, label: t.featureResponsive, sublabel: t.featureResponsiveDesc },
            ].map((feature, i) => (
              <div 
                key={i}
                className="bg-white dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-2xl p-6 text-center hover:bg-gray-50 dark:hover:bg-white/[0.05] hover:border-purple-400 dark:hover:border-purple-500/30 transition-all duration-300 shadow-sm dark:shadow-none"
              >
                <feature.icon className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
                <div className="text-gray-900 dark:text-white font-bold">{feature.label}</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">{feature.sublabel}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade Modal */}
        {showUpgradeModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 border border-purple-400/40 dark:border-purple-500/30 rounded-2xl p-8 max-w-md mx-4 relative shadow-2xl">
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="absolute top-4 right-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Crown className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
                  {t.upgradeTitle}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {t.upgradeSubtitle}
                </p>
                <div className="bg-purple-500/10 border border-purple-500/30 dark:border-purple-500/20 rounded-xl p-4 mb-6">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t.upgradeWithTitle}</div>
                  <ul className="text-left space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                      {t.upgradeFeature1}
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                      {t.upgradeFeature2}
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                      {t.upgradeFeature3}
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                      {t.upgradeFeature4}
                    </li>
                  </ul>
                </div>
                <button
                  onClick={handleUpgrade}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-xl font-bold text-lg transition"
                >
                  {t.upgradeButton}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {previewOpen && previewImage && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="max-w-5xl w-full rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative bg-black">
                <button onClick={closePreview} className="absolute right-4 top-4 z-20 bg-black/40 text-white rounded-full p-2 hover:bg-black/60">
                  <X className="w-5 h-5" />
                </button>
                <Image src={previewImage} alt="preview" width={1600} height={900} className="w-full h-auto object-contain bg-black" />
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="relative z-10 mt-16 pt-8 border-t border-gray-200 dark:border-white/5">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
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
                  {t.footerBy}
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-500">
                <a href="#" className="hover:text-gray-900 dark:hover:text-white transition">{t.footerPrivacy}</a>
                <a href="#" className="hover:text-gray-900 dark:hover:text-white transition">{t.footerTerms}</a>
                <a href="#" className="hover:text-gray-900 dark:hover:text-white transition">{t.footerSupport}</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
