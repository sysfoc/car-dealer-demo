import {connectToDatabase} from '@/app/api/utils/db';
import Payment from '@/app/model/payment.model';
import { NextResponse } from 'next/server';
export async function GET(){
    await connectToDatabase();
    const transactions = await Payment.find({}).sort({ createdAt: -1 });
    if (!transactions) {
      return NextResponse.json({ message: "No transactions found" }, { status: 404 });
    }
    return NextResponse.json({ transactions }, { status: 200 });
}