# 🎁 Ücretsiz Demo Sistemi - Dokümantasyon

## 📋 Sistem Özeti

### Nasıl Çalışıyor?
1. **3 Ücretsiz Deneme**: Her kullanıcı 3 kez ücretsiz demo kodu üretebilir
2. **Hazır Demo'lar**: Kullanıcı kendi screenshot'ını yükleyemez, sadece hazır demo'ları seçer
3. **Anında Kod**: Seçilen demo için önceden hazırlanmış production-ready kod gösterilir
4. **LocalStorage Takibi**: Kullanım localStorage'da saklanır
5. **Upgrade Yönlendirmesi**: 3 deneme bitince premium'a yönlendirir

---

## 🎯 Özellikler

### ✅ Ücretsiz Sürüm (Demo Mode)
- ✅ 3 ücretsiz deneme hakkı
- ✅ 3 hazır demo tasarım:
  - **Modern Landing Page** (Hero, Features, CTA)
  - **SaaS Dashboard** (Sidebar, Stats, Charts)
  - **E-commerce Product** (Gallery, Cart, Reviews)
- ✅ Anında kod üretimi (simülasyon: 3 saniye)
- ✅ Kod kopyalama ve indirme
- ✅ Production-ready HTML/CSS/JS

### 🔒 Premium Sürüm (Ödeme Sonrası)
- ✅ Sınırsız kod üretimi
- ✅ Kendi screenshot'larını yükleyebilme
- ✅ Figma URL import
- ✅ Real AI (GPT-5 + Claude Sonnet 4.5)
- ✅ Framework seçimi (HTML, React, Vue, Svelte)
- ✅ Öncelikli destek

---

## 📁 Dosya Yapısı

### Yeni Dosyalar

#### `lib/demoData.ts`
```typescript
// 3 hazır demo screenshot ve kodları
export const demoScreenshots = [
  {
    id: 'landing-modern',
    name: 'Modern Landing Page',
    description: '...',
    category: 'Landing Page',
    previewCode: '<!DOCTYPE html>...',
    tags: ['gradient', 'modern', 'hero']
  },
  // ... 2 demo daha
]
```

#### `lib/freeTrialStore.ts`
```typescript
// LocalStorage ile ücretsiz deneme takibi
export class FreeTrialManager {
  static getRemainingUses(): number
  static canUseTrial(): boolean
  static decrementUse(): boolean
  static resetTrial(): void
}
```

#### `app/app/page.tsx` (YENİ)
- Demo seçim grid'i
- Ücretsiz deneme sayacı
- Kod gösterimi
- Upgrade modal'ı
- Tamamen yeni UI

#### `app/app/page-old-backup.tsx`
- Eski upload sisteminin yedeği
- Premium'da kullanılacak

---

## 🎨 UI Komponenleri

### 1. Demo Seçim Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {demoScreenshots.map((demo) => (
    <div className="demo-card">
      <div className="thumbnail">🚀 {demo.category}</div>
      <h3>{demo.name}</h3>
      <p>{demo.description}</p>
      <button onClick={() => handleDemoSelect(demo.id)}>
        Kodu Üret
      </button>
    </div>
  ))}
</div>
```

### 2. Ücretsiz Deneme Sayacı
```tsx
<div className="trial-counter">
  <Gift className="icon" />
  <span>{remainingUses} / 3 Ücretsiz Deneme</span>
</div>
```

### 3. Upgrade Modal
```tsx
{showUpgradeModal && (
  <div className="modal">
    <Crown className="icon-large" />
    <h3>Ücretsiz Denemen Bitti! 🎉</h3>
    <ul>
      <li>✓ Sınırsız kod üretimi</li>
      <li>✓ Kendi screenshot'larını yükle</li>
      <li>✓ Figma entegrasyonu</li>
    </ul>
    <button onClick={handleUpgrade}>
      Premium'a Geç →
    </button>
  </div>
)}
```

### 4. Kod Gösterimi
```tsx
<div className="code-viewer">
  <div className="header">
    <Code2 /> generated-code.html
    <button onClick={copyToClipboard}>Kopyala</button>
    <button onClick={downloadCode}>İndir</button>
  </div>
  <pre><code>{code}</code></pre>
