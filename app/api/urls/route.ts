import prisma from "@/lib/db";

export async function GET() {
  try {
    console.log("Fetching URLs...");
    const urls = await prisma.url.findMany({
      orderBy: { CreatedAt: "desc" },
      take: 5,
    });
    console.log("URLs fetched successfully:", urls);

    return new Response(JSON.stringify(urls), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching URLs", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
