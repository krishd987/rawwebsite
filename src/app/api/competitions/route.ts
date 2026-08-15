/**
 * Competitions API Route
 * Handles CRUD operations for competition management
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';

// GET - Fetch all competitions or active ones
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('active') === 'true';

    let query: FirebaseFirestore.Query = db.collection('competitions');
    
    // Sort by createdAt descending
    query = query.orderBy('createdAt', 'desc');
    
    const snapshot = await query.get();
    
    let competitions = snapshot.docs.map(doc => ({
      _id: doc.id,
      ...doc.data() as any
    }));

    if (activeOnly) {
      competitions = competitions.filter(comp => comp.isActive === true);
    }

    return NextResponse.json({
      success: true,
      data: competitions,
    });
  } catch (error) {
    console.error('Error fetching competitions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch competitions' },
      { status: 500 }
    );
  }
}

// POST - Create new competition
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const competition = {
      name: body.name,
      organizer: body.organizer,
      date: body.date,
      description: body.description,
      deadline: body.deadline,
      teamSize: body.teamSize,
      imageUrl: body.imageUrl || null,
      attachmentUrl: body.attachmentUrl || null,
      attachmentName: body.attachmentName || '',
      notes: body.notes || '',
      isActive: body.isActive ?? true,
      registrationEnabled: body.registrationEnabled ?? true,
      registrationStartDate: body.registrationStartDate || null,
      registrationEndDate: body.registrationEndDate || null,
      customFields: body.customFields || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await db.collection('competitions').add(competition);

    return NextResponse.json({
      success: true,
      data: { _id: docRef.id, ...competition },
    });
  } catch (error) {
    console.error('Error creating competition:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create competition' },
      { status: 500 }
    );
  }
}
