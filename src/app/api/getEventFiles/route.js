import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import fs from "fs";
import path from "path";

export async function POST(req) {
  const session = await getServerSession();
  if (!session) {
    return;
  }
  const request = await req.json();
  const { uri } = request;

  try {
    const dir = path.resolve("./public/uploads/" + uri + "/");
    const filenames = fs.readdirSync(dir);
    return NextResponse.json({ result: filenames }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { result: "Error getting images or Directory does not exist" },
      { status: 500 }
    );
  }
}
