// Figma to Code integration types and utilities

export interface FigmaImportOptions {
  url: string
  framework: 'html' | 'react' | 'vue' | 'svelte'
  includeStyles?: boolean
  responsive?: boolean
}

export interface FigmaImportResult {
  success: boolean
  code: string
  analysis?: any
  framework: string
  meta?: {
    model: string
    figmaFile: string
    componentsCount: number
    colorsCount: number
  }
  mock?: boolean
}

export async function importFromFigma(options: FigmaImportOptions): Promise<FigmaImportResult> {
  const response = await fetch('/api/figma-to-code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(options)
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Figma import failed')
  }

  return response.json()
}

export function validateFigmaUrl(url: string): boolean {
  const regex = /^https:\/\/(www\.)?figma\.com\/(file|design)\/[a-zA-Z0-9]+/
  return regex.test(url)
}

export function extractFigmaFileKey(url: string): string | null {
  const match = url.match(/figma\.com\/(file|design)\/([a-zA-Z0-9]+)/)
  return match ? match[2] : null
}

export function extractFigmaNodeId(url: string): string | null {
  const match = url.match(/node-id=([^&]+)/)
  return match ? decodeURIComponent(match[1]) : null
}

export const FIGMA_FRAMEWORKS = [
  { value: 'html', label: 'HTML + Tailwind', icon: '🌐' },
  { value: 'react', label: 'React + Tailwind', icon: '⚛️' },
  { value: 'vue', label: 'Vue 3 + Tailwind', icon: '💚' },
  { value: 'svelte', label: 'Svelte + Tailwind', icon: '🧡' }
] as const
