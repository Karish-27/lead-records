import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request, { params }) {
  const { id } = await params;
  const data = await request.json();
  const platform = await prisma.platform.update({
    where: { id: parseInt(id) },
    data: {
      name: data.name,
      status: data.status,
      assignee: data.assignee,
      date: data.date || new Date().toISOString().slice(0, 10),
      url: data.url ?? '',
      notes: data.notes ?? '',
    },
  });
  return NextResponse.json(platform);
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  await prisma.platform.delete({
    where: { id: parseInt(id) },
  });
  return NextResponse.json({ success: true });
}
