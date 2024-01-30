import connectSql, { connection } from "../connectDb/route";
import { NextResponse } from "next/server";

import crypto from "crypto";

export async function POST(req) {
  const { token } = await req.json();
  connectSql();
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const query = `Select * from users where token='${hashedToken}'`;
  const res = await connection
    .promise()
    .query(query)
    .then(([data, fields]) => {
      return data;
    })
    .catch((err) => {
      return NextResponse.json(
        { result: "Something went Wrong!" },
        { status: 500 }
      );
    });
  if (res.length == 0) {
    return NextResponse.json({ result: "User not found" }, { status: 204 });
  }

  const resetTokenExpiry = res[0].tokenExpiry;

  if (resetTokenExpiry < Date.now()) {
    return NextResponse.json(
      { result: "Invalid token or token has expired" },
      { status: 200 }
    );
  }
  return NextResponse.json(
    { result: "Token verified", user: res[0].emailId },
    { status: 200 }
  );
}
