import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { userStore } from '@/lib/userStore'
import { validateEmail, sanitizeEmail, verifyPassword } from '@/lib/security'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        try {
          // Validate inputs
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Email and password are required')
          }

          // Validate email format
          const emailValidation = validateEmail(credentials.email)
          if (!emailValidation.valid) {
            throw new Error(emailValidation.error || 'Invalid email')
          }

          // Sanitize email
          const sanitizedEmail = sanitizeEmail(credentials.email)

          // Rate limiting check
          const identifier = `login_${sanitizedEmail}`
          if (!userStore.checkRateLimit(identifier)) {
            throw new Error('Too many login attempts. Please try again later.')
          }

          // Find user
          const user = userStore.findByEmail(sanitizedEmail)
          if (!user) {
            throw new Error('Invalid email or password')
          }

          // Check if account is locked
          if (userStore.isUserLocked(user)) {
            throw new Error('Account temporarily locked due to multiple failed login attempts')
          }

          // Verify password
          const isValidPassword = await verifyPassword(credentials.password, user.password)
          
          if (!isValidPassword) {
            // Increment failed attempts
            userStore.incrementLoginAttempts(user.id)
            throw new Error('Invalid email or password')
          }

          // Update last login
          userStore.updateLastLogin(user.id)

          // Return user (NextAuth will create session)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-change-this-in-production',
}

export default NextAuth(authOptions)
