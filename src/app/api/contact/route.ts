import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        // For now, just log the message
        // You can integrate with Resend, SendGrid, or any email service here
        console.log("Contact form submission:", { name, email, message });

        // TODO: Integrate with email service
        // Example with Resend:
        // await resend.emails.send({
        //     from: 'noreply@dexpie.dev',
        //     to: 'contact@dexpie.dev',
        //     subject: `New contact from ${name}`,
        //     text: `From: ${name} (${email})\n\n${message}`,
        // });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }
}
