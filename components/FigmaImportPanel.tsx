'use client'

import { useState } from 'react'
import { Link2, Sparkles, Loader2, AlertCircle, CheckCircle2, FileCode } from 'lucide-react'
import { 
  importFromFigma, 
  validateFigmaUrl, 
  FIGMA_FRAMEWORKS,
  type FigmaImportOptions 
} from '@/lib/figmaUtils'

interface FigmaImportPanelProps {
  onCodeGenerated: (code: string, framework: string) => void
  language: 'tr' | 'en'
  canUseTrial: boolean
  onTrialUsed: () => void
  onUpgradeRequired: () => void
}

export default function FigmaImportPanel({
  onCodeGenerated,
  language,
  canUseTrial,
  onTrialUsed,
  onUpgradeRequired
}: FigmaImportPanelProps) {
  const [figmaUrl, setFigmaUrl] = useState('')
  const [framework, setFramework] = useState<'html' | 'react' | 'vue' | 'svelte'>('html')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [progress, setProgress] = useState(0)

  const t = {
    tr: {
      title: 'Figma Tasarımı İçe Aktar',
      subtitle: 'Figma tasarım linkinizi yapıştırın, AI otomatik olarak pixel-perfect koda dönüştürsün',
      urlPlaceholder: 'https://www.figma.com/design/...',
      framework: 'Framework Seçin',
      import: 'Koda Dönüştür',
      importing: 'Dönüştürülüyor...',
      invalidUrl: 'Geçersiz Figma URL. Lütfen geçerli bir Figma link girin.',
      success: 'Kod başarıyla oluşturuldu!',
      error: 'Bir hata oluştu. Lütfen tekrar deneyin.',
      step1: 'Figma dosyası alınıyor...',
      step2: 'Tasarım analiz ediliyor...',
      step3: 'AI ile görsel analiz...',
      step4: 'Kod üretiliyor...',
      features: {
        title: 'Nasıl Çalışır?',
        item1: '📋 Figma tasarım linkinizi yapıştırın',
        item2: '🤖 GPT-5 Vision ile derin analiz yapılır',
        item3: '💎 Claude Sonnet 4.5 pixel-perfect kod üretir',
        item4: '🚀 HTML, React, Vue veya Svelte olarak export',
      }
    },
    en: {
      title: 'Import Figma Design',
      subtitle: 'Paste your Figma design link, let AI convert it to pixel-perfect code automatically',
      urlPlaceholder: 'https://www.figma.com/design/...',
      framework: 'Select Framework',
      import: 'Convert to Code',
      importing: 'Converting...',
      invalidUrl: 'Invalid Figma URL. Please enter a valid Figma link.',
      success: 'Code generated successfully!',
      error: 'An error occurred. Please try again.',
      step1: 'Fetching Figma file...',
      step2: 'Analyzing design...',
      step3: 'AI visual analysis...',
      step4: 'Generating code...',
      features: {
        title: 'How It Works?',
        item1: '📋 Paste your Figma design link',
        item2: '🤖 Deep analysis with GPT-5 Vision',
        item3: '💎 Claude Sonnet 4.5 generates pixel-perfect code',
        item4: '🚀 Export as HTML, React, Vue or Svelte',
      }
    }
  }

  const content = t[language]

  const handleImport = async () => {
    setError(null)
    setSuccess(false)

    // Validate URL
    if (!validateFigmaUrl(figmaUrl)) {
      setError(content.invalidUrl)
      return
    }

    // Check trial
    if (!canUseTrial) {
      onUpgradeRequired()
      return
    }

    setLoading(true)
    setProgress(0)

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 10
        })
      }, 800)

      const options: FigmaImportOptions = {
        url: figmaUrl,
        framework,
        includeStyles: true,
        responsive: true
      }

      const result = await importFromFigma(options)
      
      clearInterval(progressInterval)
      setProgress(100)

      if (result.success) {
        setSuccess(true)
        onCodeGenerated(result.code, framework)
        onTrialUsed()
        
        // Clear form
        setTimeout(() => {
          setFigmaUrl('')
          setSuccess(false)
          setProgress(0)
        }, 2000)
      } else {
        throw new Error('Import failed')
      }
    } catch (err: any) {
      setError(err.message || content.error)
      setProgress(0)
    } finally {
      setLoading(false)
    }
  }

  const getProgressLabel = () => {
    if (progress < 25) return content.step1
    if (progress < 50) return content.step2
    if (progress < 75) return content.step3
    return content.step4
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 dark:border-purple-500/20 rounded-full px-4 py-2 mb-6">
          <FileCode className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <span className="text-purple-700 dark:text-purple-300 font-semibold text-sm">
            Figma to Code
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent">
          {content.title}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {content.subtitle}
        </p>
      </div>

      {/* Import Form */}
      <div className="bg-white dark:bg-white/[0.02] backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-2xl p-8 mb-8 shadow-xl shadow-gray-200/50 dark:shadow-none">
        <div className="space-y-6">
          {/* Figma URL Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Figma URL
            </label>
            <div className="relative">
              <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="url"
                value={figmaUrl}
                onChange={(e) => setFigmaUrl(e.target.value)}
                placeholder={content.urlPlaceholder}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition"
                disabled={loading}
              />
            </div>
          </div>

          {/* Framework Selector */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {content.framework}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {FIGMA_FRAMEWORKS.map((fw) => (
                <button
                  key={fw.value}
                  onClick={() => setFramework(fw.value)}
                  disabled={loading}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    framework === fw.value
                      ? 'border-purple-500 bg-purple-500/10 dark:bg-purple-500/20'
                      : 'border-gray-200 dark:border-white/10 hover:border-purple-300 dark:hover:border-purple-500/30'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="text-2xl mb-2">{fw.icon}</div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">{fw.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 dark:border-red-500/20 rounded-xl">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/30 dark:border-green-500/20 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-700 dark:text-green-300">{content.success}</p>
            </div>
          )}

          {/* Progress Bar */}
          {loading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">{getProgressLabel()}</span>
                <span className="text-purple-600 dark:text-purple-400 font-semibold">{progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Import Button */}
          <button
            onClick={handleImport}
            disabled={loading || !figmaUrl}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 shadow-lg shadow-purple-500/50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {content.importing}
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                {content.import}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Features Info */}
      <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 border border-purple-500/30 dark:border-purple-500/20 rounded-2xl p-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{content.features.title}</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-lg">{content.features.item1.slice(0, 2)}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{content.features.item1.slice(3)}</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-lg">{content.features.item2.slice(0, 2)}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{content.features.item2.slice(3)}</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-lg">{content.features.item3.slice(0, 2)}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{content.features.item3.slice(3)}</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-lg">{content.features.item4.slice(0, 2)}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{content.features.item4.slice(3)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
