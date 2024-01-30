import connectSql, { connection } from "../connectDb/route";
import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

export async function POST(req) {
  const session = await getServerSession({ req });
  if (!session) {
    return;
  }

  const { firstName, lastName, password, role, email, status } =
    await req.json();

  connectSql();
  const query = `INSERT INTO users (fName,lname,pwd, role, emailId, status) VALUES ('${firstName}','${lastName}','${password}', '${role}', '${email}', '${status}')`;
  const res = await connection
    .promise()
    .query(query)
    .then(([data, fields]) => {
      return data;
    })
    .catch((err) => {
      return NextResponse.json(
        { result: "Error adding User..." },
        { status: 500 }
      );
    });
  return NextResponse.json(
    { result: "Successfully added User" },
    { status: 200 }
  );
}
