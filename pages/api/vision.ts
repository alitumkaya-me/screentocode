import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { imageUrl } = req.body

  if (!imageUrl) {
    return res.status(400).json({ error: 'imageUrl is required' })
  }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY

  // If no API key, return enhanced mock data (simulates GPT-5 Vision output)
  if (!OPENAI_API_KEY) {
    console.log('⚠️ OPENAI_API_KEY not found - using mock mode (GPT-5 Vision simulation)')
    return res.status(200).json({
      mock: true,
      model: 'gpt-5-vision-mock',
      components: [
        { 
          type: 'navbar', 
          position: 'top',
          height: '72px',
          items: ['logo', 'navigation', 'cta-button'],
          background: 'rgba(0, 0, 0, 0.8)',
          backdrop_filter: 'blur(20px)'
        },
        { 
          type: 'hero',
          layout: 'center',
          heading: { text: 'Welcome to Our Platform', size: '56px', weight: '800' },
          subheading: { text: 'Build amazing things with AI', size: '20px', color: '#9ca3af' },
          cta: { text: 'Get Started Free', style: 'gradient-primary' }
        },
        { 
          type: 'features-grid',
          columns: 3,
          cards: [
            { icon: 'zap', title: 'Fast', body: 'Lightning speed performance' },
            { icon: 'shield', title: 'Secure', body: 'Enterprise-grade security' },
            { icon: 'code', title: 'Clean Code', body: 'Production-ready output' }
          ]
        },
      ],
      colors: {
        primary: '#8b5cf6',
        secondary: '#ec4899',
        accent: '#3b82f6',
        background: '#000000',
        text: '#ffffff',
        muted: '#6b7280'
      },
      typography: {
        heading_font: 'Inter, system-ui, sans-serif',
        body_font: 'Inter, system-ui, sans-serif',
        scale: '1.25'
      },
      layout: {
        system: 'flexbox',
        max_width: '1280px',
        spacing_base: '8px',
        responsive: true
      },
      design_system: 'tailwind',
      accessibility: {
        contrast_ratio: 'AAA',
        semantic_html: true,
        aria_labels: true
      }
    })
  }

  try {
    // Call OpenAI GPT-5 Vision API with enhanced capabilities
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-5',
        messages: [
          {
            role: 'system',
            content: 'You are an expert UI/UX analyzer powered by GPT-5. Analyze screenshots with extreme precision, identifying components, layouts, colors, typography, spacing, animations, and design patterns. Return detailed JSON analysis.',
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Perform deep UI analysis on this screenshot. Extract:
- Components: All UI elements (buttons, inputs, headers, cards, navbars, footers, forms, modals, etc.)
- Colors: Full color palette including gradients
- Typography: Fonts, sizes, weights, line heights
- Layout: Grid system, spacing, alignment, responsive breakpoints
- Design patterns: Material, Tailwind, Bootstrap, custom
- Animations: Transitions, hover effects, micro-interactions
- Accessibility: Contrast ratios, semantic structure

Return as detailed JSON structure.`,
              },
              {
                type: 'image_url',
                image_url: {
                  url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${imageUrl}`,
                  detail: 'high',
                },
              },
            ],
          },
        ],
        max_tokens: 4096,
        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const content = response.data.choices[0].message.content
    
    try {
      const parsed = JSON.parse(content)
      return res.status(200).json(parsed)
    } catch {
      // If not JSON, return wrapped content
      return res.status(200).json({ analysis: content })
    }
  } catch (error: any) {
    console.error('Vision API error:', error.response?.data || error.message)
    return res.status(500).json({ error: 'Vision analysis failed', details: error.message })
  }
}
