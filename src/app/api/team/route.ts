import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { teamMembers } from '@/data/teamData';

// Handle CORS preflight
export async function OPTIONS() {
  const response = NextResponse.json({}, { status: 200 });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Max-Age', '86400');
  return response;
}

// GET - Fetch all team members (with auto-seeding)
export async function GET() {
  try {
    const snapshot = await db.collection('team').orderBy('name', 'asc').get();
    
    // Auto-seed database if empty
    if (snapshot.empty) {
      console.log('🌱 Firestore team collection is empty. Auto-seeding from teamData.ts...');
      const batch = db.batch();
      
      for (const member of teamMembers) {
        const docRef = db.collection('team').doc(member._id);
        const { _id, ...memberData } = member;
        batch.set(docRef, {
          ...memberData,
          createdAt: new Date().toISOString()
        });
      }
      
      await batch.commit();
      console.log('✅ Seeding completed! 24 members seeded.');
      
      // Fetch again after seeding
      const seededSnapshot = await db.collection('team').orderBy('name', 'asc').get();
      const seededData = seededSnapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }));
      
      const response = NextResponse.json({ success: true, data: seededData });
      response.headers.set('Access-Control-Allow-Origin', '*');
      return response;
    }

    const data = snapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }));
    const response = NextResponse.json({ success: true, data });
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  } catch (error) {
    console.error('Error fetching team members:', error);
    const response = NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch team members',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  }
}

// POST - Create a new team member
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.role || !body.category || !body.department || !body.imageUrl) {
      return NextResponse.json(
        {
          success: false,
          message: 'Name, Role, Category, Department, and Image URL are required',
        },
        { status: 400 }
      );
    }

    const newMember = {
      name: body.name.trim(),
      role: body.role.trim(),
      category: body.category, // 'core' | 'mentors' | 'members'
      department: body.department,
      domain: body.domain || '',
      email: body.email?.trim() || '',
      phone: body.phone?.trim() || '',
      linkedin: body.linkedin?.trim() || '',
      imageUrl: body.imageUrl.trim(),
      responsibilities: body.responsibilities || [],
      createdAt: new Date().toISOString(),
    };

    // Save to Firestore
    const docRef = await db.collection('team').add(newMember);
    console.log('✅ Team member created in Firestore:', docRef.id);

    const response = NextResponse.json(
      {
        success: true,
        message: 'Team member added successfully',
        data: { _id: docRef.id, ...newMember },
      },
      { status: 201 }
    );

    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    return response;
  } catch (error) {
    console.error('Error creating team member:', error);
    const response = NextResponse.json(
      {
        success: false,
        message: 'Failed to create team member',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  }
}
