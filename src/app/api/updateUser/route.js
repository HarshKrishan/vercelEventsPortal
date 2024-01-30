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
  const query = `update users set fName='${firstName}',lName = '${lastName}', pwd='${password}',role= '${role}',status='${status}' where emailId='${email}'`;
  const res = await connection
    .promise()
    .query(query)
    .then(([data, fields]) => {
      return data;
    })
    .catch((err) => {
      return NextResponse.json(
        { result: "Error updating User..." },
        { status: 500 }
      );
    });

  return NextResponse.json({ result: res }, { status: 200 });
}
