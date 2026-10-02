import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { teamMembers } from '@/data/teamData';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Handle CORS preflight
export async function OPTIONS() {
  const response = NextResponse.json({}, { status: 200 });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Max-Age', '86400');
  return response;
}

// GET - Fetch all team members (using teamData.ts as source of truth and syncing with Firestore)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeHidden = searchParams.get('includeHidden') === 'true';

    // Best-effort sync with Firestore
    try {
      const validDomainMembers: Record<string, string[]> = {
        electronics: ['Parth Sutar', 'Pal Rajak', 'Gauri Mali', 'Pragya Mishra', 'Naaz Husseni', 'Krishna Maurya', 'Kannan Pillai', 'Gaurav Kamble', 'Tanish Gaddam', 'Darshan Barekar'],
        software: ['Riyan Gonsalves', 'Krish Dankhara', 'Emmanuel Fernandes', 'Kavisha Galipelly', 'Aditya Bhole', 'Soham Salekar', 'Gaurav Kamble', 'Krishna Maurya'],
        mechanical: ['Vansh Singh', 'Jhoshua Coutinho', 'Aryan Raul', 'Divyesh Singh', 'Isaiah D\'Souza', 'Soham Salekar'],
        rnd: ['Jhoshua Coutinho', 'Isaiah D\'Souza', 'Kavisha Galipelly', 'Emmanuel Fernandes', 'Krish Dankhara', 'Darshan Barekar', 'Tanish Gaddam', 'Soham Salekar', 'Aditya Bhole'],
        event: ['Parth Sutar', 'Pal Rajak', 'Pragya Mishra', 'Krishna Maurya', 'Kannan Pillai', 'Krish Dankhara'],
        publicity: ['Parth Sutar', 'Pal Rajak', 'Pragya Mishra'],
        documentation: ['Pal Rajak', 'Christina', 'Kavisha Galipelly', 'Pragya Mishra']
      };

      const getMemberDomains = (name: string): string[] => {
        const memberDomains: string[] = [];
        Object.entries(validDomainMembers).forEach(([domainId, members]) => {
          if (members.includes(name)) {
            memberDomains.push(domainId);
          }
        });
        return memberDomains;
      };

      const snapshot = await db.collection('team').get();
      const validIds = new Set(teamMembers.map(m => m._id));
      const batch = db.batch();
      let deleteCount = 0;

      snapshot.docs.forEach(doc => {
        if (!validIds.has(doc.id)) {
          batch.delete(doc.ref);
          deleteCount++;
        }
      });

      for (const member of teamMembers) {
        const docRef = db.collection('team').doc(member._id);
        const { _id, ...memberData } = member;
        batch.set(docRef, {
          ...memberData,
          domains: memberData.domains || getMemberDomains(member.name),
          createdAt: memberData.createdAt || new Date().toISOString()
        }, { merge: true });
      }

      await batch.commit();
    } catch (syncErr) {
      console.warn('Firestore team sync notice:', syncErr);
    }

    let data = teamMembers;
    if (!includeHidden) {
      data = data.filter((member: any) => !member.hidden);
    }
    const response = NextResponse.json({ success: true, data });
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  } catch (error) {
    console.error('Error fetching team members:', error);
    // Fallback to teamMembers directly on error
    const { searchParams } = new URL(request.url);
    let data = teamMembers;
    if (searchParams.get('includeHidden') !== 'true') {
      data = data.filter((member: any) => !member.hidden);
    }
    const response = NextResponse.json({ success: true, data });
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  }
}

// POST - Create a new team member
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.role || !body.category) {
      const response = NextResponse.json(
        { success: false, message: 'Name, role, and category are required' },
        { status: 400 }
      );
      response.headers.set('Access-Control-Allow-Origin', '*');
      return response;
    }

    const newDocRef = db.collection('team').doc();
    const newMember = {
      ...body,
      createdAt: new Date().toISOString(),
    };

    await newDocRef.set(newMember);

    const response = NextResponse.json(
      { success: true, message: 'Team member created successfully', data: { _id: newDocRef.id, ...newMember } },
      { status: 201 }
    );
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  } catch (error) {
    console.error('Error creating team member:', error);
    const response = NextResponse.json(
      { success: false, message: 'Failed to create team member', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  }
}
