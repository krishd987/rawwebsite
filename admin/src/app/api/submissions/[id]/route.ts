import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/firebase-admin';

// PATCH - Update task submission status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const docRef = db.collection('task_submissions').doc(id);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: 'Submission not found' },
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
    console.error('Error updating task submission status:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update task submission' },
      { status: 500 }
    );
  }
}

// DELETE - Delete task submission
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const docRef = db.collection('task_submissions').doc(id);

    await docRef.delete();

    return NextResponse.json({
      success: true,
      message: 'Submission deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting task submission:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete task submission' },
      { status: 500 }
    );
  }
}
