import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

// GET - Retrieve all task submissions
export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('teamraw');

    const submissions = await db
      .collection('task_submissions')
      .find({})
      .sort({ submittedAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: submissions,
    });
  } catch (error) {
    console.error('Error fetching submissions in admin:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch task submissions' },
      { status: 500 }
    );
  }
}
