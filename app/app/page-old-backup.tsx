'use client'

import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { 
  ArrowLeft, Download, Copy, Upload, Sparkles, Zap, Code2, 
  Check, Image as ImageIcon, Loader2, Eye, FileCode, Wand2,
  ChevronDown, Settings, Crown, X
} from 'lucide-react'

export default function AppPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [code, setCode] = useState<string>('')
  const [framework, setFramework] = useState<string>('html')
  const [copied, setCopied] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [figmaUrl, setFigmaUrl] = useState('')
  const [showFigmaModal, setShowFigmaModal] = useState(false)
  const [importType, setImportType] = useState<'upload' | 'figma'>('upload')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
      setCode('') // Reset code when new file is selected
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile)
      setPreview(URL.createObjectURL(droppedFile))
      setCode('')
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleFigmaImport = async () => {
    if (!figmaUrl) return
    
    setLoading(true)
    setCode('')
    setShowFigmaModal(false)
    
    try {
      // Real Figma API integration
      console.log('🎨 Importing from Figma:', figmaUrl)
      
      // Step 1: Import Figma file and get image URL
      const figmaRes = await axios.post('/api/figma-import', { figmaUrl })
      const { imageUrl, fileName } = figmaRes.data
      
      console.log('✅ Figma imported:', fileName)
      console.log('📸 Image URL:', imageUrl)
      
      // Step 2: Analyze image with Vision API
      const visionRes = await axios.post('/api/vision', { imageUrl })
      const visionData = visionRes.data
      
      console.log('👁️ Vision analysis complete')
      
      // Step 3: Generate code with Claude Sonnet 4.5
      const generateRes = await axios.post('/api/generate', { 
        vision: visionData, 
        framework,
        source: 'figma',
        fileName 
      })
      setCode(generateRes.data.code)
      
      console.log('✨ Code generated successfully')
      
      // Set preview from Figma
      setPreview(imageUrl)
      setImportType('figma')
      
      // Success notification
      alert(`✅ Figma tasarımı başarıyla koda dönüştürüldü!\n\n📁 Dosya: ${fileName}\n🎯 Framework: ${framework.toUpperCase()}`)
      
    } catch (error: any) {
      console.error('❌ Figma import error:', error)
      const errorMsg = error.response?.data?.error || error.message || 'Bilinmeyen hata'
      alert(`Figma import hatası:\n\n${errorMsg}\n\nLütfen geçerli bir Figma URL'si girin.\nÖrnek: https://www.figma.com/file/xxx/Design-Name`)
    } finally {
      setLoading(false)
    }
  }

  const handleAnalyze = async () => {
    if (!file) return
    
    setLoading(true)
    setCode('')
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const uploadRes = await axios.post('/api/upload', formData)
      const imageUrl = uploadRes.data.url
      
      const visionRes = await axios.post('/api/vision', { imageUrl })
      const visionData = visionRes.data
      
      const generateRes = await axios.post('/api/generate', { vision: visionData, framework })
      setCode(generateRes.data.code)
      setImportType('upload')
    } catch (error) {
      console.error('Error:', error)
      alert('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadCode = () => {
    const extension = framework === 'html' ? 'html' : framework === 'react' ? 'jsx' : framework === 'vue' ? 'vue' : 'svelte'
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `generated-${Date.now()}.${extension}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const frameworks = [
    { value: 'html', label: 'HTML + Tailwind', icon: '🌐' },
    { value: 'react', label: 'React + Tailwind', icon: '⚛️' },
    { value: 'vue', label: 'Vue + Tailwind', icon: '💚' },
    { value: 'svelte', label: 'Svelte + Tailwind', icon: '🔥' },
  ]

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
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '700ms' }} />
      </div>

      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        html, body, div, button, a, input, textarea, select, label {
          cursor: none !important;
        }
        
        body {
          cursor: none !important;
        }
        
        .cursor-comet {
          cursor: none !important;
        }
      `}</style>

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 bg-black/40 backdrop-blur-2xl sticky top-0">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/landing" 
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Ana Sayfa</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <Sparkles className="w-7 h-7 text-purple-400 animate-pulse" />
              <h1 className="text-2xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                ScreenToCode
              </h1>
            </div>
            
            <Link 
              href="/landing#fiyatlandırma"
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-4 py-2 rounded-xl font-bold transition-all duration-300 hover:scale-105"
            >
              <Crown className="w-4 h-4" />
              <span className="hidden sm:inline">Pro'ya Geç</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Upload & Settings */}
          <div className="space-y-6">
            {/* Upload Area */}
            <div className="group relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/30 transition-all duration-300">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/20 group-hover:to-blue-600/20 rounded-3xl blur-xl transition-all duration-300" />
              
              <div className="relative p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl">
                      <Upload className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Tasarım Import Et</h2>
                      <p className="text-gray-400 text-sm">Görsel veya Figma</p>
                    </div>
                  </div>
                  
                  {/* Figma Import Button */}
                  <button
                    onClick={() => setShowFigmaModal(true)}
                    className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 38 57" fill="none">
                      <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
                      <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
                      <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
                      <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
                      <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
                    </svg>
                    <span>Figma</span>
                  </button>
                </div>

                {/* Drag & Drop Area */}
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  className={`
                    relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300
                    ${isDragging 
                      ? 'border-purple-500 bg-purple-500/10' 
                      : 'border-white/20 hover:border-purple-500/50 hover:bg-white/[0.02]'
                    }
                  `}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  
                  {preview ? (
                    <div className="relative">
                      <img 
                        src={preview} 
                        alt="Preview" 
                        className="w-full rounded-xl border-2 border-white/10 shadow-2xl"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setFile(null)
                          setPreview('')
                          setCode('')
                        }}
                        className="absolute top-3 right-3 p-2 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
                      >
                        <X className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="w-20 h-20 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <ImageIcon className="w-10 h-10 text-purple-400" />
                      </div>
                      <p className="text-white font-semibold text-lg mb-2">
                        Dosya sürükle & bırak
                      </p>
                      <p className="text-gray-400 text-sm mb-4">
                        veya göz at
                      </p>
                      <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-xl text-gray-300 hover:bg-white/10 transition-colors">
                        <Upload className="w-5 h-5" />
                        <span className="font-medium">Dosya Seç</span>
                      </div>
                    </div>
                  )}
                </div>

                {preview && (
                  <div className="mt-4 flex items-center gap-2 text-green-400 bg-green-400/10 border border-green-400/20 rounded-xl px-4 py-3">
                    <Check className="w-5 h-5" />
                    <span className="text-sm font-medium">Görsel yüklendi</span>
                  </div>
                )}
              </div>
            </div>

            {/* Framework Selection */}
            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Framework Seç</h3>
                  <p className="text-gray-400 text-sm">Kod formatını belirle</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {frameworks.map((fw) => (
                  <button
                    key={fw.value}
                    onClick={() => setFramework(fw.value)}
                    className={`
                      relative p-4 rounded-2xl border-2 transition-all duration-300 text-left
                      ${framework === fw.value
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05]'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{fw.icon}</span>
                      <div>
                        <div className="text-white font-bold text-sm">{fw.label.split('+')[0].trim()}</div>
                        <div className="text-gray-400 text-xs">+ Tailwind CSS</div>
                      </div>
                    </div>
                    {framework === fw.value && (
                      <div className="absolute top-3 right-3">
                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleAnalyze}
              disabled={!file || loading}
              className="group relative w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-500 hover:via-pink-500 hover:to-blue-500 text-white px-10 py-6 rounded-2xl text-lg font-black transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(168,85,247,0.6)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <div className="relative z-10 flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <Loader2 className="w-7 h-7 animate-spin" />
                    <span>Kod Üretiliyor...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-7 h-7 group-hover:rotate-12 transition-transform" />
                    <span>Kodu Üret</span>
                    <Zap className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            </button>

            {/* Source Badge */}
            {preview && (
              <div className="flex items-center justify-center gap-2 text-sm">
                {importType === 'figma' ? (
                  <div className="flex items-center gap-2 text-purple-400 bg-purple-400/10 border border-purple-400/20 rounded-xl px-4 py-2">
                    <svg className="w-4 h-4" viewBox="0 0 38 57" fill="currentColor">
                      <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z"/>
                    </svg>
                    <span className="font-semibold">Figma\'dan import edildi</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-green-400 bg-green-400/10 border border-green-400/20 rounded-xl px-4 py-2">
                    <ImageIcon className="w-4 h-4" />
                    <span className="font-semibold">Görsel yüklendi</span>
                  </div>
                )}
              </div>
            )}

            {/* Free Plan Notice */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-500/20 rounded-xl">
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h4 className="text-yellow-400 font-bold mb-1">Ücretsiz Plan</h4>
                  <p className="text-gray-300 text-sm mb-3">
                    Ayda 3 üretim hakkınız var. Sınırsız kullanım için Pro'ya yükseltin.
                  </p>
                  <Link 
                    href="/landing#fiyatlandırma"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105"
                  >
                    <Crown className="w-4 h-4" />
                    Pro'ya Geç
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Code Output */}
          <div className="space-y-6">
            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden min-h-[calc(100vh-12rem)]">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl">
                      <FileCode className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Üretilen Kod</h2>
                      <p className="text-gray-400 text-sm">Kullanıma hazır</p>
                    </div>
                  </div>
                  
                  {code && (
                    <div className="flex gap-3">
                      <button 
                        onClick={copyCode}
                        className="group relative p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 hover:scale-110"
                      >
                        {copied ? (
                          <Check className="w-5 h-5 text-green-400" />
                        ) : (
                          <Copy className="w-5 h-5 text-gray-400 group-hover:text-white" />
                        )}
                      </button>
                      <button 
                        onClick={downloadCode}
                        className="group relative p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 hover:scale-110"
                      >
                        <Download className="w-5 h-5 text-gray-400 group-hover:text-white" />
                      </button>
                    </div>
                  )}
                </div>

                {loading && (
                  <div className="text-center py-20">
                    <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-6"></div>
                    <h3 className="text-2xl font-bold text-white mb-2">AI Çalışıyor...</h3>
                    <p className="text-gray-400">
                      Görseliniz analiz ediliyor ve kod üretiliyor
                    </p>
                  </div>
                )}

                {!loading && code && (
                  <div className="space-y-6">
                    {/* Code Block */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          <Code2 className="w-5 h-5 text-purple-400" />
                          Kaynak Kod
                        </h3>
                        <span className="text-xs text-gray-400 bg-white/5 px-3 py-1 rounded-full">
                          {framework.toUpperCase()}
                        </span>
                      </div>
                      <div className="relative">
                        <pre className="bg-black/50 border border-white/10 p-6 rounded-2xl text-sm overflow-x-auto max-h-96 text-gray-300 font-mono">
                          <code>{code}</code>
                        </pre>
                      </div>
                    </div>

                    {/* Live Preview */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Eye className="w-5 h-5 text-blue-400" />
                        <h3 className="text-lg font-bold text-white">Canlı Önizleme</h3>
                      </div>
                      <div className="relative bg-white rounded-2xl border-2 border-white/10 overflow-hidden">
                        <iframe
                          srcDoc={code}
                          className="w-full h-[600px]"
                          title="Preview"
                          sandbox="allow-scripts"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {!loading && !code && (
                  <div className="text-center py-32">
                    <div className="w-24 h-24 bg-purple-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <Sparkles className="w-12 h-12 text-purple-400 animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Kod Üretmeye Hazır
                    </h3>
                    <p className="text-gray-400 max-w-md mx-auto">
                      Bir görsel yükleyin ve "Kodu Üret" butonuna tıklayın. 
                      AI teknolojisi görselinizi analiz edip temiz kod üretecek.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Figma Import Modal */}
        {showFigmaModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="relative max-w-2xl w-full">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-3xl blur-xl opacity-75"></div>
              
              <div className="relative bg-black border border-white/10 rounded-3xl p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-gradient-to-br from-pink-600 to-purple-600 rounded-2xl">
                      <svg className="w-8 h-8" viewBox="0 0 38 57" fill="white">
                        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
                        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
                        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
                        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
                        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white mb-1">Figma Import</h3>
                      <p className="text-gray-400">Figma tasarımınızı koda çevirin</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowFigmaModal(false)}
                    className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-400 hover:text-white" />
                  </button>
                </div>

                {/* Input */}
                <div className="mb-6">
                  <label className="block text-white font-bold mb-3">Figma File URL</label>
                  <input
                    type="url"
                    value={figmaUrl}
                    onChange={(e) => setFigmaUrl(e.target.value)}
                    placeholder="https://www.figma.com/file/..."
                    className="w-full bg-white/5 border border-white/10 text-white px-6 py-4 rounded-2xl focus:outline-none focus:border-purple-500 transition-colors placeholder:text-gray-500"
                  />
                </div>

                {/* Info Box */}
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 mb-6">
                  <h4 className="text-blue-400 font-bold mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Nasıl Kullanılır?
                  </h4>
                  <ol className="text-gray-300 text-sm space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold min-w-[20px]">1.</span>
                      <span>Figma'da dosyanızı açın</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold min-w-[20px]">2.</span>
                      <span>Share → <strong className="text-white">Copy link</strong> seçeneğini kullanın</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold min-w-[20px]">3.</span>
                      <span>URL'yi buraya yapıştırın ve import edin</span>
                    </li>
                  </ol>
                  <div className="mt-4 pt-4 border-t border-blue-500/20">
                    <p className="text-xs text-gray-400 mb-2">📋 <strong className="text-blue-300">Örnek URL formatı:</strong></p>
                    <code className="text-xs text-purple-300 bg-black/30 px-3 py-2 rounded-lg block overflow-x-auto">
                      https://www.figma.com/file/ABC123/Design-Name
                    </code>
                  </div>
                </div>

                {/* API Token Info */}
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-6 mb-6">
                  <h4 className="text-purple-400 font-bold mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Figma API Token Gerekli
                  </h4>
                  <p className="text-gray-300 text-sm mb-3">
                    Gerçek Figma dosyalarını import etmek için Personal Access Token gereklidir.
                  </p>
                  <div className="space-y-2 text-xs text-gray-400">
                    <p>• Token yoksa <strong className="text-purple-300">mock mode</strong> aktif olur</p>
                    <p>• Token almak için: <strong className="text-purple-300">Figma Settings → Personal Access Tokens</strong></p>
                    <p>• Token'ı <code className="bg-black/30 px-2 py-1 rounded text-purple-300">.env.local</code> dosyasına ekleyin</p>
                  </div>
                </div>

                {/* Pro Notice */}
                <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-6 mb-6">
                  <div className="flex items-center gap-3">
                    <Crown className="w-6 h-6 text-yellow-400" />
                    <div>
                      <h4 className="text-yellow-400 font-bold mb-1">Pro Özellik</h4>
                      <p className="text-gray-300 text-sm">Figma entegrasyonu Pro plan ile kullanılabilir</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowFigmaModal(false)}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white px-6 py-4 rounded-2xl font-bold transition-all duration-300 border border-white/10"
                  >
                    İptal
                  </button>
                  <button
                    onClick={handleFigmaImport}
                    disabled={!figmaUrl || loading}
                    className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white px-6 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Import Et
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Footer */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Zap, label: '< 15 saniye', sublabel: 'Hızlı üretim' },
            { icon: Code2, label: 'Temiz Kod', sublabel: 'Production ready' },
            { icon: Sparkles, label: 'AI Powered', sublabel: 'GPT-5 + Claude 4.5' },
            { icon: Check, label: 'Responsive', sublabel: 'Mobile-first' },
          ].map((feature, i) => (
            <div 
              key={i}
              className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.05] hover:border-purple-500/30 transition-all duration-300"
            >
              <feature.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-white font-bold">{feature.label}</div>
              <div className="text-gray-400 text-sm">{feature.sublabel}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-2 text-sm">
              <p className="text-gray-400">
                © 2025 ScreenToCode. Tüm hakları saklıdır.
              </p>
              <span className="hidden md:inline text-gray-600">•</span>
              <p className="text-gray-500 flex items-center gap-2">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">ArsuzTech</span>
                ürünüdür
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <Link href="/landing" className="hover:text-white transition-colors">Ana Sayfa</Link>
              <span>•</span>
              <Link href="/landing#fiyatlandırma" className="hover:text-white transition-colors">Fiyatlandırma</Link>
              <span>•</span>
              <Link href="/landing#sss" className="hover:text-white transition-colors">S.S.S</Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
