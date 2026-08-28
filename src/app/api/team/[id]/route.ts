import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

// Handle CORS preflight
export async function OPTIONS() {
  const response = NextResponse.json({}, { status: 200 });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

// PATCH - Update team member
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const docRef = db.collection('team').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json(
        { success: false, message: 'Team member not found' },
        { status: 404 }
      );
    }

    const updatedData: any = {};
    if (body.name !== undefined) updatedData.name = body.name.trim();
    if (body.role !== undefined) updatedData.role = body.role.trim();
    if (body.category !== undefined) updatedData.category = body.category;
    if (body.department !== undefined) updatedData.department = body.department;
    if (body.domain !== undefined) updatedData.domain = body.domain;
    if (body.domains !== undefined) updatedData.domains = body.domains;
    if (body.email !== undefined) updatedData.email = body.email.trim();
    if (body.phone !== undefined) updatedData.phone = body.phone.trim();
    if (body.linkedin !== undefined) updatedData.linkedin = body.linkedin.trim();
    if (body.imageUrl !== undefined) updatedData.imageUrl = body.imageUrl.trim();
    if (body.responsibilities !== undefined) updatedData.responsibilities = body.responsibilities;
    
    updatedData.updatedAt = new Date().toISOString();

    await docRef.update(updatedData);
    console.log('✅ Team member updated in Firestore:', id);

    const response = NextResponse.json({
      success: true,
      message: 'Team member updated successfully',
      data: { _id: id, ...doc.data(), ...updatedData },
    });

    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    return response;
  } catch (error) {
    console.error('Error updating team member:', error);
    const response = NextResponse.json(
      {
        success: false,
        message: 'Failed to update team member',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  }
}

// DELETE - Remove team member
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const docRef = db.collection('team').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json(
        { success: false, message: 'Team member not found' },
        { status: 404 }
      );
    }

    await docRef.delete();
    console.log('✅ Team member deleted from Firestore:', id);

    const response = NextResponse.json({
      success: true,
      message: 'Team member removed successfully',
    });

    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    return response;
  } catch (error) {
    console.error('Error deleting team member:', error);
    const response = NextResponse.json(
      {
        success: false,
        message: 'Failed to delete team member',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  }
}
