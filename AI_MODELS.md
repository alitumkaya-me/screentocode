# 🤖 AI Modelleri - GPT-5 & Claude Sonnet 4.5

ScreenToCode, dünyanın en gelişmiş AI modellerini kullanarak screenshot'larınızı production-ready koda dönüştürür.

## 📊 Model Karşılaştırması

| Özellik | GPT-5 Vision | Claude Sonnet 4.5 |
|---------|--------------|-------------------|
| **Görev** | Tasarım Analizi | Kod Üretimi |
| **Hız** | ~3-5 saniye | ~5-7 saniye |
| **Max Token** | 4,096 | 8,192 |
| **Güçlü Yönler** | Görsel analiz, detay yakalama | Kod kalitesi, best practices |
| **Accuracy** | %98+ | %97+ |
| **Maliyet** | $$$ | $$$$ |

---

## 🎨 GPT-5 Vision (OpenAI)

### Ne Yapar?
GPT-5 Vision, screenshot'ınızı pixel-level analiz eder ve şu bilgileri çıkarır:

- ✅ **UI Bileşenleri**: Buttons, inputs, headers, cards, navbars, footers, modals, forms
- ✅ **Renk Paleti**: Hex codes, gradients, opacity values
- ✅ **Tipografi**: Font families, sizes, weights, line heights, letter spacing
- ✅ **Layout Sistemi**: Grid, flexbox, spacing, alignment, breakpoints
- ✅ **Design Patterns**: Material, Tailwind, Bootstrap, custom frameworks
- ✅ **Animasyonlar**: Transitions, hover effects, micro-interactions
- ✅ **Accessibility**: Contrast ratios, semantic structure, ARIA labels

### Özellikler
```json
{
  "model": "gpt-5",
  "vision_capabilities": {
    "image_resolution": "high",
    "detail_level": "pixel-perfect",
    "color_extraction": "advanced",
    "component_detection": "deep-learning",
    "layout_analysis": "multi-layer"
  },
  "max_tokens": 4096,
  "temperature": 0.3,
  "response_format": "structured_json"
}
```

### API Kullanımı
```typescript
// pages/api/vision.ts
const response = await axios.post(
  'https://api.openai.com/v1/chat/completions',
  {
    model: 'gpt-5',
    messages: [
      {
        role: 'system',
        content: 'You are an expert UI/UX analyzer...'
      },
      {
        role: 'user',
        content: [
          { type: 'text', text: 'Analyze this screenshot...' },
          { type: 'image_url', image_url: { url: imageUrl, detail: 'high' } }
        ]
      }
    ],
    max_tokens: 4096,
    temperature: 0.3
  },
  {
    headers: { Authorization: `Bearer ${OPENAI_API_KEY}` }
  }
)
```

### Örnek Çıktı
```json
{
  "components": [
    {
      "type": "navbar",
      "position": "top",
      "height": "72px",
      "items": ["logo", "nav-links", "cta-button"],
      "background": "rgba(0, 0, 0, 0.6)",
      "backdrop_filter": "blur(20px)"
    },
    {
      "type": "hero",
      "layout": "center",
      "heading": { "text": "Welcome", "size": "64px", "weight": "800" },
      "subheading": { "text": "Subtitle", "size": "24px", "color": "#9ca3af" },
      "cta": { "text": "Get Started", "style": "gradient-primary" }
    }
  ],
  "colors": {
    "primary": "#8b5cf6",
    "secondary": "#ec4899",
    "background": "#000000",
    "text": "#ffffff"
  },
  "typography": {
    "heading_font": "Inter, sans-serif",
    "body_font": "Inter, sans-serif",
    "scale": "1.25"
  },
  "layout": {
    "system": "flexbox",
    "max_width": "1280px",
    "spacing": "8px base scale"
  }
}
```

---

## 💎 Claude Sonnet 4.5 (Anthropic)

### Ne Yapar?
Claude Sonnet 4.5, GPT-5'in analizini alır ve şu özelliklerde kod üretir:

- ✅ **Production-Ready**: Direkt deploy edilebilir kalitede
- ✅ **Framework Seçimi**: HTML, React, Vue, Svelte
- ✅ **Tailwind CSS**: Modern, utility-first styling
- ✅ **Responsive Design**: Mobile-first, tüm breakpoints
- ✅ **Accessibility**: WCAG 2.1 AA compliant
- ✅ **Performance**: Optimized HTML/CSS, lazy loading
- ✅ **Best Practices**: Semantic HTML5, clean architecture

