'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { 
  ArrowLeft, Download, Copy, Sparkles, Zap, Code2, 
  Check, Loader2, Eye, Crown, Lock, Gift, X, Globe,
  Moon, Sun, FileCode, Layout
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
  const [activeTab, setActiveTab] = useState<'demos' | 'figma'>('demos')
  
  const t = useTranslation(language)
  const currency = getCurrency(language)

  useEffect(() => {
    // Custom cursor setup with trail
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
      // Each trail segment follows the previous one with delay
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

    // Load remaining uses
    setRemainingUses(FreeTrialManager.getRemainingUses())

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
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
        * { cursor: none !important; }
        html, body, div, button, a, input, textarea, select { cursor: none !important; }
        body { cursor: none !important; }
        .cursor-comet { cursor: none !important; }
      `}</style>
      
      <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-x-hidden cursor-comet transition-colors duration-300">
        {/* Custom Cursor - Küçültülmüş */}
        <div id="cursor" className="fixed w-6 h-6 pointer-events-none z-[9999]">
          <div className="absolute inset-0 bg-purple-700 dark:bg-purple-500 rounded-full blur-sm" />
          <div className="absolute inset-0 bg-pink-600 dark:bg-pink-400 rounded-full blur-md opacity-70" />
        </div>
        {/* Cursor Trail with multiple segments */}
        <div id="cursor-trail-1" className="fixed w-5 h-5 pointer-events-none z-[9997]">
          <div className="absolute inset-0 bg-purple-600 dark:bg-purple-400 rounded-full blur-sm opacity-60" />
        </div>
        <div id="cursor-trail-2" className="fixed w-4 h-4 pointer-events-none z-[9996]">
          <div className="absolute inset-0 bg-purple-500 dark:bg-purple-400 rounded-full blur-sm opacity-45" />
        </div>
        <div id="cursor-trail-3" className="fixed w-4 h-4 pointer-events-none z-[9995]">
          <div className="absolute inset-0 bg-pink-500 dark:bg-pink-400 rounded-full blur-sm opacity-35" />
        </div>
        <div id="cursor-trail-4" className="fixed w-3 h-3 pointer-events-none z-[9994]">
          <div className="absolute inset-0 bg-pink-400 dark:bg-pink-300 rounded-full blur-sm opacity-25" />
        </div>

        {/* Modern Background */}
        <div className="fixed inset-0 z-0">
          {/* Dark Mode: Animated gradient blurs */}
          <div className="absolute inset-0 dark:block hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-blue-900/20" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '700ms' }} />
          </div>
          
          {/* Light Mode: Clean subtle grid */}
          <div className="absolute inset-0 dark:hidden block bg-gradient-to-b from-gray-50 via-white to-gray-50">
            <div 
              className="absolute inset-0 opacity-[0.4]"
              style={{
                backgroundImage: 'linear-gradient(to right, rgb(229 231 235 / 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgb(229 231 235 / 0.3) 1px, transparent 1px)',
                backgroundSize: '80px 80px',
              }}
            />
            <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-[100px]" />
          </div>
        </div>

        {/* Header */}
        <header className="relative z-10 border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/60 backdrop-blur-xl transition-colors duration-300">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/landing" className="flex items-center gap-3 group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-2xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                {t.headerTitle}
              </span>
            </Link>
            
            {/* Right side controls */}
            <div className="hidden lg:flex items-center gap-3">
              {/* User Info */}
              {session?.user && (
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-full px-3 py-1.5">
                  {session.user.image ? (
                    <img src={session.user.image} alt={session.user.name || ''} className="w-6 h-6 rounded-full" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs">
                      {session.user.name?.[0] || session.user.email?.[0] || 'U'}
                    </div>
                  )}
                  <div className="text-xs font-semibold text-gray-900 dark:text-white">
                    {session.user.name || session.user.email?.split('@')[0]}
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

            {/* Mobile Controls */}
            <div className="lg:hidden flex items-center gap-2">
              {/* Free Trial Counter */}
              <div className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/30 rounded-full px-2.5 py-1">
                <Gift className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-xs font-semibold text-gray-900 dark:text-white">{remainingUses}/3</span>
              </div>

              {/* Upgrade Button - Mobile */}
              <button
                onClick={() => router.push('/landing#pricing')}
                className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-pink-600 px-2.5 py-1 rounded-lg text-xs font-semibold hover:scale-105 transition shadow-lg text-white"
              >
                <Crown className="w-3.5 h-3.5" />
                Pro
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-3 sm:px-6 py-8 sm:py-12">
          {!code ? (
            <>
              {/* Tab Selector */}
              <div className="max-w-6xl mx-auto mb-8 sm:mb-12">
                <div className="flex justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 px-2">
                  <button
                    onClick={() => setActiveTab('demos')}
                    className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-sm sm:text-lg transition-all duration-300 ${
                      activeTab === 'demos'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                        : 'bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-white/10 hover:scale-105'
                    }`}
                  >
                    <Layout className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">{language === 'tr' ? 'Demo Tasarımlar' : 'Demo Designs'}</span>
                    <span className="sm:hidden">{language === 'tr' ? 'Demo' : 'Demo'}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('figma')}
                    className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-sm sm:text-lg transition-all duration-300 ${
                      activeTab === 'figma'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                        : 'bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-white/10 hover:scale-105'
                    }`}
                  >
                    <FileCode className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">{language === 'tr' ? 'Figma İçe Aktar' : 'Import Figma'}</span>
                    <span className="sm:hidden">Figma</span>
                  </button>
                </div>
              </div>

              {/* Demo Selection */}
              {activeTab === 'demos' && (
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-8 sm:mb-12 px-4">
                    <h1 className="text-3xl sm:text-5xl font-black mb-3 sm:mb-4">
                      <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent">
                        {t.appTitle}
                      </span>
                    </h1>
                    <p className="text-base sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                      {t.appSubtitle}
                    </p>
                    <div className="mt-3 sm:mt-4 inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 dark:border-blue-500/20 rounded-full px-4 sm:px-6 py-2 sm:py-3">
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm sm:text-base text-blue-700 dark:text-blue-300 font-semibold">
                        {remainingUses} {t.appRemainingTrials}
                      </span>
                    </div>
                  </div>

                  {/* Demo Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
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
