import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

const STUDENT_EMAIL_DOMAIN = '@student.sfit.ac.in';

// POST - Create a new task submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Basic Validation
    if (!body.fullName || typeof body.fullName !== 'string' || body.fullName.trim() === '') {
      return NextResponse.json({ success: false, error: 'Full name is required.' }, { status: 400 });
    }

    if (!body.pid || typeof body.pid !== 'string' || !/^\d{6}$/.test(body.pid.trim())) {
      return NextResponse.json({ success: false, error: 'PID must be a valid 6-digit number.' }, { status: 400 });
    }

    if (!body.driveLink || typeof body.driveLink !== 'string' || body.driveLink.trim() === '') {
      return NextResponse.json({ success: false, error: 'Submission link is required.' }, { status: 400 });
    }

    // Simple URL regex check to ensure it looks like a valid drive/external link
    try {
      new URL(body.driveLink.trim());
    } catch (_) {
      return NextResponse.json({ success: false, error: 'Please submit a valid file URL.' }, { status: 400 });
    }

    if (!body.teamName || typeof body.teamName !== 'string' || body.teamName.trim() === '') {
      return NextResponse.json({ success: false, error: 'Team name is required.' }, { status: 400 });
    }

    if (!body.problemStatement || typeof body.problemStatement !== 'string' || body.problemStatement.trim() === '') {
      return NextResponse.json({ success: false, error: 'Problem statement is required.' }, { status: 400 });
    }

    const submission = {
      fullName: body.fullName.trim(),
      pid: body.pid.trim(),
      driveLink: body.driveLink.trim(),
      teamName: body.teamName.trim(),
      problemStatement: body.problemStatement.trim(),
      status: 'pending', // pending, reviewed
      submittedAt: new Date().toISOString(),
    };

    // Save to Firestore
    const docRef = await db.collection('task_submissions').add(submission);
    
    return NextResponse.json({
      success: true,
      data: { _id: docRef.id, ...submission },
    });
  } catch (error) {
    console.error('Error saving task submission:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save task submission.' },
      { status: 500 }
    );
  }
}
