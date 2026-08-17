const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Load environment variables from admin/.env.local
const envPath = path.resolve(__dirname, '.env.local');
console.log('Loading env from:', envPath);
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)$/);
    if (match) {
      const key = match[1].trim();
      let val = match[2].trim();
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.slice(1, -1);
      }
      process.env[key] = val;
    }
  });
}

const rawKey = process.env.FIREBASE_PRIVATE_KEY ?? '';
const privateKey = rawKey
  .replace(/\\n/g, '\n')
  .replace(/\\r/g, '')
  .replace(/\r\n/g, '\n')
  .trim();

initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey,
  }),
});

const db = getFirestore();

async function run() {
  console.log('Fetching competitions...');
  const compSnapshot = await db.collection('competitions').get();
  console.log(`Found ${compSnapshot.docs.length} competitions.`);
  compSnapshot.docs.forEach(doc => {
    const data = doc.data();
    console.log(`Competition ID: ${doc.id}, Name: ${data.name}`);
    if (data.customFields) {
      console.log(`Custom Fields for ${data.name}:`);
      data.customFields.forEach(f => {
        console.log(`  - ID: ${f.id}, Label: ${f.label}, Type: ${f.type}`);
      });
    } else {
      console.log('  No custom fields.');
    }
  });

  console.log('\nFetching registrations...');
  const regSnapshot = await db.collection('registrations').limit(10).get();
  console.log(`Found ${regSnapshot.docs.length} registrations.`);
  regSnapshot.docs.forEach(doc => {
    const data = doc.data();
    console.log(`Registration ID: ${doc.id}, Comp ID: ${data.competitionId}, Comp Name: ${data.competition}`);
    console.log(`Custom Fields keys:`, data.customFields ? Object.keys(data.customFields) : 'none');
  });
}

run().catch(console.error);
