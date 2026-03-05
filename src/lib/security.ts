export const securityConfig = {
  csp: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", 'https://js.tosspayments.com'],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", 'data:', 'https:'],
    'connect-src': ["'self'", 'https://api.tosspayments.com', 'https://api.stripe.com'],
    'frame-src': ['https://js.tosspayments.com', 'https://hooks.stripe.com'],
  },
  headers: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  },
};

export const paymentConfig = {
  currency: 'KRW',
  locale: 'ko-KR',
  paymentMethods: {
    stripe: ['card', 'kakao', 'naver'],
    toss: ['card', 'virtualAccount', 'kakaoPay', 'naverPay'],
  },
};
