import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/firebase-admin';

// GET - Get all registrations
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const competitionId = searchParams.get('competitionId');
    const status = searchParams.get('status');
    
    let query: FirebaseFirestore.Query = db.collection('registrations');
    if (competitionId) query = query.where('competitionId', '==', competitionId);
    if (status) query = query.where('status', '==', status);
    
    const snapshot = await query.orderBy('submittedAt', 'desc').get();
    const registrations = snapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }));
    
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
