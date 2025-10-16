import type { NextApiRequest, NextApiResponse } from 'next'

const MOCK_MODE = (process.env.NEXT_PUBLIC_IYZICO_MOCK || 'true') === 'true'

let iyzipay: any = null
if (!MOCK_MODE) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
    const Iyzipay = require('iyzipay')
    iyzipay = new Iyzipay({
      apiKey: process.env.IYZICO_API_KEY || '',
      secretKey: process.env.IYZICO_SECRET_KEY || '',
      uri: process.env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com',
    })
  } catch (err) {
    console.warn('iyzipay module not available for callback handler', err)
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { token } = req.body || {}

  if (!token && MOCK_MODE) {
    // In mock mode allow token to be optional for convenience
    const { status } = req.body || {}
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    if (status === 'success') {
      console.log('💰 MOCK: Ödeme başarılı!')
      return res.redirect(`${base}/success?payment=success&mock=true`)
    }

    console.log('❌ MOCK: Ödeme başarısız veya eksik parametre')
    return res.redirect(`${base}/landing?payment=failed&mock=true`)
  }

  // REAL İYZICO MODE
  const request = {
    locale: 'tr',
    conversationId: req.body?.conversationId || 'callback',
    token,
  }

  try {
    if (!iyzipay) {
      console.warn('iyzipay is not initialized. Check IYZICO env vars and installation.')
      return res.status(500).json({ error: 'iyzipay not initialized' })
    }

    iyzipay.checkoutForm.retrieve(request, (err: any, result: any) => {
      if (err) {
        console.error('İyzico callback error:', err)
        const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
        return res.redirect(`${base}/landing?payment=failed`)
      }

      if (result?.status === 'success' && result?.paymentStatus === 'SUCCESS') {
        console.log('💰 Ödeme başarılı!', result.buyerEmail)
        const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
        // TODO: Veritabanına kaydet
        return res.redirect(`${base}/success?payment=success`)
      }

      console.log('❌ Ödeme başarısız:', result?.errorMessage)
      const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      return res.redirect(`${base}/landing?payment=failed`)
    })
  } catch (error: any) {
    console.error('İyzico callback error:', error)
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    return res.redirect(`${base}/landing?payment=error`)
  }
}
