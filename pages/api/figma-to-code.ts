import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

interface FigmaNode {
  id: string
  name: string
  type: string
  children?: FigmaNode[]
  fills?: any[]
  strokes?: any[]
  effects?: any[]
  constraints?: any
  layoutMode?: string
  primaryAxisSizingMode?: string
  counterAxisSizingMode?: string
  paddingLeft?: number
  paddingRight?: number
  paddingTop?: number
  paddingBottom?: number
  itemSpacing?: number
  layoutAlign?: string
  layoutGrow?: number
  absoluteBoundingBox?: {
    x: number
    y: number
    width: number
    height: number
  }
  style?: any
  characters?: string
  fontSize?: number
  fontWeight?: number
  fontFamily?: string
  textAlignHorizontal?: string
  textAlignVertical?: string
  lineHeight?: any
  opacity?: number
  blendMode?: string
  cornerRadius?: number
  exportSettings?: any[]
}

interface FigmaFile {
  name: string
  lastModified: string
  thumbnailUrl: string
  version: string
  document: FigmaNode
  components: Record<string, any>
  styles: Record<string, any>
  schemaVersion: number
}

interface DesignAnalysis {
  structure: any
  colors: string[]
  typography: any[]
  components: ComponentAnalysis[]
  layout: LayoutAnalysis
  spacing: number[]
  responsive: ResponsiveAnalysis
}

interface ComponentAnalysis {
  type: string
  name: string
  properties: any
  children: any[]
  position: { x: number; y: number; width: number; height: number }
}

interface LayoutAnalysis {
  type: 'flex' | 'grid' | 'absolute'
  direction?: 'row' | 'column'
  align?: string
  justify?: string
  gap?: number
  columns?: number
}

interface ResponsiveAnalysis {
  breakpoints: Array<{
    name: string
    width: number
    changes: string[]
  }>
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { figmaUrl, framework = 'html', includeStyles = true } = req.body

  if (!figmaUrl) {
    return res.status(400).json({ error: 'Figma URL is required' })
  }

