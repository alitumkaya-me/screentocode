import type { NextApiRequest, NextApiResponse } from 'next'

// MOCK_MODE kontrolünü env üzerinden yapıyoruz — prod'da unset bırakın veya false yapın
const MOCK_MODE = (process.env.NEXT_PUBLIC_IYZICO_MOCK || 'true') === 'true'

// Dinamik require: geliştirme sırasında veya sunucuda iyzipay modülü yoksa import hatası engellenir
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
    console.warn('iyzipay module not available or failed to initialize. Falling back to mock mode.', err)
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { plan, userEmail, userName } = req.body

  if (!plan) {
    return res.status(400).json({ error: 'plan is required' })
  }

  // Plan fiyatları
  const prices: Record<string, { price: string; name: string }> = {
    pro: { price: '699.00', name: 'ScreenToCode Pro - Aylık' }, // 699 TL
    enterprise: { price: '3499.00', name: 'ScreenToCode Enterprise - Aylık' }, // 3499 TL
  }

  const selectedPlan = prices[plan]
  if (!selectedPlan) {
    return res.status(400).json({ error: 'Invalid plan' })
  }

  // Benzersiz conversation ID ve basket ID
  const conversationId = `conv_${Date.now()}_${Math.random().toString(36).substring(7)}`
  const basketId = `basket_${Date.now()}`

  // const request = {
  //   locale: Iyzipay.LOCALE.TR,
  //   conversationId,
  //   price: selectedPlan.price,
  //   paidPrice: selectedPlan.price,
  //   currency: Iyzipay.CURRENCY.TRY,
  //   basketId,
  //   paymentGroup: Iyzipay.PAYMENT_GROUP.SUBSCRIPTION,
  //   callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/iyzico/callback`,
  //   enabledInstallments: [1], // Taksit yok, sadece tek çekim
  //   buyer: {
  //     id: `BY${Date.now()}`,
  //     name: userName?.split(' ')[0] || 'Kullanıcı',
  //     surname: userName?.split(' ')[1] || 'Adı',
  //     gsmNumber: '+905551234567', // Gerçek numarası gerekirse form ekle
  //     email: userEmail || 'user@example.com',
  //     identityNumber: '11111111111', // Test için, gerçekte kullanıcıdan alınmalı
  //     registrationAddress: 'Türkiye',
  //     ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || '85.34.78.112',
  //     city: 'Istanbul',
  //     country: 'Turkey',
  //   },
  //   shippingAddress: {
  //     contactName: userName || 'Kullanıcı',
  //     city: 'Istanbul',
  //     country: 'Turkey',
  //     address: 'Dijital Ürün - Adres Gereksiz',
  //   },
  //   billingAddress: {
  //     contactName: userName || 'Kullanıcı',
  //     city: 'Istanbul',
  //     country: 'Turkey',
  //     address: 'Dijital Ürün - Adres Gereksiz',
  //   },
  //   basketItems: [
  //     {
  //       id: 'BI' + Date.now(),
  //       name: selectedPlan.name,
  //       category1: 'SaaS',
  //       itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
  //       price: selectedPlan.price,
  //     },
  //   ],
  // }

  // MOCK MODE - İyzico hesabı olmadan test
  if (MOCK_MODE || !iyzipay) {
    const mockToken = `mock_${Date.now()}_${Math.random().toString(36).substring(7)}`
    
    console.log('🧪 MOCK PAYMENT - Ödeme simülasyonu başlatıldı')
    console.log('📦 Plan:', plan)
    console.log('💵 Fiyat:', selectedPlan.price, 'TL')
    console.log('📧 Email:', userEmail)
    
    // Mock ödeme sayfası URL'i - direkt callback'e yönlendir
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const mockPaymentUrl = `${base}/api/iyzico/mock-payment?token=${mockToken}&plan=${plan}`
    
    return res.status(200).json({
      success: true,
      paymentPageUrl: mockPaymentUrl,
      token: mockToken,
      conversationId: conversationId,
    })
  }

  // REAL İYZICO MODE (henüz aktif değil)
  try {
    // Gerçek İyzico çağrısı: request objesini burada oluşturup iyzipay'a gönderin.
    // Aşağıdaki şablon örnektir; prod kullanmadan önce iyzipay dokümantasyonundaki tüm alanları doğrulayın.
    const request = {
      locale: 'tr',
      conversationId,
      price: selectedPlan.price,
      paidPrice: selectedPlan.price,
      currency: 'TRY',
      basketId,
      paymentGroup: 'SUBSCRIPTION',
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/iyzico/callback`,
      enabledInstallments: [1],
      // İyzico ödeme sayfası özelleştirme parametreleri
      forceThreeDS: 0, // 3D Secure'ü zorunlu kılma (0: opsiyonel, 1: zorunlu)
      paymentChannel: 'WEB',
      buyer: {
        id: `BY${Date.now()}`,
        name: userName?.split(' ')[0] || 'Kullanıcı',
        surname: userName?.split(' ')[1] || 'Adı',
        gsmNumber: '+905551234567',
        email: userEmail || 'user@example.com',
        identityNumber: '11111111111',
        registrationAddress: 'Türkiye',
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || '0.0.0.0',
        city: 'Istanbul',
        country: 'Turkey',
      },
      shippingAddress: {
        contactName: userName || 'Kullanıcı',
        city: 'Istanbul',
        country: 'Turkey',
        address: 'Dijital Ürün - Adres Gereksiz',
      },
      billingAddress: {
        contactName: userName || 'Kullanıcı',
        city: 'Istanbul',
        country: 'Turkey',
        address: 'Dijital Ürün - Adres Gereksiz',
      },
      basketItems: [
        {
          id: 'BI' + Date.now(),
          name: selectedPlan.name,
          category1: 'SaaS',
          itemType: 'VIRTUAL',
          price: selectedPlan.price,
        },
      ],
    }

    if (!iyzipay) {
      console.warn('iyzipay not initialized — ensure IYZICO env vars are set and module installed')
      return res.status(500).json({ error: 'iyzipay not initialized' })
    }

    // iyzipay SDK callback-based API kullanıyorsa promisify edebilir veya callback ile kullanabilirsiniz.
    // Aşağıdaki örnek callback şeklindedir.
    iyzipay.checkoutFormInitialize.create(request, (err: any, result: any) => {
      if (err) {
        console.error('İyzico checkout error:', err)
        return res.status(500).json({ error: err?.errorMessage || 'Payment initialization failed' })
      }

      if (result && result.status === 'success') {
        return res.status(200).json({
          success: true,
          paymentPageUrl: result.paymentPageUrl,
          token: result.token,
          conversationId: result.conversationId,
        })
      }

      return res.status(400).json({ error: result?.errorMessage || 'Payment initialization failed' })
    })
  } catch (error: any) {
    console.error('İyzico error:', error)
    return res.status(500).json({ error: error?.message || 'Unknown error' })
  }
}
