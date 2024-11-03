import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Fetching URLs...");
    const urls = await prisma.url.findMany({
      orderBy: { CreatedAt: "desc" },
      take: 5,
    });
    console.log("URLs fetched successfully:", urls);

    return NextResponse.json(urls, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching URLs:", {
      message: (error as Error).message,
      stack: (error as Error).stack,
    });

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