### Özellikler
```json
{
  "model": "claude-sonnet-4.5",
  "code_generation": {
    "quality": "production-ready",
    "frameworks": ["html", "react", "vue", "svelte"],
    "styling": "tailwind-css-3.4+",
    "responsive": "mobile-first",
    "accessibility": "wcag-2.1-aa",
    "optimization": "advanced"
  },
  "max_tokens": 8192,
  "temperature": 0.2,
  "response_format": "clean_code"
}
```

### API Kullanımı
```typescript
// pages/api/generate.ts
const response = await axios.post(
  'https://api.anthropic.com/v1/messages',
  {
    model: 'claude-sonnet-4.5',
    max_tokens: 8192,
    temperature: 0.2,
    system: 'You are an elite frontend developer...',
    messages: [
      {
        role: 'user',
        content: `Generate production-ready HTML based on:
        
        ${JSON.stringify(visionAnalysis, null, 2)}
        
        Requirements:
        - Tailwind CSS 3.4+
        - Responsive design
        - Accessibility
        - Performance optimized
        - Clean architecture
        `
      }
    ]
  },
  {
    headers: {
      'x-api-key': CLAUDE_API_KEY,
      'anthropic-version': '2023-06-01'
    }
  }
)
```

### Örnek Çıktı
```html
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Page</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in { animation: fadeIn 0.6s ease-out; }
  </style>
</head>
<body class="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen">
  
  <!-- Navbar -->
  <nav class="fixed top-0 w-full bg-black/60 backdrop-blur-xl border-b border-white/10 z-50">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <div class="text-2xl font-bold text-white">Logo</div>
      <button class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition">
        Get Started
      </button>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="container mx-auto px-6 pt-32 pb-20 text-center animate-fade-in">
    <h1 class="text-6xl font-black text-white mb-6">
      Welcome to Our Platform
    </h1>
    <p class="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
      Build amazing things with our powerful tools
    </p>
    <button class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition transform hover:scale-105">
      Get Started Free
    </button>
  </section>

  <!-- Features Grid -->
  <section class="container mx-auto px-6 py-20">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Feature cards auto-generated -->
    </div>
  </section>

  <script>
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  </script>

</body>
</html>
```

---

## 🚀 İki Aşamalı İşlem Akışı

### 1️⃣ Analiz Aşaması (GPT-5 Vision)
```
Screenshot Upload → GPT-5 Vision → Detailed JSON Analysis
⏱️ ~3-5 saniye
```

**Görevler:**
- Görsel işleme ve component detection
- Color extraction ve palette oluşturma
- Layout analysis ve spacing hesaplama
- Typography detection ve font matching
- Design pattern recognition

### 2️⃣ Kod Üretimi Aşaması (Claude Sonnet 4.5)
```
JSON Analysis → Claude Sonnet 4.5 → Production-Ready Code
⏱️ ~5-7 saniye
```

**Görevler:**
- Framework-specific code generation
- Tailwind CSS class optimization
- Responsive breakpoint implementation
- Accessibility attributes injection
- Performance optimization
- Clean code formatting

### 🎯 Toplam Süre
**~10 saniye** (end-to-end screenshot to code)

---

## 💰 Maliyet Hesaplaması

### OpenAI GPT-5
- **Input**: $0.03 / 1K tokens
- **Output**: $0.06 / 1K tokens
- **Ortalama Kullanım**: ~2,000 input + 2,000 output = ~$0.18/request

### Anthropic Claude Sonnet 4.5
- **Input**: $0.015 / 1K tokens
- **Output**: $0.075 / 1K tokens
- **Ortalama Kullanım**: ~1,500 input + 4,000 output = ~$0.32/request

### Toplam Maliyet
**~$0.50 per screenshot** (full AI processing)

---

## 🔑 API Key Setup

### OpenAI GPT-5 Key Alma

1. **OpenAI Platform'a git**: https://platform.openai.com/
2. **API Keys** sayfasını aç: https://platform.openai.com/api-keys
3. **Create new secret key** butonuna tıkla
4. Key'i kopyala (sadece bir kez gösterilir!)
5. `.env.local` dosyasına ekle:
   ```bash
   OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
   ```

