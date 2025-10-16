# 🔐 Authentication System - Complete Guide

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER JOURNEY                                 │
└─────────────────────────────────────────────────────────────────────┘

1. LANDING PAGE (/landing)
   │
   ├─ "Giriş Yap" Button → /auth/signin
   │
   └─ "Hemen Başla" Button → /app (public access for demo)


2. SIGN IN PAGE (/auth/signin)
   │
   ├─ Google OAuth ──────────┐
   │   └─ Click → Google Login → Callback → Session Created
   │
   ├─ GitHub OAuth ──────────┤
   │   └─ Click → GitHub Login → Callback → Session Created
   │
   └─ Email + Password ──────┤
       └─ Submit → Credentials Check → Session Created
                                        │
                                        ▼
                                   /app PAGE
                                   (Protected)


3. SIGN UP PAGE (/auth/signup)
   │
   ├─ Google Sign Up ────────┐
   ├─ GitHub Sign Up ────────┤
   └─ Email Registration ────┤
                             │
                             ▼
                        Auto Sign In
                             │
                             ▼
                        /app PAGE


4. APP PAGE (/app)
   │
   ├─ Session Check ─────────┐
   │   ├─ ✅ Authenticated → Show Full Features
   │   └─ ❌ Not Auth → Redirect to /auth/signin
   │
   └─ Features:
       ├─ 3 Free Trials (tracked per session)
       ├─ Demo Designs
       ├─ Figma Import
       └─ Code Generation
```

---

## 🏗️ Technical Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    NEXTAUTH.JS FLOW                       │
└──────────────────────────────────────────────────────────┘

┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       │ 1. User clicks "Sign In with Google"
       │
       ▼
┌─────────────────────┐
│  /auth/signin page  │
│  (Client Component) │
└──────┬──────────────┘
       │
       │ 2. signIn('google', { callbackUrl: '/app' })
       │
       ▼
┌─────────────────────────────────────┐
│  /api/auth/[...nextauth].ts         │
│  (NextAuth Route Handler)           │
│                                     │
│  ┌─────────────────────────────┐  │
│  │   GoogleProvider            │  │
│  │   ├─ clientId               │  │
│  │   └─ clientSecret           │  │
│  │                              │  │
│  │   GitHubProvider            │  │
│  │   ├─ clientId               │  │
│  │   └─ clientSecret           │  │
│  │                              │  │
│  │   CredentialsProvider       │  │
│  │   └─ authorize()            │  │
│  └─────────────────────────────┘  │
└──────┬──────────────────────────────┘
       │
       │ 3. Redirect to OAuth Provider
       │
       ▼
┌─────────────────────┐
│  Google / GitHub    │
│  (External OAuth)   │
└──────┬──────────────┘
       │
       │ 4. User authorizes
       │
       ▼
┌─────────────────────────────────────┐
│  /api/auth/callback/google          │
│  (NextAuth Callback)                │
│                                     │
│  Callbacks:                         │
│  ├─ jwt({ token, user })           │
│  │   └─ token.id = user.id         │
│  │                                  │
│  └─ session({ session, token })    │
│      └─ session.user.id = token.id │
└──────┬──────────────────────────────┘
       │
       │ 5. Create JWT Token
       │
       ▼
┌─────────────────────┐
│   Session Created   │
│   (JWT stored in    │
│   HTTP-only cookie) │
└──────┬──────────────┘
       │
       │ 6. Redirect to /app
       │
       ▼
┌─────────────────────┐
│   /app PAGE         │
│   (Protected Route) │
│                     │
│   useSession()      │
│   ├─ status: "authenticated"
│   └─ data: { user: {...} }
└─────────────────────┘
```

---

## 🎯 Component Structure

```
📁 project-root/
│
├─ 📁 app/
│  ├─ 📁 auth/
│  │  ├─ 📁 signin/
│  │  │  └─ page.tsx ─────────── Sign In Page (Client Component)
│  │  │     ├─ Google Button
│  │  │     ├─ GitHub Button
│  │  │     ├─ Email Form
│  │  │     └─ Sign Up Link
│  │  │
│  │  └─ 📁 signup/
│  │     └─ page.tsx ─────────── Sign Up Page (Client Component)
│  │        ├─ Social Buttons
│  │        ├─ Registration Form
│  │        └─ Sign In Link
│  │
│  ├─ 📁 app/
│  │  └─ page.tsx ────────────── App Page (Protected, uses session)
│  │
│  └─ layout.tsx ─────────────── Root Layout (wraps with AuthProvider)
│
├─ 📁 pages/api/
│  └─ 📁 auth/
│     └─ [...nextauth].ts ────── NextAuth Configuration
│        ├─ Providers Setup
│        ├─ Callbacks
│        ├─ Session Strategy
│        └─ Pages Config
│
├─ 📁 components/
│  └─ AuthProvider.tsx ───────── SessionProvider Wrapper
│
└─ 📁 types/
   └─ next-auth.d.ts ─────────── TypeScript Declarations
```

