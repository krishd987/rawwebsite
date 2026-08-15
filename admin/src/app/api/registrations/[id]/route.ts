import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/firebase-admin';

// PATCH - Update registration status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const docRef = db.collection('registrations').doc(id);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: 'Registration not found' },
        { status: 404 }
      );
    }

    const updateData: any = {};
    if (body.status) updateData.status = body.status;
    if (body.notes) updateData.notes = body.notes;
    updateData.updatedAt = new Date().toISOString();

    await docRef.update(updateData);
    const updatedDoc = await docRef.get();

    return NextResponse.json({
      success: true,
      data: { _id: id, ...updatedDoc.data() },
    });
  } catch (error) {
    console.error('Error updating registration:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update registration' },
      { status: 500 }
    );
  }
}

// DELETE - Delete registration
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const docRef = db.collection('registrations').doc(id);

    await docRef.delete();

    return NextResponse.json({
      success: true,
      message: 'Registration deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting registration:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete registration' },
      { status: 500 }
    );
  }
}