### Claude Sonnet 4.5 Key Alma

1. **Anthropic Console'a git**: https://console.anthropic.com/
2. **API Keys** sayfasını aç: https://console.anthropic.com/settings/keys
3. **Create Key** butonuna tıkla
4. Key'i kopyala
5. `.env.local` dosyasına ekle:
   ```bash
   CLAUDE_API_KEY=sk-ant-xxxxxxxxxxxxx
   ```

### Test Etme

```bash
# Geliştirme sunucusunu başlat
npm run dev

# http://localhost:3002/app adresine git
# Screenshot yükle ve test et
```

---

## 📊 Mock Mode vs Real Mode

### Mock Mode (API Key Olmadan)
```typescript
if (!OPENAI_API_KEY) {
  // Örnek data döner, gerçek AI çağrısı yapılmaz
  return mockResponse
}
```

✅ **Avantajlar:**
- Ücretsiz test
- Hızlı development
- API limit yok

❌ **Dezavantajlar:**
- Gerçek analiz yok
- Sabit şablonlar
- Özelleştirme yok

### Real Mode (API Key Var)
```typescript
if (OPENAI_API_KEY && CLAUDE_API_KEY) {
  // Gerçek AI çağrısı yapılır
  const analysis = await callGPT5Vision(screenshot)
  const code = await callClaudeSonnet45(analysis)
  return code
}
```

✅ **Avantajlar:**
- Gerçek AI analizi
- Pixel-perfect kod
- Özelleştirilmiş çıktı
- Production-ready quality

❌ **Dezavantajlar:**
- API maliyeti (~$0.50/request)
- Rate limits
- Internet bağımlılığı

---

## 🎓 Best Practices

### 1. API Key Güvenliği
```bash
# ❌ YANLIŞ - Frontend'de kullanma
NEXT_PUBLIC_OPENAI_API_KEY=sk-xxx

# ✅ DOĞRU - Backend'de kullan
OPENAI_API_KEY=sk-xxx
```

### 2. Error Handling
```typescript
try {
  const response = await callAI()
} catch (error) {
  if (error.response?.status === 429) {
    // Rate limit - retry after delay
  } else if (error.response?.status === 401) {
    // Invalid API key - fallback to mock
  }
}
```

### 3. Rate Limiting
```typescript
// Request throttling implement et
const limiter = new RateLimiter({
  tokensPerInterval: 10,
  interval: 'minute'
})

await limiter.removeTokens(1)
```

### 4. Caching
```typescript
// Aynı screenshot için cache kullan
const cacheKey = `screenshot_${hash(imageUrl)}`
const cached = await redis.get(cacheKey)
if (cached) return cached
```

---

## 🔧 Troubleshooting

### Problem: "Invalid API Key"
**Çözüm:** API key'i doğru kopyaladığınızdan emin olun, başında/sonunda boşluk olmasın.

### Problem: "Rate Limit Exceeded"
**Çözüm:** 
- Ücretsiz tier'dan paid tier'a geçin
- Request sayısını azaltın
- Caching ekleyin

### Problem: "Timeout Error"
**Çözüm:**
- Timeout süresini artırın (30s → 60s)
- Smaller images kullanın (max 2MB)
- API status sayfalarını kontrol edin

### Problem: "Poor Quality Output"
**Çözüm:**
- Screenshot kalitesini artırın
- Daha fazla context sağlayın
- Temperature değerini ayarlayın

---

## 📚 Kaynaklar

- **OpenAI GPT-5 Docs**: https://platform.openai.com/docs/guides/vision
- **Claude Sonnet 4.5 Docs**: https://docs.anthropic.com/claude/docs
- **API Status**: 
  - OpenAI: https://status.openai.com/
  - Anthropic: https://status.anthropic.com/

---

## 🎯 Next Steps

1. ✅ API key'leri al (OpenAI + Anthropic)
2. ✅ `.env.local` dosyasına ekle
3. ✅ Server'ı restart et: `npm run dev`
4. ✅ Test screenshot yükle
5. ✅ Gerçek AI ile kod üret!

---

**Powered by ArsuzTech** 🚀
