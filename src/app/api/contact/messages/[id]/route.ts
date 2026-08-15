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

// GET - Fetch single contact message by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const docRef = db.collection('contacts').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      const response = NextResponse.json(
        {
          success: false,
          message: 'Contact message not found',
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
    console.error('Error fetching contact:', error);
    const response = NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch contact message',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  }
}

// PATCH - Update contact message (mark as read/replied)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const docRef = db.collection('contacts').doc(id);

    const doc = await docRef.get();
    if (!doc.exists) {
      return NextResponse.json(
        {
          success: false,
          message: 'Contact message not found',
        },
        { status: 404 }
      );
    }

    await docRef.update(body);
    const updatedDoc = await docRef.get();

    console.log('✅ Contact message updated in Firestore:', id);

    const response = NextResponse.json({
      success: true,
      message: 'Contact message updated successfully',
      data: { _id: updatedDoc.id, ...updatedDoc.data() },
    });

    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;
  } catch (error) {
    console.error('Error updating contact:', error);
    const response = NextResponse.json(
      {
        success: false,
        message: 'Failed to update contact message',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  }
}

// DELETE - Delete contact message
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const docRef = db.collection('contacts').doc(id);

    await docRef.delete();

    console.log('✅ Contact message deleted from Firestore:', id);

    const response = NextResponse.json({
      success: true,
      message: 'Contact message deleted successfully',
    });

    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;
  } catch (error) {
    console.error('Error deleting contact:', error);
    const response = NextResponse.json(
      {
        success: false,
        message: 'Failed to delete contact message',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  }
}
