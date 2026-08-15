import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fileData, filename, folder = 'images' } = body;

    if (!fileData || !filename) {
      return NextResponse.json({ success: false, message: 'Missing file data or filename' }, { status: 400 });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error('Cloudinary credentials are not configured in .env');
    }

    const timestamp = Math.round((new Date()).getTime() / 1000);
    
    // Cloudinary expects parameters sorted alphabetically for signature
    const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;
    const signature = crypto.createHash('sha1').update(paramsToSign + apiSecret).digest('hex');

    const formData = new FormData();
    formData.append('file', fileData); // fileData is already a data URI
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp.toString());
    formData.append('signature', signature);
    formData.append('folder', folder);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error?.message || 'Failed to upload to Cloudinary');
    }

    return NextResponse.json({
      success: true,
      url: result.secure_url,
    });
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to upload file', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