  try {
    // Parse Figma URL
    const urlMatch = figmaUrl.match(/figma\.com\/(file|design)\/([a-zA-Z0-9]+)/)
    const nodeMatch = figmaUrl.match(/node-id=([^&]+)/)
    
    if (!urlMatch) {
      return res.status(400).json({ error: 'Invalid Figma URL format' })
    }

    const fileKey = urlMatch[2]
    const nodeId = nodeMatch ? decodeURIComponent(nodeMatch[1]).replace(/-/g, ':') : null

    const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY
    const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY

    if (!FIGMA_ACCESS_TOKEN) {
      console.warn('⚠️ FIGMA_ACCESS_TOKEN not found - using mock mode')
      return mockFigmaToCode(res, framework)
    }

    // Step 1: Fetch Figma file data
    console.log(`📥 Fetching Figma file: ${fileKey}`)
    const fileUrl = nodeId 
      ? `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${nodeId}`
      : `https://api.figma.com/v1/files/${fileKey}`

    const fileResponse = await axios.get<FigmaFile>(fileUrl, {
      headers: { 'X-Figma-Token': FIGMA_ACCESS_TOKEN }
    })

    const figmaData = fileResponse.data
    console.log(`✅ Figma file fetched: ${figmaData.name}`)

    // Step 2: Deep analyze Figma structure
    console.log('🔍 Analyzing Figma design structure...')
    const analysis = await analyzeFigmaDesign(figmaData, nodeId)
    console.log(`✅ Found ${analysis.components.length} components`)

    // Step 3: Export node as high-res image for Vision AI
    console.log('📸 Exporting design as image...')
    const targetNodeId = nodeId || Object.keys(figmaData.document.children || {})[0]
    const imageResponse = await axios.get(
      `https://api.figma.com/v1/images/${fileKey}?ids=${targetNodeId}&format=png&scale=2`,
      { headers: { 'X-Figma-Token': FIGMA_ACCESS_TOKEN } }
    )

    const imageUrl = imageResponse.data.images?.[targetNodeId]
    if (!imageUrl) {
      throw new Error('Failed to export Figma design as image')
    }

    // Step 4: Vision AI analysis (GPT-5 Vision)
    console.log('👁️ Running GPT-5 Vision analysis...')
    let visionAnalysis = null

    if (OPENAI_API_KEY) {
      try {
        const visionResponse = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-4-vision-preview', // Will use gpt-5 when available
            messages: [
              {
                role: 'system',
                content: 'You are an expert UI/UX analyzer. Analyze Figma designs and extract detailed component structure, colors, typography, spacing, and layout patterns. Return detailed JSON.'
              },
              {
                role: 'user',
                content: [
                  {
                    type: 'text',
                    text: `Analyze this Figma design in extreme detail:

Figma Structure Data:
${JSON.stringify(analysis, null, 2)}

Extract:
1. Component hierarchy and types (buttons, inputs, cards, sections)
2. Color palette (primary, secondary, accents, backgrounds)
3. Typography system (font families, sizes, weights, line heights)
4. Spacing system (margins, paddings, gaps)
5. Layout patterns (flex, grid, absolute positioning)
6. Interactive elements (hover states, animations)
7. Responsive behavior
8. Design tokens

Return as structured JSON.`
                  },
                  {
                    type: 'image_url',
                    image_url: { url: imageUrl, detail: 'high' }
                  }
                ]
              }
            ],
            max_tokens: 4096,
            temperature: 0.2
          },
          {
            headers: {
              Authorization: `Bearer ${OPENAI_API_KEY}`,
              'Content-Type': 'application/json'
            }
          }
        )

        const content = visionResponse.data.choices[0].message.content
        try {
          visionAnalysis = JSON.parse(content)
        } catch {
          visionAnalysis = { raw: content }
        }
        console.log('✅ Vision analysis complete')
      } catch (error: any) {
        console.error('Vision API error:', error.message)
      }
    }

    // Step 5: Combine Figma data + Vision analysis
    const combinedAnalysis = {
      figma: analysis,
      vision: visionAnalysis,
      meta: {
        fileName: figmaData.name,
        fileKey,
        nodeId,
        version: figmaData.version,
        lastModified: figmaData.lastModified
      }
    }

    // Step 6: Generate code with Claude Sonnet 4.5
    console.log('🤖 Generating production code with Claude Sonnet 4.5...')
    
    if (!CLAUDE_API_KEY) {
      console.warn('⚠️ CLAUDE_API_KEY not found - generating basic code')
      const basicCode = generateBasicCode(combinedAnalysis, framework)
      return res.status(200).json({
        success: true,
        code: basicCode,
        analysis: combinedAnalysis,
        framework,
        mock: true
      })
    }

    const claudeResponse = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-sonnet-4-20250514',
        max_tokens: 16000,
        temperature: 0.1,
        system: `You are an elite frontend developer specialized in converting Figma designs to production-ready code. Generate pixel-perfect, accessible, and performant code following modern best practices.`,
        messages: [
          {
            role: 'user',
            content: `Convert this Figma design to production-ready ${framework.toUpperCase()} code:

${JSON.stringify(combinedAnalysis, null, 2)}

🎯 CRITICAL REQUIREMENTS:

1. **Framework: ${framework.toUpperCase()}**
   ${framework === 'html' ? `
   - Pure HTML5 with Tailwind CSS 3.4+
   - Vanilla JavaScript for interactions
   - CDN for dependencies
   ` : framework === 'react' ? `
   - React 18+ with TypeScript
   - Tailwind CSS for styling
   - Proper component composition
   - Hooks (useState, useEffect, useCallback)
   ` : framework === 'vue' ? `
   - Vue 3 Composition API
   - TypeScript
   - Tailwind CSS
   - <script setup> syntax
   ` : `
   - Svelte 4+
   - TypeScript
   - Tailwind CSS
   - Reactive declarations
   `}

2. **Design Fidelity:**
   - EXACT spacing, padding, margins from Figma
   - EXACT colors (use Figma values)
   - EXACT typography (fonts, sizes, weights, line-heights)
   - EXACT component dimensions and positions
   - EXACT border radius, shadows, effects

3. **Component Structure:**
   - Analyze Figma component hierarchy
   - Create reusable components
   - Proper prop typing (TypeScript)
   - Logical component breakdown

4. **Responsive Design:**
   - Mobile-first approach
   - Breakpoints: sm(640px), md(768px), lg(1024px), xl(1280px), 2xl(1536px)
   - Fluid typography (clamp)
   - Flexible layouts (Grid/Flexbox)

5. **Performance:**
   - Optimized rendering
   - Lazy loading for images
   - Code splitting (if applicable)
   - Minimal re-renders

6. **Accessibility:**
   - Semantic HTML5
   - ARIA labels and roles
   - Keyboard navigation
   - Focus management
   - Color contrast WCAG AA

7. **Modern Features:**
   - CSS Grid and Flexbox
   - CSS variables for theming
   - Smooth animations (Framer Motion if React)
   - Gradient backgrounds
   - Glassmorphism effects
   - Dark mode support

8. **Code Quality:**
   - Clean, readable code
   - Meaningful variable names
   - Commented sections
   - No hardcoded values (use constants)
   - Error boundaries (React)

🚀 GENERATE COMPLETE, PRODUCTION-READY CODE:
- Include ALL necessary imports
- Include ALL components
- Include ALL styles
- Include ALL logic
- COMPLETE and WORKING code

${framework === 'html' ? 'Return complete HTML file with embedded CSS and JS' : 'Return all component files with proper structure'}

NO EXPLANATIONS. ONLY CODE.`
          }
        ]
      },
      {
        headers: {
          'x-api-key': CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json'
        },
        timeout: 120000 // 2 minutes timeout for large projects
      }
    )

    const generatedCode = claudeResponse.data.content[0].text
    console.log('✅ Code generation complete')

    return res.status(200).json({
      success: true,
      code: generatedCode,
      analysis: combinedAnalysis,
      framework,
      meta: {
        model: 'claude-sonnet-4',
        figmaFile: figmaData.name,
        componentsCount: analysis.components.length,
        colorsCount: analysis.colors.length
      }
    })

  } catch (error: any) {
    console.error('Figma to Code error:', error.response?.data || error.message)
    return res.status(500).json({ 
      error: 'Figma to code conversion failed',
      details: error.message,
      suggestion: 'Check Figma URL, API tokens, and try again'
    })
  }
}

