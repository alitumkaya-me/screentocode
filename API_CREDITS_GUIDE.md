# 💳 OpenAI & Anthropic - API Credits Satın Alma Rehberi

## 📊 Hızlı Karşılaştırma

| Platform | Ücretsiz Credit | Min. Yükleme | Fiyatlandırma | Kullanım |
|----------|----------------|--------------|---------------|----------|
| **OpenAI** | $5 (yeni hesap) | $5 | Pay-as-you-go | Otomatik çekilir |
| **Anthropic** | $5 (yeni hesap) | $5 | Pay-as-you-go | Otomatik çekilir |

---

## 🟢 OpenAI (ChatGPT/GPT-5) - Adım Adım

### 1️⃣ Hesap Oluşturma

1. **Git**: https://platform.openai.com/signup
2. **Email ile kayıt ol** veya Google/Microsoft hesabı kullan
3. **Email'ini doğrula**
4. **Telefon numaranı ekle** (SMS doğrulama)

### 2️⃣ Billing (Ödeme) Ayarları

1. **Dashboard'a git**: https://platform.openai.com/
2. Sol menüden **"Settings"** → **"Billing"** tıkla
3. **"Payment methods"** sekmesine geç
4. **"Add payment method"** butonuna tıkla

### 3️⃣ Kredi Kartı Ekleme

**Kabul Edilen Kartlar:**
- ✅ Visa
- ✅ Mastercard
- ✅ American Express
- ✅ Discover

**Gerekli Bilgiler:**
```
Kart Numarası: 1234 5678 9012 3456
Son Kullanma: 12/27
CVC: 123
Kart Sahibi Adı: ALI ARSUZ
Fatura Adresi: Türkiye (postal code gerekli)
```

⚠️ **Önemli:**
- Türkiye'den **3D Secure** destekli kart gerekli
- Bazı banka kartları uluslararası işlemlere kapalı olabilir
- Deniz Bank, Akbank, İş Bankası genelde çalışır

### 4️⃣ Credit Yükleme Seçenekleri

OpenAI **iki sistem** kullanır:

#### A) Prepaid Credits (Önceden Yükle)
```
Minimum: $5
Maksimum: Sınırsız
Kullanım: Krediden düşer
```

**Nasıl Yüklenir:**
1. Billing sayfasında **"Add to credit balance"** tıkla
2. Miktar seç: $5, $10, $50, $100 veya özel
3. Kredi kartı bilgilerini gir
4. **"Purchase"** tıkla

#### B) Auto-recharge (Otomatik Dolum)
```
Minimum bakiye: $5 altına düşünce
Yüklenecek miktar: $10, $20, $50 seçebilirsin
```

**Nasıl Ayarlanır:**
1. Billing → **"Auto recharge"** sekmesi
2. **"Enable auto-recharge"** toggle'ını aç
3. Threshold (eşik) belirle: örn. $5
4. Recharge miktarı belirle: örn. $20
5. **"Save"** tıkla

### 5️⃣ Usage Limits (Kullanım Limitleri)

**Varsayılan Limitler:**
- **Free tier**: $5 ücretsiz credit (ilk 3 ay)
- **Tier 1**: $100/ay (ilk $5 harcadıktan sonra)
- **Tier 2**: $500/ay ($50 harcadıktan sonra)
- **Tier 3**: $1,000/ay ($100 harcadıktan sonra)
- **Tier 4**: $5,000/ay ($250 harcadıktan sonra)
- **Tier 5**: $10,000+/ay ($1,000 harcadıktan sonra)

**Limit Ayarlama:**
1. Billing → **"Usage limits"**
2. **"Hard limit"** (kesin limit): örn. $50/ay
3. **"Soft limit"** (uyarı): örn. $30/ay
4. Email notification aç

### 6️⃣ GPT-5 Fiyatlandırma (2025)

#### GPT-5 Vision
```
Input:  $0.03 per 1K tokens (~750 kelime)
Output: $0.06 per 1K tokens (~750 kelime)
```

