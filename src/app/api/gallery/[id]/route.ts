/**
 * Author: Taksh Gandhi
 * Email: takshgandhi4@gmail.com
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

// Handle CORS preflight
export async function OPTIONS() {
  const response = NextResponse.json({}, { status: 200 });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Max-Age', '86400');
  return response;
}

// GET - Fetch single gallery image by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const docRef = db.collection('gallery').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      const response = NextResponse.json(
        {
          success: false,
          message: 'Gallery image not found',
        },
        { status: 404 }
      );
      response.headers.set('Access-Control-Allow-Origin', '*');
      return response;
    }

    const response = NextResponse.json({
      success: true,
      data: { _id: doc.id, ...doc.data() },
    });

    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;
  } catch (error) {
    console.error('Error fetching gallery image:', error);
    const response = NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch gallery image',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  }
}

// PATCH - Update existing gallery image
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const docRef = db.collection('gallery').doc(id);

    const doc = await docRef.get();
    if (!doc.exists) {
      return NextResponse.json(
        {
          success: false,
          message: 'Gallery image not found',
        },
        { status: 404 }
      );
    }

    // Prepare update data with all supported fields
    const updateData: any = {};
    if (body.title !== undefined) updateData.title = body.title;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.detailedDescription !== undefined) updateData.detailedDescription = body.detailedDescription;
    if (body.imageUrl !== undefined) updateData.imageUrl = body.imageUrl;
    if (body.images !== undefined) updateData.images = body.images;
    if (body.category !== undefined) updateData.category = body.category;
    if (body.uploadedBy !== undefined) updateData.uploadedBy = body.uploadedBy;
    if (body.year !== undefined) updateData.year = body.year;
    if (body.location !== undefined) updateData.location = body.location;
    if (body.date !== undefined) updateData.date = body.date;
    if (body.participants !== undefined) updateData.participants = body.participants;
    if (body.highlights !== undefined) updateData.highlights = body.highlights;

    await docRef.update(updateData);
    const updatedDoc = await docRef.get();

    console.log('✅ Gallery image updated in Firestore:', id);

    const response = NextResponse.json({
      success: true,
      message: 'Gallery image updated successfully',
      data: { _id: updatedDoc.id, ...updatedDoc.data() },
    });

    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;
  } catch (error) {
    console.error('Error updating gallery image:', error);
    const response = NextResponse.json(
      {
        success: false,
        message: 'Failed to update gallery image',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  }
}

// DELETE - Delete gallery image
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const docRef = db.collection('gallery').doc(id);

    await docRef.delete();

    console.log('✅ Gallery image deleted from Firestore:', id);

    const response = NextResponse.json({
      success: true,
      message: 'Gallery image deleted successfully',
    });

    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    const response = NextResponse.json(
      {
        success: false,
        message: 'Failed to delete gallery image',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  }
}
