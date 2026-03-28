import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

async function getCollection() {
  const client = await clientPromise;
  return client.db('lead-records').collection('platforms');
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();
    const collection = await getCollection();
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: data.name,
          status: data.status,
          assignee: data.assignee,
          date: data.date || new Date().toISOString().slice(0, 10),
          url: data.url ?? '',
          notes: data.notes ?? '',
          updatedAt: new Date(),
        },
      },
      { returnDocument: 'after' }
    );
    const { _id, ...rest } = result;
    return NextResponse.json({ id: _id.toString(), ...rest });
  } catch (error) {
    console.error('PUT /api/platforms error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const collection = await getCollection();
    await collection.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/platforms error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
