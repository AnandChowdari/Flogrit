export const PRICING = {
  india: {
    currency: '₹',
    symbol: 'INR',
    tiers: {
      basic: { price: 399, label: 'Basic', paymentLink: '#' },
      pro:   { price: 599, label: 'Pro', paymentLink: '#' },
      extreme: { price: 999, label: 'Extreme', paymentLink: '#' },
    }
  },
  international: {
    currency: '$',
    symbol: 'USD',
    tiers: {
      basic: { price: 9, label: 'Basic', paymentLink: '#' },
      pro:   { price: 15, label: 'Pro', paymentLink: '#' },
      extreme: { price: 25, label: 'Extreme', paymentLink: '#' },
    }
  }
};
