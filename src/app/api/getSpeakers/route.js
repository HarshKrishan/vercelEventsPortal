import connectSql, { connection } from "../connectDb/route";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
export async function POST(req) {
  // const session = await getServerSession();
  // if (!session) {
  //   return;
  // }

  const { speaker_Id } = await req.json();
  connectSql();

  const query = `SELECT * FROM speakers where id='${speaker_Id}'`;

  const res = await connection
    .promise()
    .query(query)
    .then(([data, fields]) => {
      return data;
    })
    .catch((err) => {
      return NextResponse.json(
        { result: "Error getting speakers" },
        { status: 500 }
      );
    });

  return NextResponse.json({ result: res }, { status: 200 });
}
