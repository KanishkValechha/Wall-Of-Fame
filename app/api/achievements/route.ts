import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, Binary, ObjectId } from 'mongodb';

if (!process.env.mongoURL) {
    throw new Error("Missing MONGO_URL in environment variables");
}
const uri = process.env.mongoURL as string;
const client = new MongoClient(uri);

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const filter: any = {};
        const projection: any = {};

        if (searchParams.has('achievementCategory')) {
            filter.achievementCategory = searchParams.get('achievementCategory');
        }
        if (searchParams.has('professorEmail')) {
            filter.professorEmail = searchParams.get('professorEmail');
        }
        if (searchParams.has('approved')) {
            filter.approved = searchParams.get('approved') === 'true';
        }

        if (searchParams.has('_id')) {
            filter._id = new ObjectId(searchParams.get('_id') as string);
        }

        if (searchParams.has('whitelist')) {
            const whitelist = searchParams.get('whitelist')?.split(',') || [];
            whitelist.forEach((field) => {
                projection[field] = 1;
            });
        }

        if (searchParams.has('blacklist')) {
            const blacklist = searchParams.get('blacklist')?.split(',') || [];
            blacklist.forEach((field) => {
                projection[field] = 0;
            });
        }

        await client.connect();
        const db = client.db('Wall-Of-Fame');
        const achievements = await db.collection('achievers').find(filter, { projection }).toArray();
        return NextResponse.json({ achievements }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch achievements' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {  
    try {
        const body = await req.json();
        const { _id, approval, description } = body;

        if (!_id || !approval) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        await client.connect();
        const db = client.db('Wall-Of-Fame');
        const result = await db.collection('achievers').updateOne(
            { _id: new ObjectId(_id) },
            { $set: { approved: new Date(approval), description: description || '' } }
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json({ error: 'No document found with the given _id' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Achievement updated successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update achievement' }, { status: 500 });
    }
}
