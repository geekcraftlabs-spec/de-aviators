import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_BYTES = 6 * 1024 * 1024;
const MAX_FILES = 4;

function makeRef() {
  const t = Date.now().toString(36).toUpperCase().slice(-4);
  const r = Math.random().toString(36).toUpperCase().slice(2, 6);
  return `DA-${t}${r}`;
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const files = form
      .getAll("photos")
      .filter((f): f is File => f instanceof File && f.size > 0);

    if (files.length === 0) {
      return NextResponse.json(
        { error: "No photos received" },
        { status: 400 }
      );
    }

    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { error: `Too many photos (max ${MAX_FILES})` },
        { status: 400 }
      );
    }

    for (const f of files) {
      if (f.size > MAX_BYTES) {
        return NextResponse.json(
          { error: "One photo exceeds the size limit" },
          { status: 413 }
        );
      }
    }

    const ref = makeRef();
    const uploaded: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const { url } = await put(
        `quotes/${ref}/${String(i + 1).padStart(2, "0")}.jpg`,
        files[i],
        {
          access: "public",
          contentType: "image/jpeg",
          addRandomSuffix: false,
        }
      );
      uploaded.push(url);
    }

    await put(
      `quotes/${ref}/brief.json`,
      JSON.stringify({
        ref,
        piece: form.get("piece") ?? "",
        dims: form.get("dims") ?? "",
        notes: form.get("notes") ?? "",
        name: form.get("name") ?? "",
        area: form.get("area") ?? "",
        photos: uploaded.length,
        at: new Date().toISOString(),
      }),
      {
        access: "public",
        contentType: "application/json",
        addRandomSuffix: false,
      }
    );

    return NextResponse.json({
      ref,
      briefUrl: `${site.url}/q/${ref}`,
    });
  } catch (err) {
    console.error("Quote upload failed:", err);
    return NextResponse.json(
      { error: "Upload failed. Please try again." },
      { status: 500 }
    );
  }
}