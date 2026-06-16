import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const STUDENT_EMAIL_DOMAIN = '@student.sfit.ac.in';

// POST - Create a new task submission
export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('teamraw');
    
    const body = await request.json();

    // Basic Validation
    if (!body.fullName || typeof body.fullName !== 'string' || body.fullName.trim() === '') {
      return NextResponse.json({ success: false, error: 'Full name is required.' }, { status: 400 });
    }

    if (!body.email || typeof body.email !== 'string' || !body.email.toLowerCase().endsWith(STUDENT_EMAIL_DOMAIN)) {
      return NextResponse.json({ success: false, error: 'Please use your official @student.sfit.ac.in email address.' }, { status: 400 });
    }

    if (!body.pid || typeof body.pid !== 'string' || !/^\d{6}$/.test(body.pid.trim())) {
      return NextResponse.json({ success: false, error: 'PID must be a valid 6-digit number.' }, { status: 400 });
    }

    if (!body.phone || typeof body.phone !== 'string' || body.phone.trim() === '') {
      return NextResponse.json({ success: false, error: 'Phone number is required.' }, { status: 400 });
    }

    if (!body.domain || typeof body.domain !== 'string' || body.domain.trim() === '') {
      return NextResponse.json({ success: false, error: 'Please select a domain/task.' }, { status: 400 });
    }

    if (!body.driveLink || typeof body.driveLink !== 'string' || body.driveLink.trim() === '') {
      return NextResponse.json({ success: false, error: 'Google Drive folder link is required.' }, { status: 400 });
    }

    // Simple URL regex check to ensure it looks like a valid drive/external link
    try {
      new URL(body.driveLink.trim());
    } catch (_) {
      return NextResponse.json({ success: false, error: 'Please enter a valid Google Drive folder URL.' }, { status: 400 });
    }

    const submission = {
      fullName: body.fullName.trim(),
      email: body.email.toLowerCase().trim(),
      pid: body.pid.trim(),
      phone: body.phone.trim(),
      domain: body.domain.trim(),
      driveLink: body.driveLink.trim(),
      status: 'pending', // pending, reviewed
      submittedAt: new Date().toISOString(),
    };

    const result = await db.collection('task_submissions').insertOne(submission);
    
    return NextResponse.json({
      success: true,
      data: { _id: result.insertedId, ...submission },
    });
  } catch (error) {
    console.error('Error saving task submission:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save task submission.' },
      { status: 500 }
    );
  }
}
