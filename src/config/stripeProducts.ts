export const STRIPE_PRODUCTS = [
  {
    id: 'basic',
    name: 'Basic Credit Removal (Up to 5 Items)',
    price: 500,
    displayPrice: '$500',
    stripePaymentLink: 'https://buy.stripe.com/28E8wPaFK3yM9rq0Iu0Fi00',
    description: 'Remove up to 5 negative items from your credit report',
    features: [
      '4-day guaranteed removal',
      'Up to 5 negative items',
      'Encrypted document storage',
      'Email support',
      'FCRA-compliant disputes',
      'Progress tracking'
    ],
    slaHours: 96,
    popular: false,
    badge: undefined
  },
  {
    id: 'premium',
    name: 'Premium Credit Removal (Unlimited Items)',
    price: 750,
    displayPrice: '$750',
    stripePaymentLink: 'https://buy.stripe.com/aFa6oH4hmglyeLK4YK0Fi01',
    description: 'Remove unlimited negative items',
    features: [
      'Unlimited items removed',
      '4-day guarantee per batch',
      'Encrypted document storage',
      'VIP 24/7 support',
      'FCRA-compliant disputes',
      'Real-time tracking',
      'Dedicated agent',
      'Credit score monitoring'
    ],
    slaHours: 96,
    popular: true,
    badge: undefined
  },
  {
    id: 'chexsystems',
    name: '24-Hour ChexSystems Removal',
    price: 400,
    displayPrice: '$400',
    stripePaymentLink: 'https://buy.stripe.com/00wbJ129e5GUfPO0Iu0Fi02',
    description: 'Complete ChexSystems removal in 24 hours',
    features: [
      '24-hour guaranteed removal',
      'Full ChexSystems report deletion',
      'Bank account access restored',
      'Priority support',
      'Expert case management',
      'Money-back guarantee'
    ],
    slaHours: 24,
    popular: false,
    badge: undefined
  },
  {
    id: 'mentorship',
    name: 'Credit Mentorship Add-On',
    price: 1200,
    displayPrice: '$1,200',
    stripePaymentLink: 'https://buy.stripe.com/9B67sL8xC1qEcDC76S0Fi03',
    description: 'Expert credit mentorship and consultation',
    features: [
      'One-on-one credit mentorship',
      'Personalized credit building plan',
      'Monthly strategy sessions',
      'Credit monitoring included',
      'Financial literacy education',
      'Ongoing support for 6 months'
    ],
    slaHours: 96,
    popular: false,
    badge: undefined
  },
  {
    id: 'christmas',
    name: 'Christmas Credit Special',
    price: 300,
    displayPrice: '$300',
    stripePaymentLink: 'https://buy.stripe.com/7sY9AT6pu1qEeLKbn80Fi04',
    description: '🎄 Holiday Special – Limited Offer',
    features: [
      'Collections removal',
      'Charge-offs',
      'Repos',
      'Late payments'
    ],
    slaHours: 96,
    popular: false,
    badge: '🎄 Holiday Special – Limited Offer'
  }
] as const;

export type StripeProduct = typeof STRIPE_PRODUCTS[number];
