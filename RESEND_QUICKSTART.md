# 🚀 Resend API Key Alma Rehberi

## Hızlı Kurulum (3 Dakika)

### Adım 1: Resend Hesabı Aç
1. **Tarayıcıda aç**: https://resend.com
2. **Sign Up** butonuna tıkla
3. GitHub ile giriş yap (en hızlı yol) VEYA email ile kayıt ol
4. Email doğrulamasını yap (gelen emaildeki linke tıkla)

### Adım 2: API Key Oluştur
1. Dashboard'a git: https://resend.com/api-keys
2. **Create API Key** butonuna tıkla
3. **Name**: `ScreenToCode Development` yaz
4. **Permission**: `Sending access` seç (Full Access de olur)
5. **Create** butonuna tıkla
6. ⚠️ **ÖNEMLİ**: API key'i HEMEN kopyala! (Sadece 1 kez gösterilecek)

Örnek API key:
```
re_123456789abcdefghijklmnopqrstuvwxyz
```

### Adım 3: .env.local'e Ekle
`.env.local` dosyasını aç ve şu satırı bul:
```bash
RESEND_API_KEY=
```

API key'i yapıştır:
```bash
RESEND_API_KEY=re_123456789abcdefghijklmnopqrstuvwxyz
```

### Adım 4: Server'ı Restart Et
```bash
# Terminal'de:
# Windows (PowerShell):
taskkill /F /IM node.exe
npm run dev

# Mac/Linux:
pkill -f node
npm run dev
```

### Adım 5: Test Et!
1. http://localhost:3000/auth/signin
2. "Şifremi Unuttum?" tıkla
3. Gerçek email adresini gir (kayıtlı olduğun email)
4. Submit
5. **Email kutunu kontrol et!** 📧

## 📧 Email Gönderimi Test

### Test Email Adresi
Resend free tier ile `onboarding@resend.dev` adresinden email gönderebilirsin.

**Gönderen**: onboarding@resend.dev
**Alıcı**: Senin email adresin (herhangi bir email)

### Console'da Göreceğin Log
```bash
✅ Password reset email sent: 550e8400-e29b-41d4-a716-446655440000
```

## 🐛 Sorun Giderme

### 1. Email Gelmiyor?
- ✅ **Spam klasörünü kontrol et!** (çoğu email buraya düşer)
- ✅ API key doğru kopyalandı mı? (başında/sonunda boşluk yok mu?)
- ✅ Server restart edildi mi?
- ✅ Console'da hata var mı? (F12 > Console)

### 2. Console'da "Missing API key" Hatası?
```bash
# .env.local'de API key var mı kontrol et:
cat .env.local | grep RESEND

# Server'ı yeniden başlat:
taskkill /F /IM node.exe
npm run dev
```

### 3. "Too many requests" Hatası?
15 dakikada 10'dan fazla forgot password denemesi yaptın.
**Çözüm**: 15 dakika bekle veya farklı browser kullan (Incognito mode)

### 4. API Key Geçersiz?
```bash
Error: API key is invalid
```
**Çözüm**: 
1. Resend dashboard'a git
2. Eski API key'i sil
3. Yeni API key oluştur
4. .env.local'e yeni key'i yapıştır

## 🎯 Başarılı Test Örneği

### Console'da Göreceğin:
```bash
=================================
📧 PASSWORD RESET EMAIL SENT:
Email: datairlab@gmail.com
Email ID: 550e8400-e29b-41d4-a716-446655440000
=================================
```

### Email'de Göreceğin:

**From**: onboarding@resend.dev
**Subject**: ScreenToCode - Şifre Sıfırlama Talebi

```
┌─────────────────────────────────┐
│   ✨ ScreenToCode               │
│   AI-Powered Design to Code     │
├─────────────────────────────────┤
│                                  │
│ Şifre Sıfırlama Talebi          │
│                                  │
│ Merhaba,                         │
│ ScreenToCode hesabınız için...  │
│                                  │
│ [ Şifremi Sıfırla ]             │ ← Butona tıkla
│                                  │
│ ⏱️ Bu link 1 saat geçerli      │
│                                  │
└─────────────────────────────────┘
```

## 💡 Pro Tips

1. **Development Test**: API key olmadan console'da link gösterilir
2. **Spam Filtresi**: İlk test'te mutlaka spam klasörüne bak
3. **Email Verification**: Kayıtlı olmayan email'e gönderilmez (güvenlik)
4. **Rate Limit**: 15 dakikada max 10 istek
5. **Token Süresi**: Reset linki 1 saat geçerli

## 📝 Checklist

- [ ] Resend hesabı oluşturdum
- [ ] API key aldım ve kopyaladım
- [ ] .env.local'e RESEND_API_KEY ekledim
- [ ] Server'ı restart ettim (npm run dev)
- [ ] Kayıtlı email ile test ettim
- [ ] Spam klasörünü kontrol ettim
- [ ] Reset email geldi! ✅

## 🆘 Hala Çalışmıyor?

### Option 1: Console Mode (Geçici Çözüm)
API key olmadan da test edebilirsin:
```bash
1. .env.local'den RESEND_API_KEY satırını sil (veya boş bırak)
2. npm run dev
3. Forgot password > Email gir
4. Console'u aç (F12)
5. Reset link'i console'dan kopyala
6. Browser'a yapıştır ✅
```

### Option 2: Screenshot Gönder
Sorun devam ediyorsa:
1. Console'u aç (F12)
2. Forgot password sayfasında test et
3. Console'daki hata/log'u screenshot al
4. .env.local'deki RESEND satırlarını screenshot al (API key'i gizle!)
5. Bana gönder

## 🎉 Başarılı Setup Sonrası

Artık:
- ✅ Gerçek email gönderimi çalışıyor
- ✅ Professional HTML email template
- ✅ 3,000 email/month ücretsiz
- ✅ Production'a hazır

**Keyifli kullanımlar! 🚀**
