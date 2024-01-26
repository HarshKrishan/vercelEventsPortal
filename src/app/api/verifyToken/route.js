import connectSql, { connection } from "../connectDb/route";
import { NextResponse } from "next/server";
import { createClient } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import crypto from "crypto";




export const dynamic = "force-dynamic";
export const revalidate = 0;
export const cache = "no-store";

export async function POST(req) {
  console.log("entering verify Password route");
  // console.log(req);
  const {token} = await req.json();

  //for local sql
  console.log("Got this token ....",token);
  connectSql();
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const query = `Select * from users where token='${hashedToken}'`;
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
        console.log("user not found")
        return NextResponse.json(
            { result: "User not found" },
            { status: 400 }
        );
    }

    const resetTokenExpiry = res[0].tokenExpiry;
    
    

    if(resetTokenExpiry < Date.now()){
        console.log("token expired")
        return NextResponse.json(
            { result: "Invalid token or token has expired" },
            { status: 400 }
        );
    }

    console.log("token verified")
    return NextResponse.json(

        { result: "Token verified",
        user:res[0].emailId 
        },
        { status: 200 }
    );
}