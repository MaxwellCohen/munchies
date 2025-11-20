import { NextRequest, NextResponse } from "next/server";

const apiGroups = ["restaurants", "filter", "open", "price-range"];

const staticPaths = ["images"];

const baseUrl = "https://work-test-web-2024-eze6j4scpq-lz.a.run.app";
const apiURL = `${baseUrl}/api`;

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

const apiTTL = 300;

async function apiProxy(path: string) {
  // removing spit of first slash and api

  // quick and dirty check if path starts with any of the api groups
  const isApi = apiGroups.some((group) => path.startsWith(group));
  const isStatic = staticPaths.some((group) => path.startsWith(group));
  console.log("isApi", isApi, "isStatic", isStatic, "path", path);
  if (!isApi && !isStatic) {
    return NextResponse.json({ error: "Invalid Path" }, { status: 404 });
  }
  const fetchURL = isApi ? `${apiURL}/${path}` : `${baseUrl}/${path}`;
  const res = await fetch(fetchURL, {
    // using next's built in cache to cache the response
    next: { revalidate: apiTTL, tags: ["apiProxy", fetchURL] },
  });

  return res;
}