</div>
```

---

## 🔄 Kullanıcı Akışı

### İlk Ziyaret
```
1. Landing page'e gel
2. "Hemen Dene" → /app
3. 3 demo kartı göster
4. "3/3 Ücretsiz Deneme" yaz
```

### Demo Seçimi
```
1. Kullanıcı demo seçer
2. "Kod Üretiliyor..." (3 saniye loading)
3. Kod gösterilir
4. LocalStorage: 3 → 2 (kalan hak)
5. "2 ücretsiz deneme hakkın kaldı" mesajı
```

### 3. Demo Sonrası
```
1. Kullanıcı 3. demo'yu seçer
2. Kod gösterilir
3. LocalStorage: 1 → 0
4. "0 ücretsiz deneme hakkın kaldı"
```

### Limit Aşımı
```
1. Kullanıcı 4. demo'yu seçmeye çalışır
2. Buton disabled: "Upgrade Gerekli"
3. Upgrade modal açılır
4. "Premium'a Geç" → /landing#pricing
```

---

## 💾 LocalStorage Yapısı

### Key: `screen-to-code-trial`

```json
{
  "remainingUses": 2,
  "usedAt": [
    "2025-10-14T10:30:00.000Z",
    "2025-10-14T10:35:00.000Z"
  ]
}
```

### Methodlar

```typescript
// Kalan hak sayısı
FreeTrialManager.getRemainingUses() // → 2

// Hak var mı?
FreeTrialManager.canUseTrial() // → true

// Hak kullan
FreeTrialManager.decrementUse() // → true (başarılı)

// Sıfırla (admin için)
FreeTrialManager.resetTrial() // → 3'e döner

// Kullanım geçmişi
FreeTrialManager.getUsageHistory() // → ["2025-10-14...", ...]
```

---

## 🎭 Demo Tasarımlar

### 1. Modern Landing Page
**Kategori:** Landing Page  
**İçerik:**
- Gradient navbar
- Hero section (büyük başlık + CTA)
- 3 feature card (⚡🛡️🚀)
- CTA section
- Footer

**Kullanım Senaryosu:** SaaS landing, Product launch, Startup

---

### 2. SaaS Dashboard
**Kategori:** Dashboard  
**İçerik:**
- Sidebar navigation (Overview, Analytics, Users, Settings)
- 4 stats card (Users, Revenue, Projects, Conversion)
- Chart placeholder
- Dark theme

**Kullanım Senaryosu:** Admin panel, Analytics dashboard, CRM

---

### 3. E-commerce Product
**Kategori:** E-commerce  
**İçerik:**
- Product image gallery (4 thumbnails)
- Price + rating
- Color selector
- Add to cart
- Product description
- Features (Shipping, Returns, Warranty)

**Kullanım Senaryosu:** Online mağaza, Product showcase

---

## 🚀 Premium'a Geçiş

### Ödeme Sonrası Değişiklikler

#### 1. Upload Sistemi Aktif Et
```typescript
// page-old-backup.tsx içeriğini geri yükle
// Upload, Figma, Real AI aktif olacak
```

#### 2. API Key'leri Kullan
```bash
OPENAI_API_KEY=sk-proj-xxx  # Real GPT-5
CLAUDE_API_KEY=sk-ant-xxx   # Real Claude 4.5
```

#### 3. Limit Kaldır
```typescript
// FreeTrialManager kontrolünü bypass et
if (isPremium) {
  // Sınırsız kullanım
}
```

#### 4. Yeni Özellikler
- Screenshot upload
- Figma URL import
- Framework seçimi (React, Vue, Svelte)
- Real AI processing
- Export options

---

## 📊 Dönüşüm Stratejisi

### Ücretsiz → Premium Tetikleyiciler

#### 1. 3. Demo Sonrası
```tsx
<div className="success-message">
  ✅ Kod başarıyla üretildi!
  ⚠️ 0 ücretsiz deneme kaldı.
  
  <button>Premium'a Geç</button>
</div>
```

#### 2. Demo Seçim Engellemesi
```tsx
<button disabled>
  🔒 Upgrade Gerekli
</button>
```

#### 3. Upgrade Modal
```tsx
// Otomatik açılan modal
// Premium faydaları listesi
// Direkt pricing sayfasına yönlendirme
```

#### 4. Sürekli Görünür Upgrade Button
```tsx
<button className="upgrade-button">
  👑 Upgrade