---

## 🔧 Setup Guide

### Step 1: Install Dependencies
```bash
npm install next-auth bcryptjs
# Already installed ✅
```

### Step 2: Environment Variables
Create/update `.env.local`:

```env
# NextAuth Core
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-32-chars-minimum

# Google OAuth
GOOGLE_CLIENT_ID=123456789-abcdefg.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnop

# GitHub OAuth
GITHUB_ID=Iv1.a1b2c3d4e5f6g7h8
GITHUB_SECRET=abcdef1234567890abcdef1234567890abcdef12
```

### Step 3: Generate Secret Key
```bash
# Run in terminal:
openssl rand -base64 32

# Or online:
# https://generate-secret.vercel.app/32
```

### Step 4: Setup Google OAuth

#### 4.1 Go to Google Cloud Console
- Visit: https://console.cloud.google.com/
- Create new project: "ScreenToCode"

#### 4.2 Enable Google+ API
- APIs & Services → Library
- Search "Google+ API"
- Click "Enable"

#### 4.3 Create OAuth Credentials
- APIs & Services → Credentials
- Click "Create Credentials" → "OAuth client ID"
- Application type: "Web application"
- Name: "ScreenToCode Web"

#### 4.4 Add Authorized URLs
**Authorized JavaScript origins:**
```
http://localhost:3000
https://yourdomain.com
```

**Authorized redirect URIs:**
```
http://localhost:3000/api/auth/callback/google
https://yourdomain.com/api/auth/callback/google
```

#### 4.5 Copy Credentials
- Client ID → `GOOGLE_CLIENT_ID`
- Client Secret → `GOOGLE_CLIENT_SECRET`

### Step 5: Setup GitHub OAuth

#### 5.1 Go to GitHub Settings
- Visit: https://github.com/settings/developers
- Click "New OAuth App"

#### 5.2 Fill Application Details
```
Application name: ScreenToCode
Homepage URL: http://localhost:3000
Authorization callback URL: http://localhost:3000/api/auth/callback/github
```

#### 5.3 Copy Credentials
- Client ID → `GITHUB_ID`
- Generate new client secret → `GITHUB_SECRET`

---

## 🎨 UI Components Breakdown

### Sign In Page Features

```tsx
┌────────────────────────────────────────┐
│  🌟 ScreenToCode Logo                  │
│  Welcome Back                           │
│  Sign in to your account...            │
│                                        │
│  ┌────────────────────────────────┐   │
│  │  📧 Sign in with Google       │   │  ← Google OAuth
│  └────────────────────────────────┘   │
│                                        │
│  ┌────────────────────────────────┐   │
│  │  🐙 Sign in with GitHub       │   │  ← GitHub OAuth
│  └────────────────────────────────┘   │
│                                        │
│  ────────── or ──────────             │
│                                        │
│  Email: [________________]            │  ← Email Input
│                                        │
│  Password: [____________] 👁️          │  ← Password Input
│                                        │
│  ┌────────────────────────────────┐   │
│  │  → Sign In                     │   │  ← Submit Button
│  └────────────────────────────────┘   │
│                                        │
│  Don't have an account? Sign Up       │  ← Sign Up Link
└────────────────────────────────────────┘
```

### Features Panel (Left Side - Desktop)
```
✓ 3 free trial credits
✓ GPT-5 Vision + Claude Sonnet 4.5
✓ Figma, screenshot support
✓ Export as HTML, React, Vue, Svelte
```

---

## 🔒 Session Management

### Client Side Usage

```tsx
// In any Client Component
'use client'
import { useSession } from 'next-auth/react'

export default function MyComponent() {
  const { data: session, status } = useSession()
  
  if (status === 'loading') {
    return <div>Loading...</div>
  }
  
  if (status === 'unauthenticated') {
    return <div>Please sign in</div>
  }
  
  // status === 'authenticated'
  return (
    <div>
      <p>Welcome, {session.user?.name}</p>
      <p>Email: {session.user?.email}</p>
      <img src={session.user?.image} />
    </div>
  )
}
```

### Server Side Usage

```tsx
// In Server Component
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export default async function ServerComponent() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }
  
  return <div>Welcome {session.user.name}</div>
}
```

### API Route Protection

```ts
// In API Route
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  
  // Protected logic here
  res.json({ data: 'Secret data' })
}
```

---

## 🚀 User Flow Examples

### Example 1: New User Registration

