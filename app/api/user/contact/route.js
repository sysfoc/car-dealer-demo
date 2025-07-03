import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/api/utils/db";
import Contact from "@/app/model/contact.model";
import { sendEmail } from "@/app/api/utils/send-email";
import { config } from "@/app/api/utils/env-config";
export async function POST(req) {
  await connectToDatabase();
  const { name, email, message } = await req.json();
  if (!name || !email || !message) {
    return NextResponse.json(
      { message: "Please fill complete form" },
      { status: 400 }
    );
  }
  try {
    const contact = await Contact.create({ name, email, message });
    await sendEmail({
      to: config.emailReceiver,
      subject: "Contact Form Submission - Automotiv Web Solutions",
      text: `A User has submitted a contact form:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    })
    if (!contact) {
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
