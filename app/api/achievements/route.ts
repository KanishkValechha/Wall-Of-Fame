import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, Binary } from 'mongodb';

if (!process.env.mongoURL) {
    throw new Error("Missing MONGO_URL in environment variables");
  }
  const uri = process.env.mongoURL as string;
  const client = new MongoClient(uri);


export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const filter: any = {};
        
        if (searchParams.has('achievementCategory')) {
            filter.achievementCategory = searchParams.get('achievementCategory');
        }
        if (searchParams.has('professorEmail')) {
            filter.professorEmail = searchParams.get('professorEmail');
        }
        if (searchParams.has('approved')) {
            filter.approved = searchParams.get('approved') === 'true';
        }

        await client.connect();
        const db = client.db('Wall-Of-Fame');
        const achievements = await db.collection('achievements').find(filter).toArray();

        return NextResponse.json({ achievements }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch achievements' }, { status: 500 });
    }
}
