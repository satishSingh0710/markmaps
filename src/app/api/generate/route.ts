import { NextRequest, NextResponse } from 'next/server';
import { generateMarkdown } from '@/lib/api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic } = body;

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    const markdown = await generateMarkdown({ topic });

    return NextResponse.json({ markdown });
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Failed to generate markdown' },
      { status: 500 }
    );
  }
} 