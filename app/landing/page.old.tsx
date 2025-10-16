'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Zap, Code, Sparkles, Check, Menu, X } from 'lucide-react'
import axios from 'axios'

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  const handleCheckout = async (plan: 'pro' | 'enterprise') => {
    setCheckoutLoading(true)
    try {
      const response = await axios.post('/api/iyzico/checkout', {
        plan,
        userEmail: '', // İsteğe bağlı: email input eklenebilir
        userName: 'Kullanıcı', // İsteğe bağlı: form eklenebilir
      })
      
      if (response.data.paymentPageUrl) {
        window.location.href = response.data.paymentPageUrl
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Ödeme başlatılamadı. Lütfen tekrar deneyin.')
    } finally {
      setCheckoutLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Zap className="w-8 h-8 text-indigo-500" />
              <span className="text-xl font-bold text-white">ScreenToCode</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition">Pricing</a>
              <a href="#faq" className="text-gray-300 hover:text-white transition">FAQ</a>
              <Link href="/login" className="text-gray-300 hover:text-white transition">Login</Link>
              <Link href="/app" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition">
                Start Free
              </Link>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block text-gray-300 hover:text-white">Features</a>
              <a href="#pricing" className="block text-gray-300 hover:text-white">Pricing</a>
              <a href="#faq" className="block text-gray-300 hover:text-white">FAQ</a>
              <Link href="/login" className="block text-gray-300 hover:text-white">Login</Link>
              <Link href="/app" className="block bg-indigo-600 text-white px-4 py-2 rounded-lg text-center">
                Start Free
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-indigo-300">AI-Powered Design to Code</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Turn Screenshots into
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"> Clean Code</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
            Upload any UI screenshot and get production-ready HTML, React, or Vue code in seconds. 
            Powered by GPT-4 Vision and Claude AI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/app" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition transform hover:scale-105">
              Try Free Now
            </Link>
            <a href="#pricing" className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition">
              View Pricing
            </a>
          </div>

          <div className="mt-16">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-2 inline-block">
              <img src="/demo-screenshot.png" alt="Demo" className="rounded-lg w-full max-w-4xl" 
                   onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/1200x600/1e293b/6366f1?text=Screenshot+to+Code+Demo' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Powerful Features</h2>
            <p className="text-gray-400 text-lg">Everything you need to convert designs to code</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Zap />, title: 'Lightning Fast', desc: 'Get your code in under 10 seconds' },
              { icon: <Code />, title: 'Multi-Framework', desc: 'Export to HTML, React, Vue, or Svelte' },
              { icon: <Sparkles />, title: 'AI-Powered', desc: 'Uses GPT-4 Vision + Claude 3.5' },
              { icon: <Check />, title: 'Responsive Code', desc: 'Mobile-first, production-ready code' },
              { icon: <Zap />, title: 'Tailwind CSS', desc: 'Modern utility-first CSS framework' },
              { icon: <Code />, title: 'Live Preview', desc: 'See results in real-time' },
            ].map((feature, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-indigo-500/50 transition">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-4 text-indigo-400">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Simple Pricing</h2>
            <p className="text-gray-400 text-lg">Start free, upgrade when you need more</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
              <p className="text-gray-400 mb-6">Perfect for trying out</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {['3 generations/month', 'HTML export only', 'Basic support', 'Watermark included'].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/app" className="block w-full bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg text-center transition">
                Start Free
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg p-8 transform scale-105 shadow-2xl">
              <div className="bg-white text-indigo-600 text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <p className="text-indigo-100 mb-6">For professionals</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">₺699</span>
                <span className="text-indigo-100">/ay</span>
              </div>
              <ul className="space-y-3 mb-8">
                {['Unlimited generations', 'All frameworks (HTML, React, Vue)', 'Priority support', 'No watermark', 'Export to ZIP', 'Custom design systems'].map((item, i) => (
                  <li key={i} className="flex items-center text-white">
                    <Check className="w-5 h-5 text-green-300 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handleCheckout('pro')}
                className="block w-full bg-white text-indigo-600 hover:bg-gray-100 py-3 rounded-lg text-center font-semibold transition"
              >
                Start Pro Trial
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
              <p className="text-gray-400 mb-6">For teams</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">₺3,499</span>
                <span className="text-gray-400">/ay</span>
              </div>
              <ul className="space-y-3 mb-8">
                {['Everything in Pro', 'Team collaboration', 'API access', 'Custom training', 'Dedicated support', 'SLA guarantee'].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="mailto:sales@screentocode.ai" className="block w-full bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg text-center transition">
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Loved by Developers</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Chen', role: 'Frontend Dev', text: 'Saves me hours every week. The code quality is impressive!' },
              { name: 'Mike Johnson', role: 'Designer', text: 'Finally I can turn my designs into code without bothering developers.' },
              { name: 'Alex Rodriguez', role: 'Startup Founder', text: 'Best $19/month I spend. Shipped my MVP in days, not months.' },
            ].map((testimonial, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Ship Faster?</h2>
          <p className="text-indigo-100 text-lg mb-8">Join 10,000+ developers using ScreenToCode</p>
          <Link href="/app" className="inline-block bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition transform hover:scale-105">
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="w-6 h-6 text-indigo-500" />
                <span className="text-lg font-bold text-white">ScreenToCode</span>
              </div>
              <p className="text-gray-400 text-sm">AI-powered screenshot to code converter</p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                <li><a href="/docs" className="hover:text-white">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="/about" className="hover:text-white">About</a></li>
                <li><a href="/blog" className="hover:text-white">Blog</a></li>
                <li><a href="mailto:support@screentocode.ai" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="/privacy" className="hover:text-white">Privacy</a></li>
                <li><a href="/terms" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2025 ScreenToCode. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
