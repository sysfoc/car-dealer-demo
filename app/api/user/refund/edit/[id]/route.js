import {connectToDatabase} from '@/app/api/utils/db';
import Refund from '@/app/model/refund.model';
import { NextResponse } from 'next/server';

export async function POST(req, { params }) {
    await connectToDatabase();
    const { id } = params;
    const status = await req.json();
    const refund = await Refund.findById(id);
    if (!refund) {
        return NextResponse.json({ message: "Refund not found" }, { status: 404 });
    }
    const updatedRefund = await Refund.findByIdAndUpdate(
        id,
        {
            status,
        },
        { new: true }
    )
    return NextResponse.json({ updatedRefund }, { status: 200 });
}