```
1. User lands on /landing
   └─ Clicks "Hemen Başla" → /app (public demo)
   
2. User tries to use premium feature
   └─ Redirected to /auth/signin
   
3. User clicks "Don't have an account? Sign Up"
   └─ Redirected to /auth/signup
   
4. User clicks "Sign up with Google"
   └─ Google OAuth flow
   └─ Account created automatically
   └─ Session created with JWT
   └─ Redirected to /app
   
5. User can now use all features
   └─ 3 free trials available
   └─ Can generate code from Figma
   └─ Can export to multiple frameworks
```

### Example 2: Returning User

```
1. User visits /landing
   └─ Clicks "Giriş Yap" → /auth/signin
   
2. User clicks "Sign in with GitHub"
   └─ GitHub OAuth flow
   └─ Session restored
   └─ Redirected to /app
   
3. User's trial count loaded from storage
   └─ Can continue where they left off
```

### Example 3: Session Persistence

```
1. User signs in
   └─ JWT token stored in HTTP-only cookie
   
2. User closes browser
   └─ Cookie persists (30 days max)
   
3. User returns tomorrow
   └─ Cookie still valid
   └─ Session automatically restored
   └─ No need to sign in again
```

---

## 🎭 Visual States

### Authentication States

```
┌─────────────────────────────────────────────────┐
│  STATE: unauthenticated                         │
├─────────────────────────────────────────────────┤
│  - Show "Sign In" button in header             │
│  - Limited access to features                   │
│  - Can view demos only                          │
│  - Redirect to signin on protected routes       │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  STATE: loading                                 │
├─────────────────────────────────────────────────┤
│  - Show loading spinner                         │
│  - Disable buttons                              │
│  - "Checking authentication..."                 │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  STATE: authenticated                           │
├─────────────────────────────────────────────────┤
│  - Show user avatar in header                   │
│  - Display "Welcome, [Name]"                    │
│  - Full feature access                          │
│  - Show trial counter                           │
│  - Enable Figma import                          │
└─────────────────────────────────────────────────┘
```

---

## 🔐 Security Features

### 1. HTTP-Only Cookies
```
✓ JWT stored in HTTP-only cookie
✓ Not accessible via JavaScript
✓ Protected from XSS attacks
✓ Automatically sent with requests
```

### 2. CSRF Protection
```
✓ Built-in CSRF token
✓ Validated on each request
✓ Prevents cross-site attacks
```

### 3. Secure Callbacks
```
✓ OAuth state parameter
✓ Callback URL validation
✓ Token verification
```

### 4. Session Encryption
```
✓ JWT signed with secret
✓ Cannot be tampered with
✓ Expires after 30 days
```

---

## 📱 Responsive Design

### Desktop (1024px+)
```
┌────────────────────────────────────────────────┐
│  [Features Panel]    │    [Auth Form]          │
│  - Benefits          │    - Social Buttons     │
│  - Why Choose Us     │    - Email Form         │
│  - Brand Message     │    - Links              │
└────────────────────────────────────────────────┘
```

### Mobile (<768px)
```
┌──────────────────────────┐
│    [Logo + Title]        │
│    [Auth Form]           │
│    - Social Buttons      │
│    - Email Form          │
│    - Links               │
│    [Benefits hidden]     │
└──────────────────────────┘
```

---

## 🎨 Design Tokens

### Colors
```css
Primary Gradient: from-purple-600 via-pink-600 to-blue-600
Background Dark: from-slate-900 via-purple-900 to-slate-900
Glass Effect: bg-white/5 backdrop-blur-xl
Border: border-white/10
Text: text-white (dark) / text-gray-900 (light)
```

### Animations
```css
Blur Effects: blur-[120px] animate-pulse
Button Hover: hover:scale-105 transition-all duration-300
Shadow: hover:shadow-2xl hover:shadow-purple-500/50
Loading: animate-spin
```

---

## 🧪 Testing Checklist

### Authentication Flow
- [ ] Google OAuth login works
- [ ] GitHub OAuth login works
- [ ] Email login works
- [ ] Sign up creates new user
- [ ] Session persists after refresh
- [ ] Logout clears session
- [ ] Protected routes redirect to signin

### UI/UX
- [ ] Forms validate input
- [ ] Error messages show correctly
- [ ] Loading states display
- [ ] Password toggle works
- [ ] Language switch works (TR/EN)
- [ ] Mobile responsive
- [ ] Dark mode works

### Security
- [ ] JWT token in HTTP-only cookie
- [ ] Session expires after 30 days
- [ ] CSRF protection active
- [ ] No sensitive data in client

---

## 🐛 Troubleshooting

