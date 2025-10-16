import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token, plan } = req.query

  if (!token) {
    return res.status(400).json({ error: 'token is required' })
  }

  const planDetails: Record<string, { name: string; price: string; features: string[] }> = {
    pro: { 
      name: 'Pro Plan', 
      price: '699.00',
      features: ['Sınırsız üretim', 'Tüm frameworkler', 'Öncelikli destek']
    },
    enterprise: { 
      name: 'Enterprise Plan', 
      price: '3,499.00',
      features: ['Pro + Ekip işbirliği', 'API erişimi', 'Özel destek']
    },
  }

  const selectedPlan = planDetails[plan as string] || planDetails.pro

  // Ultra Profesyonel Mock Ödeme Sayfası
  const html = `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Güvenli Ödeme - ScreenToCode</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      </style>
    </head>
    <body class="bg-black text-white overflow-hidden">
      <!-- Animated Background -->
      <div class="fixed inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px] animate-pulse"></div>
        <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-[120px] animate-pulse" style="animation-delay: 700ms;"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-[150px] animate-pulse" style="animation-delay: 1400ms;"></div>
      </div>

      <div class="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-6">
        <div class="max-w-2xl w-full">
          <!-- TEST MODE Badge -->
          <div class="mb-6 text-center">
            <div class="inline-flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/30 px-6 py-3 rounded-full">
              <svg class="w-5 h-5 text-yellow-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
              <span class="text-yellow-400 font-bold text-sm">TEST MODU - İyzico Simülasyonu</span>
            </div>
          </div>

          <!-- Payment Card -->
          <div class="relative group">
            <!-- Glow Effect -->
            <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-300"></div>
            
            <div class="relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden">
              <!-- Header -->
              <div class="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 px-8 py-6">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-14 h-14 bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center shadow-2xl">
                      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                      </svg>
                    </div>
                    <div>
                      <h1 class="text-3xl font-black text-white mb-1">ScreenToCode</h1>
                      <div class="flex items-center gap-3">
                        <p class="text-purple-100 text-sm font-bold">Güvenli Ödeme</p>
                        <span class="text-purple-200 text-xs">•</span>
                        <div class="flex items-center gap-1">
                          <svg class="w-4 h-4 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                          </svg>
                          <span class="text-green-300 text-xs font-bold">256-bit SSL</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="hidden md:flex items-center gap-3">
                    <div class="flex flex-col items-end">
                      <span class="text-white/90 text-xs font-medium">Powered by</span>
                      <span class="text-white font-black text-lg tracking-wider">İYZİCO</span>
                    </div>
                    <svg class="w-12 h-12 text-white/90" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div class="p-8">
                <!-- Plan Details -->
                <div class="bg-white/[0.02] border border-white/10 rounded-2xl p-6 mb-6">
                  <div class="flex items-start justify-between mb-4">
                    <div>
                      <h2 class="text-2xl font-bold text-white mb-1">${selectedPlan.name}</h2>
                      <p class="text-gray-400 text-sm">ScreenToCode Abonelik</p>
                    </div>
                    <div class="text-right">
                      <div class="text-3xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">₺${selectedPlan.price}</div>
                      <div class="text-gray-400 text-sm font-medium">/ay</div>
                    </div>
                  </div>
                  
                  <div class="space-y-2">
                    ${selectedPlan.features.map(feature => `
                      <div class="flex items-center gap-2 text-gray-300">
                        <svg class="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                        <span class="text-sm">${feature}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <!-- Payment Info -->
                <div class="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 mb-6">
                  <div class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <div>
                      <h3 class="text-blue-400 font-bold mb-1 text-sm">Test Modunda Ödeme Simülasyonu</h3>
                      <p class="text-gray-400 text-xs leading-relaxed">
                        Bu sayfada gerçek bir ödeme yapılmayacak. İyzico hesabınız olmadan sistemin nasıl çalıştığını test edebilirsiniz.
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="space-y-4">
                  <!-- Success Button -->
                  <button 
                    onclick="handlePayment('success')" 
                    id="successBtn"
                    class="group relative w-full overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-8 py-5 rounded-2xl font-black text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(34,197,94,0.5)] flex items-center justify-center gap-3"
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>Ödemeyi Onayla (Test - Başarılı)</span>
                    <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </button>

                  <!-- Fail Button -->
                  <button 
                    onclick="handlePayment('failed')" 
                    id="failBtn"
                    class="group w-full bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white px-8 py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-[1.02] border-2 border-white/10 hover:border-red-500/50 flex items-center justify-center gap-3"
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>Ödemeyi İptal Et (Test - Başarısız)</span>
                  </button>
                </div>

                <!-- Security Badge -->
                <div class="mt-8 flex items-center justify-center gap-6 text-gray-500 text-xs">
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                    </svg>
                    <span>SSL Güvenli</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span>PCI DSS Uyumlu</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer Info -->
          <div class="mt-6 space-y-3">
            <div class="text-center">
              <p class="text-gray-500 text-xs">
                Powered by <span class="text-purple-400 font-semibold">ScreenToCode</span>
              </p>
            </div>
            <div class="pt-3 border-t border-white/5 text-center">
              <p class="text-gray-600 text-xs flex items-center justify-center gap-2">
                <span>© 2025 ScreenToCode</span>
                <span>•</span>
                <span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">ArsuzTech</span>
                <span>ürünüdür</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading Overlay -->
      <div id="loadingOverlay" class="hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 text-center max-w-md">
          <div class="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-6"></div>
          <h3 class="text-2xl font-bold text-white mb-2">Ödeme İşleniyor...</h3>
          <p class="text-gray-400">Lütfen bekleyin</p>
        </div>
      </div>

      <script>
        function handlePayment(status) {
          // Disable buttons
          document.getElementById('successBtn').disabled = true
          document.getElementById('failBtn').disabled = true
          
          // Show loading
          document.getElementById('loadingOverlay').classList.remove('hidden')
          
          // Simulate processing delay
          setTimeout(() => {
            // Prepare form data
            const form = document.createElement('form')
            form.method = 'POST'
            form.action = '${process.env.NEXT_PUBLIC_BASE_URL}/api/iyzico/callback'
            
            const tokenInput = document.createElement('input')
            tokenInput.type = 'hidden'
            tokenInput.name = 'token'
            tokenInput.value = '${token}'
            form.appendChild(tokenInput)
            
            const statusInput = document.createElement('input')
            statusInput.type = 'hidden'
            statusInput.name = 'status'
            statusInput.value = status
            form.appendChild(statusInput)
            
            document.body.appendChild(form)
            form.submit()
          }, 1500)
        }

        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            handlePayment('success')
          } else if (e.key === 'Escape') {
            handlePayment('failed')
          }
        })
      </script>
    </body>
    </html>
  `

  res.setHeader('Content-Type', 'text/html')
  res.status(200).send(html)
}