**ScreenToCode için:**
- Image analysis: ~2,000 input tokens
- Detailed response: ~2,000 output tokens
- **Toplam maliyet: ~$0.18 per screenshot**

#### Hesaplama Örneği:
```
100 screenshot analizi:
- Input: 100 × 2K tokens = 200K tokens
- Output: 100 × 2K tokens = 200K tokens
- Maliyet: (200K × $0.03) + (200K × $0.06) = $18
```

### 7️⃣ API Key Oluşturma

1. **Dashboard**: https://platform.openai.com/api-keys
2. **"Create new secret key"** tıkla
3. **İsim ver**: "ScreenToCode Production"
4. **Permissions** (izinler):
   - ✅ All (veya sadece "Model capabilities")
5. **"Create secret key"** tıkla
6. **Key'i kopyala** (⚠️ Sadece bir kez gösterilir!)
7. `.env.local`'a yapıştır:
   ```bash
   OPENAI_API_KEY=sk-proj-abc123xyz...
   ```

### 8️⃣ Kullanım Takibi

**Real-time monitoring:**
1. **Usage dashboard**: https://platform.openai.com/usage
2. Günlük/aylık grafikler
3. Model bazında breakdown
4. Maliyet analizi

**Email Alerts:**
- Soft limit aşıldığında
- Hard limit yaklaşırken
- Credit bittiğinde

---

## 🟣 Anthropic (Claude Sonnet 4.5) - Adım Adım

### 1️⃣ Hesap Oluşturma

1. **Git**: https://console.anthropic.com/
2. **Email ile kayıt ol** (Google/Microsoft yok)
3. **Email'ini doğrula**
4. **Anket doldur** (kullanım amacı sorulur)

### 2️⃣ Billing Setup

1. **Console'a git**: https://console.anthropic.com/
2. Sol menüden **"Settings"** → **"Billing"** tıkla
3. **"Add payment method"** tıkla

### 3️⃣ Kredi Kartı Ekleme

**Kabul Edilen Kartlar:**
- ✅ Visa
- ✅ Mastercard
- ❌ American Express (bazı bölgelerde)

**Gerekli Bilgiler:**
```
Kart Numarası: 1234 5678 9012 3456
Son Kullanma: 12/27
CVC: 123
Kart Sahibi: ALI ARSUZ
ZIP Code: 34000 (Türkiye için postal code)
```

⚠️ **Önemli:**
- Anthropic **daha seçici** (bazı Türk kartları reddedebilir)
- Wise/Revolut gibi sanal kartlar genelde çalışır
- 3D Secure zorunlu

### 4️⃣ Credit Yükleme

Anthropic **sadece Pay-as-you-go** kullanır (prepaid yok):

```
Minimum ilk yükleme: $5
Aylık fatura: Kullandığın kadar
Otomatik ödeme: Aylık
```

**Nasıl Çalışır:**
1. Kredi kartı ekle
2. $5 başlangıç ödemesi yapılır
3. API kullanmaya başla
4. Her ay sonu otomatik fatura kesilir
5. Karttan otomatik çekilir

### 5️⃣ Usage Limits

**Tier Sistemi:**
- **Tier 1 (Başlangıç)**: $100/ay
- **Tier 2**: $500/ay (credit history gerekir)
- **Tier 3**: $2,000/ay
- **Tier 4**: $10,000/ay

**Limit Artırma:**
1. Billing → **"Request limit increase"**
2. Form doldur:
   - Kullanım amacı
   - Beklenen aylık kullanım
   - İşletme bilgileri (opsiyonel)
3. 1-3 iş günü içinde cevap

**Spend Limits:**
1. Settings → **"Billing"** → **"Spend limits"**
2. **"Monthly spend limit"**: örn. $50
3. **"Notification threshold"**: örn. $30 (email gönderir)
4. **"Save"**

### 6️⃣ Claude Sonnet 4.5 Fiyatlandırma

