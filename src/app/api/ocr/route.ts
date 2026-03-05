import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    const ocrEndpoint = process.env.OCR_API_ENDPOINT || '';
    const ocrApiKey = process.env.OCR_API_KEY || '';

    if (!ocrEndpoint || !ocrApiKey) {
      return NextResponse.json({
        success: false,
        error: 'OCR service not configured',
        mock: true,
        extractedData: {
          name: '',
          company: '',
          email: '',
          phone: '',
          url: '',
        },
      });
    }

    const imageBuffer = await image.arrayBuffer();
    
    const response = await fetch(ocrEndpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ocrApiKey}`,
        'Content-Type': 'application/octet-stream',
      },
      body: Buffer.from(imageBuffer),
    });

    if (!response.ok) {
      throw new Error('OCR request failed');
    }

    const data = await response.json();
    
    const extractedData = {
      name: data.name || '',
      company: data.company || '',
      email: data.email || '',
      phone: data.phone || '',
      url: data.url || '',
    };

    return NextResponse.json({
      success: true,
      extractedData,
    });
  } catch (error) {
    console.error('OCR error:', error);
    return NextResponse.json(
      { error: 'OCR processing failed' },
      { status: 500 }
    );
  }
}