// Deep Figma design analyzer
async function analyzeFigmaDesign(figmaData: any, nodeId: string | null): Promise<DesignAnalysis> {
  const colors = new Set<string>()
  const typography: any[] = []
  const components: ComponentAnalysis[] = []
  const spacing = new Set<number>()

  function traverseNode(node: FigmaNode, depth = 0) {
    // Extract colors
    if (node.fills) {
      node.fills.forEach((fill: any) => {
        if (fill.type === 'SOLID' && fill.color) {
          const { r, g, b, a = 1 } = fill.color
          const hex = rgbToHex(r, g, b, a)
          colors.add(hex)
        }
      })
    }

    // Extract typography
    if (node.type === 'TEXT') {
      typography.push({
        fontFamily: node.fontFamily,
        fontSize: node.fontSize,
        fontWeight: node.fontWeight,
        lineHeight: node.lineHeight,
        text: node.characters
      })
    }

    // Extract spacing
    if (node.paddingLeft) spacing.add(node.paddingLeft)
    if (node.paddingTop) spacing.add(node.paddingTop)
    if (node.itemSpacing) spacing.add(node.itemSpacing)

    // Analyze component
    const component: ComponentAnalysis = {
      type: detectComponentType(node),
      name: node.name,
      properties: extractProperties(node),
      children: [],
      position: node.absoluteBoundingBox || { x: 0, y: 0, width: 0, height: 0 }
    }

    components.push(component)

    // Traverse children
    if (node.children) {
      node.children.forEach(child => traverseNode(child, depth + 1))
    }
  }

  const rootNode = nodeId 
    ? figmaData.nodes?.[nodeId]?.document || figmaData.document
    : figmaData.document

  traverseNode(rootNode)

  return {
    structure: rootNode,
    colors: Array.from(colors),
    typography: typography.filter((t, i, a) => 
      a.findIndex(x => x.fontSize === t.fontSize && x.fontWeight === t.fontWeight) === i
    ),
    components,
    layout: detectLayout(rootNode),
    spacing: Array.from(spacing).sort((a, b) => a - b),
    responsive: {
      breakpoints: [
        { name: 'mobile', width: 375, changes: [] },
        { name: 'tablet', width: 768, changes: [] },
        { name: 'desktop', width: 1440, changes: [] }
      ]
    }
  }
}

function detectComponentType(node: FigmaNode): string {
  const name = node.name.toLowerCase()
  const type = node.type

  if (type === 'TEXT') return 'text'
  if (type === 'RECTANGLE' && name.includes('button')) return 'button'
  if (type === 'FRAME' || type === 'COMPONENT') {
    if (name.includes('button')) return 'button'
    if (name.includes('input') || name.includes('field')) return 'input'
    if (name.includes('card')) return 'card'
    if (name.includes('nav') || name.includes('header')) return 'navbar'
    if (name.includes('hero')) return 'hero'
    if (name.includes('footer')) return 'footer'
    if (name.includes('modal')) return 'modal'
    return 'container'
  }

  return type.toLowerCase()
}

