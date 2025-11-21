import { apiProxy } from "@/lib/server/apiProxy";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Optional: extract query parameters
    const searchParams = request.nextUrl.searchParams;
    const path = searchParams.get("url") || "";

    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    const res = await apiProxy(cleanPath);
    return res;
  } catch (error) {
    // add better error logging
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

