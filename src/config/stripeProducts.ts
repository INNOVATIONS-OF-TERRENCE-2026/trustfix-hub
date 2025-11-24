export const STRIPE_PRODUCTS = [
  {
    id: 'basic',
    name: 'Basic Credit Removal (Up to 5 Items)',
    price: 500,
    displayPrice: '$500',
    stripeProductId: 'prod_TShIlDnMvP5PDA',
    stripePriceId: 'price_1SVlu5DdYjAsmtGqhsQM4snp',
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
    popular: false
  },
  {
    id: 'premium',
    name: 'Premium Credit Removal (Unlimited Items)',
    price: 750,
    displayPrice: '$750',
    stripeProductId: 'prod_TTjrK08A2jyPCK',
    stripePriceId: 'price_1SWmNQDdYjAsmtGqnBx3GgZs',
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
    popular: true
  },
  {
    id: 'chexsystems',
    name: '24-Hour ChexSystems Removal',
    price: 400,
    displayPrice: '$400',
    stripeProductId: 'prod_TTjtA4Yuwg9nTV',
    stripePriceId: 'price_1SWmPvDdYjAsmtGqe4wUgKQE',
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
    popular: false
  },
  {
    id: 'mentorship',
    name: 'Credit Mentorship Add-On',
    price: 1200,
    displayPrice: '$1,200',
    stripeProductId: 'prod_TTk9EbANUHa5jE',
    stripePriceId: 'price_1SWmeqDdYjAsmtGqDKZPTdDf',
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
    popular: false
  }
] as const;

export type StripeProduct = typeof STRIPE_PRODUCTS[number];
