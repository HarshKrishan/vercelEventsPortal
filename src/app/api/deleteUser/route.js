import connectSql, { connection } from "../connectDb/route";
import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";
export async function POST(req) {
  const session = await getServerSession();
  if (!session) {
    return;
  }

  const data = await req.formData();

  const email = data.get("email");

  connectSql();
  const query = `DELETE FROM users WHERE emailId = '${email}';`;

  const res = await connection
    .promise()
    .query(query)
    .then(([data, fields]) => {
      return data;
    })
    .catch((err) => {
      return NextResponse.json(
        { result: "Error deleting user..." },
        { status: 500 }
      );
    });

  return NextResponse.json({ result: res }, { status: 200 });
}
