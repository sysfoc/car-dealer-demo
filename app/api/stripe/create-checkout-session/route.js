import Stripe from 'stripe';
import {connectToDatabase} from "@/app/api/utils/db";
import { NextResponse } from 'next/server';
import User from "@/app/model/user.model";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export async function POST(req) {
    await connectToDatabase();
    const { userId, plan, price } = await req.json();
    try {
        const userExist = await User.findById(userId);
        if(userExist){
            const customer = await stripe.customers.create({
                email: userExist.email,
                address:{
                    city:'Sahiwal',
                    country:'Pakistan',
                    line1:'Sahiwal',
                    postal_code:'44000',
                    state:'Punjab'
                },
                name:userExist.name
            })
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                customer: customer.id,
                line_items: [
                    {
                        price: price,
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${process.env.BASE_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.BASE_URL}/failed-payment`,
                line_items: [
                    {
                        quantity: 1,
                        price_data: {
                            currency: 'usd',
                            unit_amount: price * 100,
                            product_data: {
                                name: plan,
                            },
                        },
                    },
                ],
                metadata: {
                    userId,
                    plan,
                    price
                }
            });
            return NextResponse.json({ url: session.url }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}