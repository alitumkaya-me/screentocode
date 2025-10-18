# 📧 Email Setup Guide - Resend

ScreenToCode email gönderimi için **Resend** kullanıyor. Ücretsiz tier ile ayda 3,000 email gönderebilirsiniz!

## 🚀 Quick Setup (5 Dakika)

### 1. Resend Hesabı Oluştur
1. [resend.com](https://resend.com) adresine git
2. **Sign Up** ile ücretsiz hesap aç (GitHub ile giriş yapabilirsin)
3. Email adresini doğrula

### 2. API Key Al
1. Resend dashboard'a gir: [resend.com/api-keys](https://resend.com/api-keys)
2. **Create API Key** butonuna tıkla
3. İsim ver (örn: "ScreenToCode Production")
4. **Full Access** seç
5. API key'i kopyala (sadece 1 kez gösterilecek!)

### 3. .env.local Dosyasını Güncelle
```bash
# .env.local dosyasına ekle:
RESEND_API_KEY=re_123456789abcdefghijklmnop  # Senin API key'in
RESEND_FROM_EMAIL=onboarding@resend.dev       # Development için
```

### 4. Development Test (API Key Olmadan)
API key eklemeden test edebilirsin:
- Email gönderilmez
- Console'a link yazdırılır
- Forgot password akışı çalışır

```bash
npm run dev
# Console'da şunu göreceksin:
📧 EMAIL WOULD BE SENT (DEV MODE):
To: user@example.com
Reset Link: http://localhost:3000/auth/reset-password?token=abc123
```

### 5. Production Setup (Kendi Domain)

#### Adım 1: Domain Ekle
1. Resend Dashboard > [Domains](https://resend.com/domains)
2. **Add Domain** tıkla
3. Domain'ini gir (örn: `screentocode.com`)
4. DNS kayıtlarını kopyala

#### Adım 2: DNS Ayarları
Domain sağlayıcında (Netlify, Vercel, Cloudflare vb.) DNS kayıtlarını ekle:

**SPF Record (TXT):**
```
Name: @
Type: TXT
Value: v=spf1 include:resend.com ~all
```

**DKIM Records (3 adet - Resend'den kopyala):**
```
Name: resend._domainkey
Type: TXT
Value: [Resend'den alacaksın]
```

#### Adım 3: Domain Doğrulama
1. DNS kayıtlarını ekledikten sonra **Verify** tıkla
2. Doğrulama 5-30 dakika sürebilir
3. ✅ Verified göründüğünde hazırsın!

#### Adım 4: From Email Güncelle
```bash
# .env.local (Production)
RESEND_FROM_EMAIL=no-reply@screentocode.com  # Kendi domain'in
```

## 📝 Email Templates

### Password Reset Email
- ✅ Profesyonel HTML tasarım
- ✅ Gradient header (purple-pink)
- ✅ CTA button (Şifremi Sıfırla)
- ✅ Security warning (1 saat geçerli)
- ✅ Responsive design

### Welcome Email (Optional)
- 🎉 Hoş geldin mesajı
- 💎 3 ücretsiz deneme hatırlatması
- 🔗 Dashboard linki

## 🧪 Test Senaryoları

### Test 1: Development (API Key Yok)
```bash
1. Forgot password sayfasına git
2. Email gir
3. Submit
4. Console'u aç (F12)
5. Reset link'i kopyala
6. Reset password sayfasını aç
✅ Başarılı: Console'da link göreceksin
```

### Test 2: Production (API Key Var)
```bash
1. .env.local'e RESEND_API_KEY ekle
2. npm run dev
3. Forgot password > Email gir
4. Submit
5. Email kutunu kontrol et
6. Reset email geldi mi?
✅ Başarılı: Email gelecek (onboarding@resend.dev'den)
```

### Test 3: Custom Domain
```bash
1. Domain'i Resend'e ekle
2. DNS kayıtlarını ayarla
3. Verify et
4. RESEND_FROM_EMAIL güncelle
5. Test et
✅ Başarılı: Kendi domain'inden email gelecek
```

## 🔒 Security Best Practices

### Rate Limiting
- ✅ IP bazlı: 10 istek / 15 dakika
- ✅ Email enumeration koruması
- ✅ Her zaman "success" döner (güvenlik için)

### Email Content
- ✅ Reset link 1 saat geçerli
- ✅ Tek kullanımlık token
- ✅ HTTPS zorunlu (production)
- ✅ No-reply email adresi

### Spam Prevention
- ✅ SPF record
- ✅ DKIM signature
- ✅ Verified domain
- ✅ Unsubscribe link (opsiyonel)

## 💰 Pricing (Resend)

### Free Tier
- ✅ 3,000 emails/month
- ✅ 100 emails/day
- ✅ Unlimited domains
- ✅ API access
- ✅ Webhooks
- ⚠️ "onboarding@resend.dev" kullanmalısın

### Pro Plan ($20/month)
- ✅ 50,000 emails/month
- ✅ 1,000 emails/day
- ✅ Custom domains
- ✅ Analytics
- ✅ Priority support

## 🐛 Troubleshooting

### Email Gelmiyor
1. **Spam klasörünü kontrol et**
2. **API key doğru mu?**
   ```bash
   # Test command
   curl -X POST 'https://api.resend.com/emails' \
     -H 'Authorization: Bearer YOUR_API_KEY' \
     -H 'Content-Type: application/json' \
     -d '{"from":"onboarding@resend.dev","to":"you@example.com","subject":"Test","html":"<p>Test</p>"}'
   ```
3. **Console'da hata var mı?**
   ```bash
   npm run dev
   # Console'u aç ve "Email send error" ara
   ```

### Domain Verify Edilmiyor
1. DNS propagation bekle (5-30 dakika)
2. DNS kayıtlarını kontrol et:
   ```bash
   nslookup -type=TXT resend._domainkey.yourdomain.com
   ```
3. Resend support'a yaz (çok hızlılar!)

### Rate Limit Hatası
```bash
Error: Too many requests
```
**Çözüm:** 15 dakika bekle veya farklı IP kullan

## 📚 Resources

- [Resend Documentation](https://resend.com/docs)
- [Resend Email API](https://resend.com/docs/api-reference/emails/send-email)
- [Resend React Email](https://resend.com/docs/send-with-react-email)
- [DNS Setup Guide](https://resend.com/docs/dashboard/domains/introduction)

## 🎯 Next Steps

1. ✅ Resend hesabı aç
2. ✅ API key al
3. ✅ .env.local'e ekle
4. ✅ Test et (development)
5. ⏳ Domain ekle (production)
6. ⏳ DNS ayarla
7. ⏳ Custom email template (opsiyonel)

## 💡 Pro Tips

1. **Development**: API key olmadan da çalışır (console'a yazar)
2. **Testing**: `onboarding@resend.dev` kullan (verification gereksiz)
3. **Production**: Kendi domain'ini ekle (profesyonel görünür)
4. **Analytics**: Resend dashboard'da email açılma oranları var
5. **Webhooks**: Email bounce/complaint event'lerini dinleyebilirsin

---

**Yardım İster misin?**
- [Resend Discord](https://resend.com/discord)
- [Resend Support](https://resend.com/support)
- GitHub Issues: Bu repo'da issue aç!
