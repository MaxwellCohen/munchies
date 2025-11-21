"use server"
import { NextResponse } from "next/server";

const apiGroups = ["restaurants", "filter", "open", "price-range"];

const staticPaths = ["images"];

const baseUrl = process.env.API_BASE_URL;
const apiURL = `${baseUrl}/api`;

const apiTTL = 300;

export async function apiProxy(path: string) {
  // quick and dirty check if path starts with any of the api groups
  const isApi = apiGroups.some((group) => path.startsWith(group));
  const isStatic = staticPaths.some((group) => path.startsWith(group));
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
