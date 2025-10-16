# GitHub'a Yükleme Adımları

## 1️⃣ GitHub'da Repository Oluştur

1. **GitHub'a Git**: https://github.com/alitumkaya-me
2. **Giriş Yap**: `alitumkaya-me` hesabıyla
3. **Yeni Repository Oluştur**:
   - Sağ üstteki **+** işaretine tıkla → **New repository**
   - **Repository name**: `screenshot-to-code`
   - **Description**: `AI-powered design to code converter - Transform Figma designs and screenshots into production-ready code (HTML, React, Vue, Svelte)`
   - **Visibility**: 
     - ✅ **Public** (herkese açık) VEYA
     - 🔒 **Private** (sadece sen görebilirsin)
   - **Initialize repository**: 
     - ❌ README ekleme (zaten var)
     - ❌ .gitignore ekleme (zaten var)
     - ❌ License ekleme (istersan sonra eklersin)
   - **Create repository** butonuna tıkla

## 2️⃣ Repository'yi Bağla ve Yükle

Repository oluşturduktan sonra GitHub sana komutlar gösterecek. Aşağıdaki komutları **PowerShell**'de çalıştır:

```powershell
# Repository dizinine git (zaten oradasın ama emin olmak için)
cd C:\Users\Ali\screenshot-to-code

# GitHub remote ekle (URL'yi GitHub'dan kopyala)
git remote add origin https://github.com/alitumkaya-me/screenshot-to-code.git

# Ana branch'ı main olarak ayarla (modern GitHub standardı)
git branch -M main

# İlk push (yükleme)
git push -u origin main
```

## 3️⃣ GitHub Credentials

Push yaparken kullanıcı adı ve şifre isteyecek:

- **Username**: `alitumkaya-me`
- **Password**: ⚠️ **Personal Access Token** kullanman gerekiyor (GitHub artık şifre kabul etmiyor)

### Personal Access Token Oluştur:

1. GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. **Generate new token** → **Generate new token (classic)**
3. **Note**: `screenshot-to-code-upload`
4. **Expiration**: `90 days` (veya istediğin süre)
5. **Scopes** (yetkiler):
   - ✅ `repo` (full control of private repositories)
6. **Generate token** butonuna tıkla
7. **Token'ı kopyala** (bir daha gösterilmeyecek!)
8. Push yaparken **password** yerine bu **token**'ı kullan

## 4️⃣ Alternatif: SSH Kullan (Önerilen)

Sürekli token girmek istemiyorsan SSH key kullanabilirsin:

```powershell
# SSH key oluştur
ssh-keygen -t ed25519 -C "your_email@example.com"

# Public key'i kopyala
cat ~/.ssh/id_ed25519.pub
```

Sonra:
1. GitHub → **Settings** → **SSH and GPG keys** → **New SSH key**
2. Public key'i yapıştır ve kaydet
3. Remote URL'yi HTTPS yerine SSH kullanacak şekilde değiştir:

```powershell
git remote set-url origin git@github.com:alitumkaya-me/screenshot-to-code.git
git push -u origin main
```

## 5️⃣ Doğrula

Push başarılı olduktan sonra:
1. GitHub'da repository'ne git: https://github.com/alitumkaya-me/screenshot-to-code
2. Tüm dosyaların yüklendiğini kontrol et
3. README.md dosyasının düzgün göründüğünden emin ol

## 📝 Sonraki Güncellemeler İçin

Projeye değişiklik yaptığında:

```powershell
git add .
git commit -m "Açıklama: Ne değiştirildi"
git push
```

## 🔒 .env.local Güvenliği

✅ `.env.local` dosyası `.gitignore`'da olduğu için GitHub'a **yüklenmeyecek**
✅ API key'lerin, secret'ların güvende kalacak
✅ Sadece `.env.example` dosyası yüklenecek (boş template)

## ⚠️ Önemli Notlar

1. **ASLA** `.env.local` dosyasını GitHub'a yükleme
2. **Personal Access Token**'ı güvenli bir yerde sakla
3. Repository **public** ise, hassas bilgilerin kodda olmadığından emin ol
4. Production'da environment variables'ı Vercel/Netlify gibi platformlarda ayarla

---

**Hazırsın! 🚀**

Yukarıdaki adımları takip et. Sorun olursa bana sor!
