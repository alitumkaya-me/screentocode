# 🔑 RESEND API KEY NASIL ALINIR?

## 📋 Özet
Resend ücretsiz email servisi ile ayda **3,000 email** gönderebilirsiniz!
Sadece **3 dakika** sürer.

---

## 🚀 Adım Adım Kurulum

### **1️⃣ Resend Hesabı Oluştur**

#### Yöntem A: GitHub ile (ÖNERİLEN - 30 saniye)
1. https://resend.com adresine git
2. **"Sign Up Free"** butonuna tıkla
3. **"Continue with GitHub"** seç
4. GitHub hesabınla oturum aç
5. Resend'e izin ver
6. ✅ Hazır! Dashboard'a yönlendirileceksin

#### Yöntem B: Email ile (1 dakika)
1. https://resend.com adresine git
2. **"Sign Up Free"** butonuna tıkla
3. Email adresini gir (örn: `alitumkaya0@gmail.com`)
4. Şifre belirle
5. Email'ine gelen doğrulama linkine tıkla
6. ✅ Dashboard'a giriş yap

---

### **2️⃣ API Key Oluştur**

1. **Resend Dashboard**'a gir: https://resend.com/api-keys

2. Sol menüden **"API Keys"** sekmesine tıkla

3. **"Create API Key"** butonuna bas

4. Formu doldur:
   ```
   Name: ScreenToCode Development
   Permission: Full Access (sending + domains)
   Domain: (boş bırak - gerekli değil)
   ```

5. **"Create"** butonuna tıkla

---

### **3️⃣ API Key'i Kopyala**

⚠️ **ÇOK ÖNEMLİ**: API key sadece **1 KEZ** gösterilir!

Ekranda şöyle bir key göreceksin:
```
re_123456789abcdefghijklmnopqrstuvwxyz
```

**HEMEN KOPYALA!** Kaybedersen yeni key oluşturman gerekir.

---

### **4️⃣ .env.local Dosyasına Ekle**

1. Projenin kök dizininde `.env.local` dosyasını aç

2. `RESEND_API_KEY=` satırını bul

3. Kopyaladığın key'i yapıştır:
   ```bash
   # ÖNCE (boş):
   RESEND_API_KEY=

   # SONRA (dolu):
   RESEND_API_KEY=re_123456789abcdefghijklmnopqrstuvwxyz
   ```

4. Dosyayı **kaydet** (Ctrl+S)

---

### **5️⃣ Server'ı Restart Et**

Terminal'de:
```bash
# 1. Server'ı durdur (Ctrl+C)
Ctrl + C

# 2. Tekrar başlat
npm run dev
```

---

### **6️⃣ Test Et! 🎉**

#### Test 1: Email Config Kontrol
1. Tarayıcıda aç: http://localhost:3000/api/debug/email-config

2. Göreceksin:
   ```json
   {
     "resend": {
       "configured": true,  ✅
       "apiKey": "Present",
       "fromEmail": "onboarding@resend.dev"
     }
   }
   ```

#### Test 2: Forgot Password
1. http://localhost:3000/auth/signup → Kayıt ol
2. http://localhost:3000/auth/forgot-password → Email gir
3. **Email kutunu kontrol et** 📧
4. Reset email geldi! ✅

---

## 📊 Resend Free Tier Limitleri

| Özellik | Limit |
|---------|-------|
| **Emails/month** | 3,000 |
| **Emails/day** | 100 |
| **Domains** | Unlimited |
| **API Access** | ✅ Full |
| **Cost** | $0 (FREE!) |

---

## 🔧 Sorun Giderme

### ❌ "Missing API key" Hatası
**Çözüm**:
- `.env.local` dosyasında `RESEND_API_KEY=` satırını kontrol et
- Key'i doğru kopyaladığından emin ol
- Server'ı restart et (`Ctrl+C` → `npm run dev`)

### ❌ Email Gelmiyor
**Çözüm 1**: Spam klasörünü kontrol et
- Gmail → Spam klasörü
- "onboarding@resend.dev" adresinden gelecek

**Çözüm 2**: Console'u kontrol et
- Tarayıcıda F12 bas
- Console sekmesine git
- "✅ Password reset email sent" yazıyorsa başarılı

**Çözüm 3**: Debug endpoint'i kontrol et
- http://localhost:3000/api/debug/email-config aç
- `configured: true` olmalı

### ❌ API Key Kaybettim
**Çözüm**:
- Resend Dashboard → API Keys
- Eski key'i sil
- Yeni key oluştur
- `.env.local` dosyasını güncelle

---

## 🎯 Hızlı Checklist

- [ ] Resend hesabı oluşturdum
- [ ] API key aldım
- [ ] `.env.local` dosyasına ekledim
- [ ] Server'ı restart ettim
- [ ] `/api/debug/email-config` kontrol ettim
- [ ] Test email gönderdim
- [ ] Email geldi! 🎉

---

## 📚 Linkler

- **Resend Dashboard**: https://resend.com
- **API Keys**: https://resend.com/api-keys
- **Documentation**: https://resend.com/docs
- **Support**: https://resend.com/support

---

## 💡 Pro Tips

1. **Development**: `onboarding@resend.dev` kullan (verification gereksiz)
2. **Production**: Kendi domain'ini ekle (profesyonel görünür)
3. **Free tier**: 3,000 email/ay çoğu proje için yeterli
4. **Backup**: API key'ini güvenli bir yerde sakla (1Password, Bitwarden)

---

## 🤝 Yardıma İhtiyacın Var mı?

1. **Resend Discord**: https://resend.com/discord
2. **GitHub Issues**: Bu repo'da issue aç
3. **Email**: support@resend.com

---

**Başarılar! Email sisteminiz hazır! 📧**
