// Stripe replaced with İyzico
// import Stripe from 'stripe'

// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'dummy_key', {
//   apiVersion: '2023-10-16',
//   typescript: true,
// })

// Now using İyzico - Plans defined in checkout.ts
export const IYZICO_PLANS = {
  free: {
    name: 'Free',
    price: 0,
    priceId: null,
    features: [
      '3 generations/month',
      'HTML export only',
      'Basic support',
      'Watermark included',
    ],
    limits: {
      generations: 3,
      frameworks: ['html'],
    },
  },
  pro: {
    name: 'Pro',
    price: 19,
    priceId: process.env.STRIPE_PRO_PRICE_ID || 'price_1QKxxxxxxx',
    features: [
      'Unlimited generations',
      'All frameworks (HTML, React, Vue)',
      'Priority support',
      'No watermark',
      'Export to ZIP',
      'Custom design systems',
    ],
    limits: {
      generations: -1, // unlimited
      frameworks: ['html', 'react', 'vue', 'svelte'],
    },
  },
  enterprise: {
    name: 'Enterprise',
    price: 99,
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID || 'price_1QLxxxxxxx',
    features: [
      'Everything in Pro',
      'Team collaboration',
      'API access',
      'Custom training',
      'Dedicated support',
      'SLA guarantee',
    ],
    limits: {
      generations: -1,
      frameworks: ['html', 'react', 'vue', 'svelte', 'angular'],
      apiAccess: true,
    },
  },
}

export type PlanType = keyof typeof IYZICO_PLANS
