import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { figmaUrl } = req.body

  if (!figmaUrl) {
    return res.status(400).json({ error: 'Figma URL is required' })
  }

  try {
    // Parse Figma URL to extract file key and node ID
    // Format: https://www.figma.com/file/{fileKey}/{fileName}?node-id={nodeId}
    // or: https://www.figma.com/design/{fileKey}/{fileName}?node-id={nodeId}
    
    const urlMatch = figmaUrl.match(/figma\.com\/(file|design)\/([a-zA-Z0-9]+)/)
    const nodeMatch = figmaUrl.match(/node-id=([^&]+)/)
    
    if (!urlMatch) {
      return res.status(400).json({ error: 'Invalid Figma URL format' })
    }

    const fileKey = urlMatch[2]
    const nodeId = nodeMatch ? decodeURIComponent(nodeMatch[1]) : null

    const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN

    if (!FIGMA_ACCESS_TOKEN) {
      console.warn('⚠️ FIGMA_ACCESS_TOKEN not found in environment variables')
      console.log('📋 Using mock Figma data for development...')
      
      // Mock response for development
      return res.status(200).json({
        success: true,
        imageUrl: 'https://via.placeholder.com/1200x800/1a1a1a/8b5cf6?text=Figma+Design+Preview',
        fileName: 'Mock Figma Design',
        nodes: [
          {
            id: 'mock-node-1',
            name: 'Hero Section',
            type: 'FRAME',
            description: 'Main hero section with title and CTA'
          }
        ]
      })
    }

    // Fetch Figma file metadata
    const fileUrl = `https://api.figma.com/v1/files/${fileKey}`
    const fileResponse = await axios.get(fileUrl, {
      headers: {
        'X-Figma-Token': FIGMA_ACCESS_TOKEN
      }
    })

    const fileName = fileResponse.data.name

    // Get image exports
    let imageUrl = null
    if (nodeId) {
      // Export specific node as image
      const imageResponse = await axios.get(
        `https://api.figma.com/v1/images/${fileKey}?ids=${nodeId}&format=png&scale=2`,
        {
          headers: {
            'X-Figma-Token': FIGMA_ACCESS_TOKEN
          }
        }
      )
      
      if (imageResponse.data.images) {
        imageUrl = Object.values(imageResponse.data.images)[0] as string
      }
    } else {
      // Get thumbnail of the whole file
      const thumbnailResponse = await axios.get(
        `https://api.figma.com/v1/images/${fileKey}?format=png&scale=1`,
        {
          headers: {
            'X-Figma-Token': FIGMA_ACCESS_TOKEN
          }
        }
      )
      
      if (thumbnailResponse.data.images) {
        imageUrl = Object.values(thumbnailResponse.data.images)[0] as string
      }
    }

    // Extract node information
    const nodes = nodeId 
      ? [{ id: nodeId, name: 'Selected Node', type: 'FRAME' }]
      : []

    return res.status(200).json({
      success: true,
      imageUrl: imageUrl || 'https://via.placeholder.com/1200x800/1a1a1a/8b5cf6?text=Figma+Export',
      fileName,
      fileKey,
      nodes
    })

  } catch (error: any) {
    console.error('❌ Figma API error:', error.response?.data || error.message)
    
    // Return mock data on error for development
    return res.status(200).json({
      success: true,
      imageUrl: 'https://via.placeholder.com/1200x800/1a1a1a/8b5cf6?text=Figma+Design+(Mock)',
      fileName: 'Figma Design',
      nodes: [],
      mock: true
    })
  }
}
