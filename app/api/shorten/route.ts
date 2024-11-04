import prisma from "@/lib/db";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

const isValidUrl = (urlString: string) => {
  try {
    new URL(urlString);
    return true;
  } catch (_) {
    return false;
  }
};

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    // Validar que se haya proporcionado una URL
    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Validar que la URL tenga un formato correcto
    if (!isValidUrl(url)) {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    const shortCode = nanoid(8);
    const shortenedUrl = await prisma.url.create({
      data: {
        originalUrl: url,
        shortCode,
      },
    });

    return NextResponse.json({ shortCode: shortenedUrl.shortCode });
  } catch (error) {
    console.error("Error creating shortened URL:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
