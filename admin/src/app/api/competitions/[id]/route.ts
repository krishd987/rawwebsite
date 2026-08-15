/**
 * Competition Detail API Route - Admin Panel
 * Handles individual competition operations
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/firebase-admin';

export const dynamic = 'force-dynamic';

// PATCH - Update competition
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const docRef = db.collection('competitions').doc(id);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: 'Competition not found' },
        { status: 404 }
      );
    }

    const updateData = {
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
      updatedAt: new Date().toISOString(),
    };

    await docRef.update(updateData);
    const updatedDoc = await docRef.get();

    return NextResponse.json({
      success: true,
      data: { _id: id, ...updatedDoc.data() },
    });
  } catch (error) {
    console.error('Error updating competition:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update competition' },
      { status: 500 }
    );
  }
}

// DELETE - Delete competition
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const docRef = db.collection('competitions').doc(id);

    await docRef.delete();

    return NextResponse.json({
      success: true,
      message: 'Competition deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting competition:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete competition' },
      { status: 500 }
    );
  }
}
