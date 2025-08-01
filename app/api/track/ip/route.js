import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : req.ip || "127.0.0.1";

    const clientIP =
      ip === "::1" || ip?.includes("127.0.0.1") ? "127.0.0.1" : ip;

    const geoRes = await fetch(
      `http://ip-api.com/json/${clientIP}?fields=status,countryCode,query`
    );
    const geoData = await geoRes.json();

    if (geoData.status !== "success") {
      return NextResponse.json(
        { error: "Failed to fetch location" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ip: geoData.query,
      country_code: geoData.countryCode,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch location" },
      { status: 500 }
    );
  }
}
