import {connectToDatabase} from '@/app/api/utils/db';
import Refund from '@/app/model/refund.model';
import { NextResponse } from 'next/server';

export async function GET() {
    await connectToDatabase();
    const refunds = await Refund.find({}).sort({ createdAt: -1 });
    if (!refunds) {
        return NextResponse.json({ message: "No refunds found" }, { status: 404 });
    }
    return NextResponse.json({ refunds }, { status: 200 });
}