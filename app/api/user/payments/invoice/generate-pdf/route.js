import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
const CHROME_EXECUTABLE_PATH =
  "C:Program FilesGoogleChromeApplicationchrome.exe";
export async function POST(request) {
  try {
    const { html } = await request.json();

    if (!html) {
      return NextResponse.json({ message: "Missing html" }, { status: 400 });
    }

    const fullHtml = `
      <html>
        <head>
          <link
            href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
            rel="stylesheet"
          />
        </head>
        <body class="bg-white">
          <div>${html}</div>
        </body>
      </html>
    `;

    // puppeteer-core -> must point to a chrome executable
    const browser = await puppeteer.launch({
      headless: "new",
      executablePath: CHROME_EXECUTABLE_PATH,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setContent(fullHtml, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="invoice.pdf"',
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
