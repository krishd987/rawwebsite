import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

const STUDENT_EMAIL_DOMAIN = '@student.sfit.ac.in';

// POST - Create new registration
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.email || typeof body.email !== 'string' || !body.email.toLowerCase().endsWith(STUDENT_EMAIL_DOMAIN)) {
      return NextResponse.json(
        { success: false, error: 'Please use your @student.sfit.ac.in email address to submit.' },
        { status: 400 }
      );
    }
    
    const registration = {
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      attachmentUrl: body.attachmentUrl || null,
      attachmentName: body.attachmentName || '',
      competition: body.competition,
      competitionId: body.competitionId,
      whyJoin: body.whyJoin || '',
      expectations: body.expectations || '',
      customFields: body.customFields || {},
      status: 'pending', // pending, approved, rejected
      submittedAt: new Date().toISOString(),
    };

    const docRef = await db.collection('registrations').add(registration);
    
    return NextResponse.json({
      success: true,
      data: { _id: docRef.id, ...registration },
    });
  } catch (error) {
    console.error('Error creating registration:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create registration' },
      { status: 500 }
    );
  }
}

// GET - Get all registrations (for admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const competitionId = searchParams.get('competitionId');
    const status = searchParams.get('status');
    
    const snapshot = await db.collection('registrations').orderBy('submittedAt', 'desc').get();
    let registrations = snapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() as any }));
    
    if (competitionId) {
      registrations = registrations.filter(reg => reg.competitionId === competitionId);
    }
    if (status) {
      registrations = registrations.filter(reg => reg.status === status);
    }
    
    return NextResponse.json({
      success: true,
      data: registrations,
    });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch registrations' },
      { status: 500 }
    );
  }
}
