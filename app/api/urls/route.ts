import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Before database call");

    // Simplifica la consulta para diagnóstico inicial
    const urls = await prisma.url.findFirst();

    console.log("After database call:", urls);

    if (!urls) {
      console.warn("No URLs found");
    }

    return NextResponse.json(urls);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching URLs:", error.message, error.stack);
    } else {
      console.error("Error fetching URLs:", error);
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
