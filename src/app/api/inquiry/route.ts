import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, product, quantity, message } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Log the inquiry (in production, this would be stored in a database or sent via email)
    console.log('[Inquiry Received]', {
      name,
      email,
      company: company || 'N/A',
      product: product || 'N/A',
      quantity: quantity || 'N/A',
      message: message || 'N/A',
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully. We will contact you within 24 hours.',
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to process inquiry' },
      { status: 500 }
    );
  }
}