function extractProperties(node: FigmaNode): any {
  return {
    width: node.absoluteBoundingBox?.width,
    height: node.absoluteBoundingBox?.height,
    opacity: node.opacity,
    cornerRadius: node.cornerRadius,
    layoutMode: node.layoutMode,
    padding: {
      top: node.paddingTop,
      right: node.paddingRight,
      bottom: node.paddingBottom,
      left: node.paddingLeft
    },
    gap: node.itemSpacing
  }
}

function detectLayout(node: FigmaNode): LayoutAnalysis {
  if (node.layoutMode === 'HORIZONTAL') {
    return {
      type: 'flex',
      direction: 'row',
      gap: node.itemSpacing
    }
  } else if (node.layoutMode === 'VERTICAL') {
    return {
      type: 'flex',
      direction: 'column',
      gap: node.itemSpacing
    }
  }

  return { type: 'absolute' }
}

function rgbToHex(r: number, g: number, b: number, a: number = 1): string {
  const toHex = (n: number) => Math.round(n * 255).toString(16).padStart(2, '0')
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`
  return a < 1 ? `${hex}${toHex(a)}` : hex
}

function generateBasicCode(analysis: any, framework: string): string {
  const { figma, meta } = analysis
  
  if (framework === 'html') {
    return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${meta.fileName}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    /* Design tokens from Figma */
    :root {
      ${figma.colors.map((c: string, i: number) => `--color-${i + 1}: ${c};`).join('\n      ')}
    }
  </style>
</head>
<body class="bg-gray-50">
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8">${meta.fileName}</h1>
    <div class="grid gap-6">
      ${figma.components.slice(0, 5).map((c: any) => `
        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-2">${c.name}</h2>
          <p class="text-gray-600">Component type: ${c.type}</p>
        </div>
      `).join('')}
    </div>
    <p class="mt-8 text-sm text-gray-500">
      Generated from Figma • Add CLAUDE_API_KEY for production-ready code
    </p>
  </div>
</body>
</html>`
  }

  return `// ${framework.toUpperCase()} code generation requires CLAUDE_API_KEY
// Add it to .env.local to generate production-ready code

export default function Component() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">${meta.fileName}</h1>
      <p className="text-gray-600 mt-4">
        Figma design with ${figma.components.length} components
      </p>
    </div>
  )
}`
}

function mockFigmaToCode(res: NextApiResponse, framework: string) {
  const mockCode = framework === 'html' ? `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Figma Design - Mock Mode</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
  <div class="container mx-auto px-6 py-12">
    <div class="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Figma to Code - Mock Mode</h1>
        <p class="text-gray-600">Add FIGMA_ACCESS_TOKEN to .env.local for real conversion</p>
      </div>
      
      <div class="space-y-4">
        <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h3 class="font-semibold text-purple-900 mb-2">✨ What This Will Do:</h3>
          <ul class="text-purple-800 space-y-1 text-sm">
            <li>• Extract complete Figma design structure</li>
            <li>• Analyze colors, typography, spacing, components</li>
            <li>• Generate pixel-perfect production code</li>
            <li>• Support HTML, React, Vue, Svelte</li>
          </ul>
        </div>
        
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 class="font-semibold text-blue-900 mb-2">🔧 Setup Required:</h3>
          <pre class="bg-blue-900 text-blue-100 p-3 rounded text-xs overflow-x-auto">FIGMA_ACCESS_TOKEN=your_figma_token_here
OPENAI_API_KEY=your_openai_key (optional)
CLAUDE_API_KEY=your_claude_key</pre>
        </div>
      </div>
    </div>
  </div>
</body>
</html>` : `// Mock Figma to Code
export default function MockFigmaDesign() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-4">Figma to Code - Mock Mode</h1>
        <p className="text-gray-600 mb-6">
          Add FIGMA_ACCESS_TOKEN to .env.local for real conversion
        </p>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Features:</h3>
          <ul className="space-y-1 text-sm">
            <li>• Complete Figma design extraction</li>
            <li>• AI-powered code generation</li>
            <li>• Production-ready output</li>
          </ul>
        </div>
      </div>
    </div>
  )
}`

  return res.status(200).json({
    success: true,
    code: mockCode,
    mock: true,
    framework,
    message: 'Mock mode active. Add FIGMA_ACCESS_TOKEN to .env.local for real Figma conversion'
  })
}
