import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';

// PATCH - Update task submission status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db('teamraw');
    
    const body = await request.json();
    
    const updateData: any = {};
    if (body.status) updateData.status = body.status;
    if (body.notes) updateData.notes = body.notes;
    updateData.updatedAt = new Date().toISOString();

    const result = await db
      .collection('task_submissions')
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Submission not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { _id: id, ...updateData },
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
    const client = await clientPromise;
    const db = client.db('teamraw');

    const result = await db
      .collection('task_submissions')
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Submission not found' },
        { status: 404 }
      );
    }

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
