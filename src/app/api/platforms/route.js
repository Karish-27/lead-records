import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

async function getCollection() {
  const client = await clientPromise;
  return client.db('lead-records').collection('platforms');
}

export async function GET() {
  try {
    const collection = await getCollection();
    const platforms = await collection.find({}).sort({ createdAt: 1 }).toArray();
    // Map _id to id for frontend compatibility
    const result = platforms.map(({ _id, ...rest }) => ({ id: _id.toString(), ...rest }));
    return NextResponse.json(result);
  } catch (error) {
    console.error('GET /api/platforms error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const collection = await getCollection();
    const doc = {
      name: data.name,
      status: data.status || 'notstarted',
      assignee: data.assignee || 'Krutik',
      date: data.date || new Date().toISOString().slice(0, 10),
      url: data.url || '',
      notes: data.notes || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await collection.insertOne(doc);
    return NextResponse.json({ id: result.insertedId.toString(), ...doc }, { status: 201 });
  } catch (error) {
    console.error('POST /api/platforms error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
