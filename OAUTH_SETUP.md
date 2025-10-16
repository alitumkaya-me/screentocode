# OAuth Kurulum Rehberi

Bu rehber, Google ve GitHub OAuth entegrasyonunu nasıl yapılandıracağınızı adım adım açıklar.

## 🔐 Google OAuth Kurulumu

### 1. Google Cloud Console'a Git
- [Google Cloud Console](https://console.cloud.google.com/) adresine gidin
- Google hesabınızla giriş yapın

### 2. Proje Oluştur veya Seç
- Sol üstteki menüden mevcut bir proje seçin veya **"Yeni Proje"** oluşturun
- Proje adı: `ScreenToCode` (veya istediğiniz bir isim)

### 3. Google+ API'yi Etkinleştir
- Sol menüden **"API'ler ve Hizmetler" > "Kitaplık"** seçin
- **"Google+ API"** araması yapın
- API'yi bulup **"Etkinleştir"** butonuna tıklayın

### 4. OAuth İzin Ekranını Yapılandır
- **"API'ler ve Hizmetler" > "OAuth izin ekranı"** seçin
- Kullanıcı türü: **"Harici"** seçin (test için yeterli)
- **Uygulama adı**: `ScreenToCode`
- **Kullanıcı destek e-postası**: Kendi e-postanız
- **Geliştirici iletişim bilgileri**: Kendi e-postanız
- Kapsamlar (Scopes): `.../auth/userinfo.email` ve `.../auth/userinfo.profile`
- **Kaydet ve Devam Et**

### 5. OAuth 2.0 İstemci Kimliği Oluştur
- **"Kimlik Bilgileri"** sekmesine gidin
- **"+ KİMLİK BİLGİLERİ OLUŞTUR" > "OAuth istemci kimliği"** seçin
- Uygulama türü: **"Web uygulaması"**
- Ad: `ScreenToCode Web Client`
- **Yetkili yönlendirme URI'leri** ekleyin:
  ```
  http://localhost:3002/api/auth/callback/google
  http://localhost:3000/api/auth/callback/google
  ```
- **Oluştur** butonuna tıklayın

### 6. Kimlik Bilgilerini Kaydet
- **İstemci Kimliği** ve **İstemci Gizli Anahtarı** gösterilecek
- `.env.local` dosyasına ekleyin:
  ```bash
  GOOGLE_CLIENT_ID=sizin-client-id-buraya
  GOOGLE_CLIENT_SECRET=sizin-client-secret-buraya
  ```

---

## 🐙 GitHub OAuth Kurulumu

### 1. GitHub Developer Settings'e Git
- [GitHub Developer Settings](https://github.com/settings/developers) adresine gidin
- Veya: GitHub > Settings > Developer settings

### 2. Yeni OAuth App Oluştur
- **"OAuth Apps"** sekmesine tıklayın
- **"New OAuth App"** butonuna tıklayın

### 3. Uygulama Bilgilerini Gir
- **Application name**: `ScreenToCode`
- **Homepage URL**: `http://localhost:3002`
- **Application description**: `AI-powered design to code converter`
- **Authorization callback URL**: `http://localhost:3002/api/auth/callback/github`
- **Register application** butonuna tıklayın

### 4. Client Secret Oluştur
- Oluşturulan uygulamada **"Generate a new client secret"** butonuna tıklayın
- Secret'ı hemen kopyalayın (bir daha gösterilmeyecek!)

### 5. Kimlik Bilgilerini Kaydet
- **Client ID** ve **Client Secret** bilgilerini kopyalayın
- `.env.local` dosyasına ekleyin:
  ```bash
  GITHUB_ID=sizin-github-client-id-buraya
  GITHUB_SECRET=sizin-github-client-secret-buraya
  ```

---

## 🚀 Kurulumu Test Et

### 1. Geliştirme Sunucusunu Başlat
```bash
npm run dev
```

### 2. Giriş Sayfasına Git
- Tarayıcıda `http://localhost:3002/auth/signin` adresine gidin

### 3. OAuth Butonlarını Test Et
- **"Google ile Giriş Yap"** butonuna tıklayın
  - Google hesap seçim ekranı açılacak
  - İzinleri onaylayın
  - Başarılı giriş sonrası `/app` sayfasına yönlendirileceksiniz

- **"GitHub ile Giriş Yap"** butonuna tıklayın
  - GitHub yetkilendirme ekranı açılacak
  - "Authorize" butonuna tıklayın
  - Başarılı giriş sonrası `/app` sayfasına yönlendirileceksiniz

---

## 🔧 Sorun Giderme

### Google OAuth Hataları

**Hata**: "redirect_uri_mismatch"
- **Çözüm**: Google Console'da yetkili yönlendirme URI'lerini kontrol edin
- Tam olarak `http://localhost:3002/api/auth/callback/google` olmalı

**Hata**: "access_blocked: This app's request is invalid"
- **Çözüm**: OAuth izin ekranını tamamlayın ve gerekli kapsamları ekleyin

**Hata**: "Google+ API has not been used in project"
- **Çözüm**: Google+ API'yi etkinleştirin ve birkaç dakika bekleyin

### GitHub OAuth Hataları

**Hata**: "The redirect_uri MUST match the registered callback URL"
- **Çözüm**: GitHub OAuth App ayarlarında callback URL'yi kontrol edin
- Tam olarak `http://localhost:3002/api/auth/callback/github` olmalı

**Hata**: "Bad credentials"
- **Çözüm**: GITHUB_ID ve GITHUB_SECRET değerlerinin doğru olduğundan emin olun
- Client Secret'ı yeniden oluşturun ve güncelleyin

### Genel Hatalar

**Hata**: "NEXTAUTH_URL environment variable is not set"
- **Çözüm**: `.env.local` dosyasına ekleyin:
  ```bash
  NEXTAUTH_URL=http://localhost:3002
  ```

**Hata**: Session bilgisi kaybolyor
- **Çözüm**: `.env.local` dosyasına güçlü bir NEXTAUTH_SECRET ekleyin:
  ```bash
  NEXTAUTH_SECRET=$(openssl rand -base64 32)
  ```

---

## 📝 Production Kurulumu

Production'a geçerken şunları yapın:

1. **Domain Güncellemeleri**:
   ```bash
   NEXTAUTH_URL=https://yourdomain.com
   ```

2. **Google Console**:
   - Yetkili yönlendirme URI'sine production URL'nizi ekleyin:
     ```
     https://yourdomain.com/api/auth/callback/google
     ```

3. **GitHub OAuth App**:
   - Homepage URL: `https://yourdomain.com`
   - Authorization callback URL: `https://yourdomain.com/api/auth/callback/github`

4. **NEXTAUTH_SECRET**:
   - Güçlü, benzersiz bir secret oluşturun:
     ```bash
     openssl rand -base64 32
     ```

---

## ✅ Kontrol Listesi

- [ ] Google Cloud Console'da proje oluşturuldu
- [ ] Google+ API etkinleştirildi
- [ ] OAuth izin ekranı yapılandırıldı
- [ ] Google OAuth Client ID ve Secret alındı
- [ ] GitHub OAuth App oluşturuldu
- [ ] GitHub Client ID ve Secret alındı
- [ ] `.env.local` dosyası güncellendi
- [ ] `npm run dev` ile sunucu başlatıldı
- [ ] Google girişi test edildi ✓
- [ ] GitHub girişi test edildi ✓
- [ ] Session'lar düzgün çalışıyor ✓

---

## 📞 Destek

Sorun yaşıyorsanız:
1. Bu rehberdeki adımları tekrar kontrol edin
2. `.env.local` dosyasındaki değerlerin doğru olduğundan emin olun
3. Console/Terminal'deki hata mesajlarını kontrol edin
4. Tarayıcı konsolunu kontrol edin (F12)

**Başarılar! 🚀**
