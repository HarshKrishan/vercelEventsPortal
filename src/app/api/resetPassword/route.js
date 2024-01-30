import connectSql, { connection } from "../connectDb/route";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();

  connectSql();

  const query = `UPDATE users SET pwd='${password}', token=null, tokenExpiry=null WHERE emailId='${email}'`;

  const res = await connection
    .promise()
    .query(query)
    .then(([data, fields]) => {
      return data;
    })
    .catch((err) => {
      return NextResponse.json(
        { result: "Something went wrong..." },
        { status: 500 }
      );
    });
  if (res.length == 0) {
    return NextResponse.json({ result: "User not found" }, { status: 204 });
  }

  return NextResponse.json(
    { result: "Successfully updated password" },
    { status: 200 }
  );
}