### Issue: Google OAuth Error
```
Error: redirect_uri_mismatch

Solution:
1. Check GOOGLE_CLIENT_ID in .env.local
2. Verify redirect URI in Google Console:
   http://localhost:3000/api/auth/callback/google
3. Ensure NEXTAUTH_URL is set correctly
```

### Issue: Session Not Persisting
```
Error: Session lost on refresh

Solution:
1. Check NEXTAUTH_SECRET is set
2. Verify cookie settings in browser
3. Clear browser cookies and try again
4. Check if localhost is in secure context
```

### Issue: "Sign In" Button Does Nothing
```
Error: No response on click

Solution:
1. Check browser console for errors
2. Verify API route exists: /api/auth/signin
3. Check AuthProvider wraps app
4. Ensure client component has 'use client'
```

---

## 📊 Data Flow Diagram

```
┌──────────┐      ┌──────────┐      ┌──────────┐      ┌──────────┐
│  Browser │─────▶│  NextJS  │─────▶│  OAuth   │─────▶│ Database │
│          │      │  Server  │      │ Provider │      │ (Future) │
└──────────┘      └──────────┘      └──────────┘      └──────────┘
     │                  │                  │                 │
     │  1. Click       │  2. Redirect    │  3. Auth       │
     │  "Sign In"      │  to Provider    │  User          │
     │                  │                  │                 │
     │◀─────────────────│◀─────────────────│◀────────────────│
     │  6. Redirect    │  5. Create      │  4. Return     │
     │  to /app        │  Session        │  User Data     │
     │                  │                  │                 │
     │                  │                  │                 │
     │  7. Request     │                  │                 │
     │  with Cookie    │                  │                 │
     │─────────────────▶│                  │                 │
     │                  │  8. Verify JWT  │                 │
     │                  │─────────────────▶│                 │
     │                  │                  │  9. Query User │
     │                  │                  │────────────────▶│
     │                  │                  │                 │
     │◀─────────────────│◀─────────────────│◀────────────────│
     │  10. Protected  │  Session Valid  │  User Found    │
     │  Content        │                  │                 │
```

---

## 🎓 Best Practices

### DO ✅
```typescript
// Use useSession for client components
const { data: session } = useSession()

// Use getServerSession for server components
const session = await getServerSession(authOptions)

// Protect API routes
if (!session) return res.status(401).json({ error: 'Unauthorized' })

// Store JWT in HTTP-only cookies (automatic with NextAuth)

// Use environment variables for secrets
```

### DON'T ❌
```typescript
// Don't store JWT in localStorage
localStorage.setItem('token', jwt) // ❌ Vulnerable to XSS

// Don't expose session token
<div data-token={session.token}> // ❌

// Don't hardcode OAuth credentials
const clientId = '123456789' // ❌ Use env variables

// Don't skip session checks
if (true) { // ❌ Always verify session
  return protectedData
}
```

---

## 🚀 Production Deployment

### Environment Variables (Production)
```env
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=super-secure-random-string-64-chars-minimum

GOOGLE_CLIENT_ID=prod-client-id
GOOGLE_CLIENT_SECRET=prod-secret

GITHUB_ID=prod-github-id
GITHUB_SECRET=prod-github-secret
```

### Vercel Deployment
1. Push code to GitHub
2. Import to Vercel
3. Add environment variables in Vercel dashboard
4. Update OAuth redirect URIs to production URL
5. Deploy!

### Google Console Updates
```
Production Redirect URI:
https://yourdomain.com/api/auth/callback/google

Authorized JavaScript Origins:
https://yourdomain.com
```

---

## 📈 Future Enhancements

### Planned Features
```
1. Database Integration
   - PostgreSQL with Prisma
   - Store user data persistently
   - Track usage history

2. Email Verification
   - Send verification link
   - Confirm email before access

3. Password Reset
   - Forgot password flow
   - Email reset link

4. Two-Factor Authentication
   - TOTP codes
   - SMS verification

5. Social Profile Sync
   - Import GitHub repos
   - Show Figma projects

6. Team Collaboration
   - Share projects
   - Team workspaces
```

---

## 📚 Resources

### Documentation
- NextAuth.js: https://next-auth.js.org/
- Google OAuth: https://developers.google.com/identity/protocols/oauth2
- GitHub OAuth: https://docs.github.com/en/developers/apps/building-oauth-apps

### Code Examples
- NextAuth Examples: https://github.com/nextauthjs/next-auth-example
- OAuth Playground: https://www.oauth.com/playground/

### Tools
- JWT Debugger: https://jwt.io/
- Secret Generator: https://generate-secret.vercel.app/
- OAuth Testing: https://oauthdebugger.com/

---

**🎉 Authentication System Ready!**

Your app now has enterprise-grade authentication with social logins, secure sessions, and beautiful UI! 🚀
