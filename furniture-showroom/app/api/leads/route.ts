import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, interest, message } = body;

    // Here you would typically save to a database or send an email.
    // For now, we log it to the console (server-side).
    console.log('--- NEW LEAD RECEIVED ---');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    console.log(`Interest: ${interest}`);
    console.log(`Message: ${message}`);
    console.log('-------------------------');

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({ success: true, message: 'Lead received successfully' });
  } catch (error) {
    console.error('Error processing lead:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process lead' },
      { status: 500 }
    );
  }
}
