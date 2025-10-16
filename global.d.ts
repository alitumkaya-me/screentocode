declare module '*.css'
declare module '*.scss'
declare module '*.sass'
declare module '*.module.css'
declare module '*.module.scss'
declare module '*.module.sass'

interface ImportMeta {
  env: Record<string, string | undefined>
}

// Allow process.env access in some files for simple typing
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: 'development' | 'production' | 'test'
    NEXT_PUBLIC_BASE_URL?: string
    NEXT_PUBLIC_IYZICO_MOCK?: 'true' | 'false'
    IYZICO_API_KEY?: string
    IYZICO_SECRET_KEY?: string
  }
}
