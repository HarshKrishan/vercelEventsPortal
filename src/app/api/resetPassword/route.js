import connectSql, { connection } from "../connectDb/route";
import { NextResponse } from "next/server";
import { createClient } from "@vercel/postgres";
import { revalidatePath } from "next/cache";





export const dynamic = "force-dynamic";
export const revalidate = 0;
export const cache = "no-store";

export async function POST(req) {
  console.log("entering ResetPassword route");
  // console.log(req);
  const {email, password} = await req.json();

  //for local sql
//   console.log("Got this....",token);
  connectSql();

  const query = `UPDATE users SET pwd='${password}', token=null, tokenExpiry=null WHERE emailId='${email}'`

    const res = await connection
    .promise()
    .query(query)
    .then(([data, fields]) => {
      // console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(err);
      return NextResponse.json(
        { result: "Error finding User..." },
        { status: 400 }
      );
    });
    if(res.length==0){
      return NextResponse.json(
          { result: "User not found" },
          { status: 400 }
      );
  }

    return NextResponse.json(
        { result: "Successfully updated password" },
        { status: 200 }
    );
}