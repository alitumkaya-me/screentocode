'use client'

import { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { ArrowLeft, Download, Copy } from 'lucide-react'

export default function AppPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [code, setCode] = useState<string>('')
  const [framework, setFramework] = useState<string>('html')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  const handleAnalyze = async () => {
    if (!file) return
    
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const uploadRes = await axios.post('/api/upload', formData)
      const imageUrl = uploadRes.data.url
      
      const visionRes = await axios.post('/api/vision', { imageUrl })
      const visionData = visionRes.data
      
      const generateRes = await axios.post('/api/generate', { vision: visionData, framework })
      setCode(generateRes.data.code)
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred. Check console for details.')
    } finally {
      setLoading(false)
    }
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    alert('Code copied to clipboard!')
  }

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `generated-${Date.now()}.html`
    a.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/landing" className="flex items-center space-x-2 text-gray-400 hover:text-white transition">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-2xl font-bold">Screenshot to Code</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Upload */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">Upload Screenshot</h2>
            
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 mb-4"
            />
            
            {preview && (
              <div className="mt-4 mb-4">
                <img src={preview} alt="Preview" className="w-full rounded border-2 border-gray-700" />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Export Framework</label>
              <select 
                value={framework} 
                onChange={(e) => setFramework(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
              >
                <option value="html">HTML + Tailwind</option>
                <option value="react">React + Tailwind</option>
                <option value="vue">Vue + Tailwind</option>
                <option value="svelte">Svelte + Tailwind</option>
              </select>
            </div>
            
            <button
              onClick={handleAnalyze}
              disabled={!file || loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              {loading ? 'Analyzing...' : 'Analyze & Generate Code'}
            </button>

            <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-sm text-yellow-200">
                💡 <strong>Free plan:</strong> 3 generations/month. <Link href="/landing#pricing" className="underline">Upgrade for unlimited</Link>
              </p>
            </div>
          </div>
          
          {/* Right Panel - Code Output */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Generated Code</h2>
              {code && (
                <div className="flex space-x-2">
                  <button onClick={copyCode} className="p-2 bg-gray-700 hover:bg-gray-600 rounded transition">
                    <Copy className="w-5 h-5" />
                  </button>
                  <button onClick={downloadCode} className="p-2 bg-gray-700 hover:bg-gray-600 rounded transition">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
            
            {code ? (
              <>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-auto max-h-64 mb-4 text-gray-300">
                  <code>{code}</code>
                </pre>
                
                <h3 className="text-xl font-semibold mb-2">Live Preview</h3>
                <iframe
                  srcDoc={code}
                  className="w-full h-96 bg-white rounded border-2 border-gray-700"
                  title="Preview"
                />
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-400">Upload an image and click analyze to see the generated code.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
