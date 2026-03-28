import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const platforms = await prisma.platform.findMany({
    orderBy: { id: 'asc' },
  });
  return NextResponse.json(platforms);
}

export async function POST(request) {
  const data = await request.json();
  const platform = await prisma.platform.create({
    data: {
      name: data.name,
      status: data.status || 'notstarted',
      assignee: data.assignee || 'Krutik',
      date: data.date || new Date().toISOString().slice(0, 10),
      url: data.url || '',
      notes: data.notes || '',
    },
  });
  return NextResponse.json(platform, { status: 201 });
}
