import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const urls = await prisma.url.findMany({
      orderBy: { CreatedAt: "desc" },
      take: 5,
    });
    return NextResponse.json(urls);
  } catch (error) {
    console.error("Error fetching Urls", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
