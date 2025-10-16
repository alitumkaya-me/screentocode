# İyzico Ödeme Sistemi Kurulum Kılavuzu

## 🇹🇷 İyzico ile Ödeme Almaya Başla (10 dakika)

### 1. İyzico Hesabı Aç

**Sandbox (Test) Hesabı:**
- Git: https://sandbox-merchant.iyzipay.com/auth/register
- Email ile kayıt ol
- Email doğrula
- **ÜCRETSİZ** test hesabı

**Gerçek (Production) Hesabı:**
- Git: https://merchant.iyzipay.com/auth/register
- Firma bilgilerini doldur
- Onay süreci: 1-2 iş günü
- Komisyon: %2.49 + 0.25₺

### 2. API Keylerini Al

1. **Sandbox için:**
   - Git: https://sandbox-merchant.iyzipay.com/developer/keys
   - **API Key** ve **Secret Key**'i kopyala

2. **Production için:**
   - Git: https://merchant.iyzipay.com/developer/keys
   - Onaylandıktan sonra erişilebilir

### 3. .env.local Dosyası Oluştur

Proje kökünde `.env.local` dosyası oluştur:

```env
# İyzico (Test - Sandbox)
IYZICO_API_KEY=sandbox-xxxxxxxxxxxx
IYZICO_SECRET_KEY=sandbox-xxxxxxxxxxxx
IYZICO_BASE_URL=https://sandbox-api.iyzipay.com

# Uygulama URL'i
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**Production için:**
```env
IYZICO_API_KEY=your-live-api-key
IYZICO_SECRET_KEY=your-live-secret-key
IYZICO_BASE_URL=https://api.iyzipay.com
```

### 4. Test Et

1. **Dev server'ı başlat:**
   ```bash
   npm run dev
   ```

2. **Landing page'i aç:**
   ```
   http://localhost:3000/landing
   ```

3. **"Start Pro Trial" butonuna tıkla**

4. **İyzico test kartları:**

   **Başarılı Ödeme:**
   ```
   Kart No: 5528 7900 0000 0001
   Son Kullanma: 12/30
   CVC: 123
   Ad Soyad: Test Kullanıcı
   ```

   **3D Secure Şifre:** `123456`

   **Diğer Test Kartları:**
   - MasterCard: `5526 0800 0000 0006`
   - Visa: `4603 4504 5000 0005`

5. **Başarılı ödeme sonrası:**
   - `/success` sayfasına yönleneceksin
   - Console'da "💰 Ödeme başarılı!" göreceksin

### 5. Fiyat Planları

**Mevcut fiyatlar (₺):**
- **Free:** ₺0/ay - 3 generation
- **Pro:** ₺699/ay - Unlimited
- **Enterprise:** ₺3,499/ay - Takım özellikleri

**Fiyatları değiştirmek için:**
`pages/api/iyzico/checkout.ts` dosyasında:

```typescript
const prices: Record<string, { price: string; name: string }> = {
  pro: { price: '699.00', name: 'ScreenToCode Pro - Aylık' },
  enterprise: { price: '3499.00', name: 'ScreenToCode Enterprise - Aylık' },
}
```

### 6. Callback URL'i Ayarla

İyzico ödeme sonrası `/api/iyzico/callback` endpoint'ine POST isteği gönderir.

**Dikkat:** Callback URL production'da HTTPS olmalı!

**Ngrok ile test (local):**
```bash
ngrok http 3000
# Çıkan URL'i NEXT_PUBLIC_BASE_URL olarak ayarla
```

### 7. Ödeme Akışı

```
1. Kullanıcı "Start Pro Trial" tıklar
   ↓
2. /api/iyzico/checkout çağrılır
   ↓
3. İyzico checkout URL'i dönülür
   ↓
4. Kullanıcı İyzico sayfasına yönlendirilir
   ↓
5. Kart bilgileri girilir + 3D Secure
   ↓
6. Ödeme başarılı → /api/iyzico/callback çağrılır
   ↓
7. Kullanıcı /success sayfasına yönlendirilir
```

## 🎯 Önemli Notlar

### Güvenlik
- **API Key ve Secret Key'i ASLA GitHub'a commit etme!**
- `.env.local` dosyası `.gitignore`'da
- Production'da environment variables kullan

### Test Kartları
- Sandbox'ta sadece test kartları çalışır
- Gerçek kart bilgileri çalışmaz
- 3D Secure şifresi: `123456`

### Komisyon Oranları (Production)
- **Tek çekim:** %2.49 + 0.25₺
- **Taksitli:** %2.69 - %3.49 (taksit sayısına göre)
- **Minimum işlem:** 1₺
- **Ödeme süresi:** T+2 gün (2 iş günü sonra hesabına geçer)

### Production'a Geçiş

1. **İyzico firma başvurusu yap:**
   - Vergi levhası
   - İmza sirküleri
   - Banka hesap bilgileri

2. **Onay bekle:** 1-2 iş günü

3. **Live API keylerini al**

4. **.env production güncelle:**
   ```env
   IYZICO_API_KEY=live-key
   IYZICO_SECRET_KEY=live-secret
   IYZICO_BASE_URL=https://api.iyzipay.com
   ```

5. **Test et production'da!**

## 🐛 Sorun Giderme

### "API Key hatalı" hatası
- Sandbox key mi kullanıyorsun? URL'i kontrol et
- Copy/paste sırasında boşluk kalmış olabilir

### Callback çalışmıyor
- NEXT_PUBLIC_BASE_URL doğru mu?
- Production'da HTTPS kullanıyor musun?
- Ngrok ile test et

### 3D Secure açılmıyor
- Sandbox'ta test kartı kullanıyor musun?
- Browser popup blocker kapalı mı?

### Ödeme başarılı ama callback gelmiyor
- Server loglarını kontrol et
- İyzico dashboard'da işlemi gör
- Network tab'de callback POST isteğini kontrol et

## 📊 Dashboard

İyzico Dashboard'dan görebilirsin:
- Tüm işlemler
- Başarılı/başarısız ödemeler
- Günlük/aylık raporlar
- Para çekme talepleri

**Sandbox Dashboard:** https://sandbox-merchant.iyzipay.com
**Live Dashboard:** https://merchant.iyzipay.com

## 🚀 Sonraki Adımlar

1. ✅ İyzico entegrasyonu tamamlandı
2. ⏳ Database ekle (kullanıcı subscription takibi)
3. ⏳ Email bildirimleri (ödeme onayı)
4. ⏳ Subscription iptal/yenileme
5. ⏳ Fatura oluşturma

Başka soru varsa sor! 🎯
