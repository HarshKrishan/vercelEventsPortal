import { NextResponse } from "next/server";

export async function POST(req) {
  const { token } = await req.json();

  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${token}`,
      {
        method: "POST",
      }
    );
    const data = await response.json();

    if (!data.success) {
      return NextResponse.json(
        { result: "Invalid captcha token" },
        { status: 401 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { result: "Error verifying captcha token" },
      { status: 500 }
    );
  }

  return NextResponse.json({ result: "Token verified" }, { status: 200 });
}
