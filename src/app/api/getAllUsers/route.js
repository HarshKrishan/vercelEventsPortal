import connectSql, { connection } from "../connectDb/route";
import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

export async function GET(req) {
  const session = await getServerSession();
  if (!session) {
    return;
  }

  connectSql();

  const rows = await connection
    .promise()
    .query("SELECT * FROM users")
    .then(([data, fields]) => {
      return data;
    })
    .catch((err) => {
      return NextResponse.json(
        { result: "Error getting users" },
        { status: 500 }
      );
    });

  return NextResponse.json({ result: rows }, { status: 200 });
}