```
Input:  $0.015 per 1K tokens (~750 kelime)
Output: $0.075 per 1K tokens (~750 kelime)
```

**ScreenToCode için:**
- Vision analysis'den gelen JSON: ~1,500 input tokens
- Generated HTML/CSS/JS code: ~4,000 output tokens
- **Toplam maliyet: ~$0.32 per screenshot**

#### Hesaplama Örneği:
```
100 screenshot → kod üretimi:
- Input: 100 × 1.5K tokens = 150K tokens
- Output: 100 × 4K tokens = 400K tokens
- Maliyet: (150K × $0.015) + (400K × $0.075) = $32.25
```

### 7️⃣ API Key Oluşturma

1. **Console**: https://console.anthropic.com/settings/keys
2. **"Create Key"** tıkla
3. **İsim ver**: "ScreenToCode Production"
4. **Workspace seç** (default workspace genelde yeterli)
5. **"Create Key"** tıkla
6. **Key'i kopyala**
7. `.env.local`'a yapıştır:
   ```bash
   CLAUDE_API_KEY=sk-ant-api03-abc123xyz...
   ```

### 8️⃣ Kullanım Takibi

**Dashboard:**
1. **Usage**: https://console.anthropic.com/settings/usage
2. Real-time metrics
3. Model breakdown
4. Cost analysis

**Workbench (Test Playground):**
1. https://console.anthropic.com/workbench
2. API'yi test et (ücretsiz değil, sayılır!)
3. Prompt testing

---

## 💰 ScreenToCode Toplam Maliyet

### Her Screenshot İçin:
```
GPT-5 Vision:        ~$0.18
Claude Sonnet 4.5:   ~$0.32
─────────────────────────────
TOPLAM:              ~$0.50
```

### Aylık Kullanım Senaryoları:

#### 🟢 Hobby (100 screenshot/ay)
```
OpenAI:     $18
Anthropic:  $32
─────────────────
Toplam:     $50/ay
```

#### 🟡 Startup (500 screenshot/ay)
```
OpenAI:     $90
Anthropic:  $160
─────────────────
Toplam:     $250/ay
```

#### 🔴 Business (2000 screenshot/ay)
```
OpenAI:     $360
Anthropic:  $640
─────────────────
Toplam:     $1,000/ay
```

---

## 🎯 Hangi Kartlar Çalışır? (Türkiye)

### ✅ Genelde Çalışanlar:
- **Akbank** (Visa/Mastercard)
- **İş Bankası** (Visa/Mastercard)
- **Garanti BBVA** (Visa/Mastercard)
- **Denizbank** (Visa)
- **Wise** (Sanal kart - %100 çalışır)
- **Revolut** (Sanal kart - önerilir)
- **Papara** (Mastercard)

### ❌ Genelde Çalışmayanlar:
- Ziraat Bankası (uluslararası işleme kapalı)
- Halkbank (bazı kartlar)
- Vakıfbank (eski kartlar)

### 💡 En İyi Çözüm: Wise
1. **Wise hesabı aç**: https://wise.com/
2. **Sanal kart oluştur** (ücretsiz)
3. **TL yükle** → USD'ye çevir
4. Bu kartı OpenAI/Anthropic'e ekle
5. **%100 çalışır** ✅

---

## 🛡️ Güvenlik & Risk Yönetimi

### 1. Spend Limits Ayarla
```bash
OpenAI:    $50/ay hard limit
Anthropic: $50/ay spend limit
```

### 2. Email Notifications Aç
```
30% → Uyarı emaili
80% → Kritik uyarı
100% → API durdurulur
```

### 3. API Key Rotation
```
Her 90 günde bir key değiştir
Eski key'leri revoke et
Log monitoring yap
```

### 4. Rate Limiting (Kod Tarafında)
```typescript
// Her kullanıcı max 10 request/saat
const limiter = new RateLimiter({
  tokensPerInterval: 10,
  interval: 'hour'
})
```

---

## 🚀 Hızlı Başlangıç Checklist

