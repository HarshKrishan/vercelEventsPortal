import connectSql, { connection } from "../connectDb/route";
import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

export async function POST(req) {
  const session = await getServerSession();
  if (!session) {
    return;
  }

  const data = await req.formData();

  const id = data.get("eventId");

  connectSql();
  const query = `DELETE FROM events WHERE eventId = '${id}';`;

  const res = await connection
    .promise()
    .query(query)
    .then(([data, fields]) => {
      return data;
    })
    .catch((err) => {
      return NextResponse.json(
        { result: "Error deleting event" },
        { status: 500 }
      );
    });
  return NextResponse.json({ result: res }, { status: 200 });
}
