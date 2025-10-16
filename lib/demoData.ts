// Demo screenshots ve kodları
export const demoScreenshots = [
  {
    id: 'landing-modern',
    name: 'Modern Landing Page',
    description: 'Gradient background, hero section, feature cards with animations',
    category: 'Landing Page',
    thumbnail: 'https://images.unsplash.com/photo-1618004912476-29818d81ae2e?w=1200&h=675&fit=crop&q=80',
    fullImage: 'https://images.unsplash.com/photo-1618004912476-29818d81ae2e?w=1600&h=900&fit=crop&q=90',
    previewCode: `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Modern Landing Page</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @keyframes gradient {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-gradient { animation: gradient 6s ease infinite; background-size: 200% 200%; }
    .animate-fade-in { animation: fadeIn 0.8s ease-out; }
  </style>
</head>
<body class="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen text-white">
  
  <!-- Navbar -->
  <nav class="fixed top-0 w-full bg-black/30 backdrop-blur-xl border-b border-white/10 z-50">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <div class="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        BrandName
      </div>
      <div class="hidden md:flex gap-8">
        <a href="#features" class="hover:text-purple-400 transition">Features</a>
        <a href="#pricing" class="hover:text-purple-400 transition">Pricing</a>
        <a href="#about" class="hover:text-purple-400 transition">About</a>
      </div>
      <button class="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-lg font-semibold hover:scale-105 transition">
        Get Started
      </button>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="container mx-auto px-6 pt-32 pb-20 text-center animate-fade-in">
    <h1 class="text-6xl md:text-8xl font-black mb-6 leading-tight">
      <span class="block">Build Amazing</span>
      <span class="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
        Digital Products
      </span>
    </h1>
    <p class="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
      Transform your ideas into reality with our powerful platform. Fast, secure, and scalable.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <button class="bg-gradient-to-r from-purple-600 to-pink-600 px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition shadow-lg shadow-purple-500/50">
        Start Free Trial
      </button>
      <button class="bg-white/10 backdrop-blur-sm border border-white/20 px-10 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition">
        Watch Demo
      </button>
    </div>
  </section>

  <!-- Features Grid -->
  <section id="features" class="container mx-auto px-6 py-20">
    <h2 class="text-5xl font-black text-center mb-16">
      <span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Powerful Features
      </span>
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition">
        <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl mb-4">
          ⚡
        </div>
        <h3 class="text-2xl font-bold mb-3">Lightning Fast</h3>
        <p class="text-gray-400">Blazing fast performance that keeps your users engaged and happy.</p>
      </div>
      <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition">
        <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-2xl mb-4">
          🛡️
        </div>
        <h3 class="text-2xl font-bold mb-3">Secure by Default</h3>
        <p class="text-gray-400">Enterprise-grade security to protect your data and privacy.</p>
      </div>
      <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition">
        <div class="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center text-2xl mb-4">
          🚀
        </div>
        <h3 class="text-2xl font-bold mb-3">Easy to Scale</h3>
        <p class="text-gray-400">Grow from zero to millions of users without breaking a sweat.</p>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="container mx-auto px-6 py-20">
    <div class="bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 backdrop-blur-sm border border-white/10 rounded-3xl p-12 text-center">
      <h2 class="text-4xl md:text-5xl font-black mb-6">Ready to Get Started?</h2>
      <p class="text-xl text-gray-300 mb-8">Join thousands of developers building amazing things</p>
      <button class="bg-gradient-to-r from-purple-600 to-pink-600 px-12 py-4 rounded-xl font-bold text-lg hover:scale-105 transition shadow-lg shadow-purple-500/50">
        Start Building Now →
      </button>
    </div>
  </section>

  <!-- Footer -->
  <footer class="border-t border-white/10 py-12">
    <div class="container mx-auto px-6 text-center text-gray-400">
      <p>© 2025 BrandName. All rights reserved.</p>
      <p class="text-sm mt-2">Generated by ScreenToCode AI</p>
    </div>
  </footer>

</body>
</html>`,
    tags: ['gradient', 'modern', 'hero', 'features', 'cta']
  },
  
  {
    id: 'dashboard-saas',
    name: 'SaaS Dashboard',
    description: 'Sidebar navigation, analytics cards, interactive charts',
    category: 'Dashboard',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop&q=80',
    fullImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&h=900&fit=crop&q=90',
    previewCode: `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SaaS Dashboard</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-900 text-white">

  <div class="flex h-screen">
    <!-- Sidebar -->
    <aside class="w-64 bg-slate-800 border-r border-slate-700">
      <div class="p-6">
        <h2 class="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Dashboard
        </h2>
      </div>
      <nav class="px-4 space-y-2">
        <a href="#" class="flex items-center gap-3 px-4 py-3 bg-purple-600 rounded-lg font-semibold">
          <span>📊</span> Overview
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 hover:bg-slate-700 rounded-lg transition">
          <span>📈</span> Analytics
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 hover:bg-slate-700 rounded-lg transition">
          <span>👥</span> Users
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 hover:bg-slate-700 rounded-lg transition">
          <span>⚙️</span> Settings
        </a>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto">
      <!-- Header -->
      <header class="bg-slate-800 border-b border-slate-700 px-8 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold">Overview</h1>
        <button class="bg-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition">
          New Project
        </button>
      </header>

      <!-- Stats Grid -->
      <div class="p-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div class="text-sm text-gray-400 mb-2">Total Users</div>
            <div class="text-3xl font-bold">12,345</div>
            <div class="text-sm text-green-400 mt-2">↑ 12% from last month</div>
          </div>
          <div class="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div class="text-sm text-gray-400 mb-2">Revenue</div>
            <div class="text-3xl font-bold">$54,320</div>
            <div class="text-sm text-green-400 mt-2">↑ 8% from last month</div>
          </div>
          <div class="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div class="text-sm text-gray-400 mb-2">Active Projects</div>
            <div class="text-3xl font-bold">89</div>
            <div class="text-sm text-yellow-400 mt-2">→ No change</div>
          </div>
          <div class="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div class="text-sm text-gray-400 mb-2">Conversion Rate</div>
            <div class="text-3xl font-bold">3.2%</div>
            <div class="text-sm text-red-400 mt-2">↓ 2% from last month</div>
          </div>
        </div>

        <!-- Chart Placeholder -->
        <div class="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 class="text-xl font-bold mb-4">Revenue Overview</h3>
          <div class="h-64 bg-slate-700/50 rounded-lg flex items-center justify-center">
            <div class="text-center text-gray-500">
              <div class="text-4xl mb-2">📊</div>
              <div>Chart visualization would go here</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>

</body>
</html>`,
    tags: ['dashboard', 'sidebar', 'stats', 'admin', 'saas']
  },

  {
    id: 'ecommerce-product',
    name: 'E-commerce Product Page',
    description: 'Product gallery, pricing, cart system, customer reviews',
    category: 'E-commerce',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&fit=crop&q=80',
    fullImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=900&fit=crop&q=90',
    previewCode: `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Product Page</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">

  <!-- Navbar -->
  <nav class="bg-white border-b sticky top-0 z-50">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <div class="text-2xl font-bold">ShopName</div>
      <div class="flex items-center gap-6">
        <a href="#" class="hover:text-purple-600">Products</a>
        <a href="#" class="hover:text-purple-600">Categories</a>
        <button class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
          🛒 Cart (0)
        </button>
      </div>
    </div>
  </nav>

  <!-- Product Section -->
  <div class="container mx-auto px-6 py-12">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      
      <!-- Product Images -->
      <div>
        <div class="bg-white rounded-2xl overflow-hidden shadow-lg mb-4">
          <div class="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
            <div class="text-8xl">📱</div>
          </div>
        </div>
        <div class="grid grid-cols-4 gap-4">
          <div class="aspect-square bg-white rounded-lg overflow-hidden border-2 border-purple-600 cursor-pointer">
            <div class="h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">📱</div>
          </div>
          <div class="aspect-square bg-white rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:border-purple-600">
            <div class="h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">📱</div>
          </div>
          <div class="aspect-square bg-white rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:border-purple-600">
            <div class="h-full bg-gradient-to-br from-pink-100 to-orange-100 flex items-center justify-center">📱</div>
          </div>
          <div class="aspect-square bg-white rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:border-purple-600">
            <div class="h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">📱</div>
          </div>
        </div>
      </div>

      <!-- Product Info -->
      <div>
        <div class="mb-4">
          <span class="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-semibold">New Arrival</span>
        </div>
        <h1 class="text-4xl font-bold mb-4">Premium Wireless Headphones</h1>
        <div class="flex items-center gap-4 mb-6">
          <div class="flex text-yellow-400">⭐⭐⭐⭐⭐</div>
          <div class="text-gray-600">4.9 (128 reviews)</div>
        </div>
        <div class="text-4xl font-bold text-purple-600 mb-6">$299.99</div>
        
        <div class="mb-6">
          <h3 class="font-semibold mb-2">Color</h3>
          <div class="flex gap-3">
            <button class="w-10 h-10 rounded-full bg-black border-2 border-purple-600"></button>
            <button class="w-10 h-10 rounded-full bg-white border-2 border-gray-300"></button>
            <button class="w-10 h-10 rounded-full bg-blue-500 border-2 border-gray-300"></button>
            <button class="w-10 h-10 rounded-full bg-pink-500 border-2 border-gray-300"></button>
          </div>
        </div>

        <div class="mb-8">
          <h3 class="font-semibold mb-2">Description</h3>
          <p class="text-gray-600 leading-relaxed">
            Experience premium sound quality with our latest wireless headphones. 
            Featuring active noise cancellation, 30-hour battery life, and premium comfort 
            for all-day wear. Perfect for music lovers and professionals alike.
          </p>
        </div>

        <div class="flex gap-4 mb-6">
          <button class="flex-1 bg-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-purple-700 transition">
            Add to Cart
          </button>
          <button class="px-6 border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition">
            ❤️
          </button>
        </div>

        <div class="grid grid-cols-3 gap-4 text-center text-sm">
          <div class="bg-gray-100 rounded-lg p-4">
            <div class="text-2xl mb-1">🚚</div>
            <div class="font-semibold">Free Shipping</div>
          </div>
          <div class="bg-gray-100 rounded-lg p-4">
            <div class="text-2xl mb-1">↩️</div>
            <div class="font-semibold">30-Day Returns</div>
          </div>
          <div class="bg-gray-100 rounded-lg p-4">
            <div class="text-2xl mb-1">🛡️</div>
            <div class="font-semibold">1-Year Warranty</div>
          </div>
        </div>
      </div>
    </div>
  </div>

</body>
</html>`,
    tags: ['ecommerce', 'product', 'shopping', 'cart']
  }
]

export type DemoScreenshot = typeof demoScreenshots[number]