### OpenAI Setup:
- [ ] Hesap oluştur → https://platform.openai.com/signup
- [ ] Kredi kartı ekle (Settings → Billing)
- [ ] $5 minimum yükle veya auto-recharge aç
- [ ] Usage limit ayarla ($50 hard limit)
- [ ] API key oluştur
- [ ] `.env.local`'a yapıştır
- [ ] Test et: `npm run dev`

### Anthropic Setup:
- [ ] Hesap oluştur → https://console.anthropic.com/
- [ ] Kredi kartı ekle (Settings → Billing)
- [ ] $5 başlangıç ödemesi yap
- [ ] Spend limit ayarla ($50/ay)
- [ ] API key oluştur
- [ ] `.env.local`'a yapıştır
- [ ] Test et: `npm run dev`

### Test:
- [ ] http://localhost:3002/app aç
- [ ] Screenshot yükle
- [ ] Console'da "Real mode" loglarını gör
- [ ] Code'un üretildiğini doğrula
- [ ] Usage dashboard'ları kontrol et

---

## 📞 Sorun Giderme

### "Payment method declined"
**Çözüm:**
1. Kartın uluslararası işleme açık olduğundan emin ol
2. 3D Secure aktif mi kontrol et
3. Wise/Revolut sanal kart dene
4. Farklı kart dene

### "Rate limit exceeded"
**Çözüm:**
1. Tier'ını kontrol et (limit increase iste)
2. Request'leri throttle et (rate limiting ekle)
3. Caching implement et
4. Paid tier'a geç

### "Insufficient credits"
**Çözüm:**
1. Billing dashboard'u kontrol et
2. Auto-recharge aç
3. Manuel credit yükle
4. Kredi kartının geçerli olduğundan emin ol

### "API key invalid"
**Çözüm:**
1. Key'i doğru kopyaladığın emin ol
2. Başında/sonunda boşluk olmasın
3. `.env.local`'da tırnak kullanma
4. Server'ı restart et (`npm run dev`)

---

## 💡 Pro Tips

### 1. Geliştirmede Mock Mode Kullan
```bash
# API key'leri sadece production'da kullan
# Development'ta mock mode ücretsiz
```

### 2. Caching Ekle
```typescript
// Aynı screenshot için cache kullan
const cacheKey = `screenshot_${hash(imageUrl)}`
const cached = await redis.get(cacheKey)
if (cached) return cached
```

### 3. Request Batching
```typescript
// Birden fazla screenshot'ı batch halinde işle
// Paralel request yerine sequential
```

### 4. Usage Analytics
```typescript
// Her request'in maliyetini logla
console.log(`Cost: $${cost.toFixed(4)}`)
// Aylık spending'i takip et
```

---

## 📊 Karşılaştırma Tablosu

| Özellik | OpenAI | Anthropic |
|---------|--------|-----------|
| **Ücretsiz Credit** | $5 (3 ay) | $5 (tek seferlik) |
| **Min. Yükleme** | $5 | $5 |
| **Ödeme Sistemi** | Prepaid + Auto-recharge | Pay-as-you-go |
| **Kart Desteği** | ✅✅✅ | ✅✅ |
| **Türk Kartları** | Genelde çalışır | Daha seçici |
| **Limit Artırma** | Otomatik (tier) | Manuel istek |
| **Dashboard** | Detaylı | Basit |
| **API Docs** | Mükemmel | Çok iyi |

---

## 🎓 Önerilen Başlangıç

### İlk Hafta (Test):
1. İki platform da $5 yükle
2. Mock mode ile develop et
3. Real API'yi sadece final test için kullan
4. Usage'ı günlük kontrol et

### İkinci Hafta (Production):
1. Auto-recharge aç ($20)
2. Spend limits ayarla ($50)
3. Email notifications aktif et
4. Real mode'a geç

### Uzun Vadede:
1. Usage analytics ekle
2. Caching implement et
3. Rate limiting optimize et
4. Tier upgrade planla

---

**Başka soru varsa çekinme! 🚀**
