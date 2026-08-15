import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/firebase-admin';

// GET - Retrieve all task submissions
export async function GET(request: NextRequest) {
  try {
    const snapshot = await db.collection('task_submissions').orderBy('submittedAt', 'desc').get();
    const submissions = snapshot.docs.map((doc) => ({ _id: doc.id, ...doc.data() }));

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
