import { NextRequest, NextResponse } from 'next/server';

const TOSS_SECRET_KEY = process.env.TOSS_SECRET_KEY || '';
const TOSS_CLIENT_KEY = process.env.TOSS_CLIENT_KEY || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { method, amount, orderId, customerEmail } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    const response = await fetch('https://api.tosspayments.com/v1/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(TOSS_SECRET_KEY + ':').toString('base64')}`,
      },
      body: JSON.stringify({
        amount,
        method,
        orderId: orderId || `order_${Date.now()}`,
        orderName: 'Oais Service',
        customerEmail,
        successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
        failUrl: `${process.env.NEXT_PUBLIC_APP_URL}/fail`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json({
      clientKey: TOSS_CLIENT_KEY,
      paymentKey: data.paymentKey,
      amount: data.amount,
    });
  } catch (error) {
    console.error('Toss error:', error);
    return NextResponse.json(
      { error: 'Payment creation failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    clientKey: TOSS_CLIENT_KEY,
    methods: ['card', 'virtualAccount', 'kakaoPay', 'naverPay'],
  });
}
