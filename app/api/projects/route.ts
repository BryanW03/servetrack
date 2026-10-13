import { NextRequest, NextResponse } from 'next/server';
import { getProjects } from '@/lib/data';

// GET /api/projects?query=park  ->  JSON array of projects (public)
export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('query') ?? undefined;

  try {
    const projects = await getProjects(query);
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Failed to load projects:', error);
    return NextResponse.json(
      { error: 'Could not load projects.' },
      { status: 500 }
    );
  }
}