</button>
```

---

## 🔧 Geliştirme Notları

### Test Etmek İçin

```bash
# LocalStorage'ı temizle
localStorage.removeItem('screen-to-code-trial')

# Manuel reset
FreeTrialManager.resetTrial()

# Kalan hakkı kontrol et
console.log(FreeTrialManager.getRemainingUses())
```

### Demo Ekleme

```typescript
// lib/demoData.ts
export const demoScreenshots = [
  // ... mevcut demolar
  {
    id: 'yeni-demo',
    name: 'Yeni Demo',
    description: 'Açıklama',
    category: 'Blog',
    thumbnail: '/demos/yeni-thumb.jpg',
    fullImage: '/demos/yeni-full.jpg',
    previewCode: `<!DOCTYPE html>...</html>`,
    tags: ['blog', 'article', 'modern']
  }
]
```

### Premium Özelliği Aktif Etme

```typescript
// Premium check ekle
const isPremium = await checkUserPremiumStatus(userId)

if (isPremium) {
  // Eski upload sistemini aktif et
  // Real AI'yi kullan
  // Limitleri kaldır
}
```

---

## 📱 Responsive Davranış

### Mobile (< 768px)
- Demo grid: 1 column
- Stats: 2x2 grid
- Modal: Full screen
- Touch-friendly buttons (min 44px)

### Tablet (768px - 1024px)
- Demo grid: 2 columns
- Stats: 2x2 grid
- Sidebar drawer

### Desktop (> 1024px)
- Demo grid: 3 columns
- Stats: 4 columns
- Full sidebar
- Hover effects

---

## 🎨 Design Tokens

### Colors
```css
--purple-primary: #8b5cf6
--pink-primary: #ec4899
--blue-primary: #3b82f6
--bg-dark: #000000
--bg-card: rgba(255, 255, 255, 0.02)
--border: rgba(255, 255, 255, 0.1)
```

### Typography
```css
--font-heading: 'Inter', system-ui, sans-serif
--font-body: 'Inter', system-ui, sans-serif
--text-4xl: 2.25rem (36px)
--text-5xl: 3rem (48px)
```

### Spacing
```css
--spacing-base: 8px
--container-max: 1280px
--card-padding: 1.5rem (24px)
```

---

## 🐛 Bilinen Sınırlamalar

1. **LocalStorage Dependency**
   - Tarayıcı değişince reset olur
   - Incognito mode'da çalışmaz
   - Çözüm: Backend'de user tracking

2. **Demo Sınırlaması**
   - Sadece 3 hazır demo
   - Özelleştirme yok
   - Çözüm: Daha fazla demo ekle

3. **Simülasyon Loading**
   - Gerçek AI yok, 3 saniye setTimeout
   - Çözüm: Premium'da real AI

---

## ✅ Test Checklist

- [ ] 3 demo seçebiliyor musun?
- [ ] Her seçimde sayaç azalıyor mu?
- [ ] 3. seçimden sonra upgrade modal açılıyor mu?
- [ ] Kod kopyalama çalışıyor mu?
- [ ] Kod indirme çalışıyor mu?
- [ ] "Yeni Demo Seç" geri dönüyor mu?
- [ ] Responsive tasarım çalışıyor mu?
- [ ] Custom cursor animasyonu çalışıyor mu?
- [ ] LocalStorage persist ediyor mu?

---

## 🚀 Deployment

### Environment Variables
```bash
# Demo mode (şu anki durum)
NEXT_PUBLIC_DEMO_MODE=true

# Premium'da
NEXT_PUBLIC_DEMO_MODE=false
OPENAI_API_KEY=sk-proj-xxx
CLAUDE_API_KEY=sk-ant-xxx
```

### Build
```bash
npm run build
npm run start
# veya
vercel deploy
```

---

## 📞 Sonraki Adımlar

1. ✅ Demo sistemi çalışıyor
2. ⏳ Backend user tracking ekle
3. ⏳ Premium ödeme entegrasyonu
4. ⏳ Upload sistemini premium'da aktif et
5. ⏳ Real AI entegrasyonu (premium)
6. ⏳ Daha fazla demo ekle

---

**Hazırlayan:** ArsuzTech  
**Tarih:** 14 Ekim 2025  
**Versiyon:** 1.0.0
