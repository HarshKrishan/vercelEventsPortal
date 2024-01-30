import connectSql, { connection } from "../connectDb/route";
import { NextResponse } from "next/server";
import { createClient } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import crypto from "crypto";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const cache = "no-store";

export async function POST(req) {
  console.log("Entering addEvent route");

  
  

  const session = await getServerSession({ req });

  if (!session) {
    return;
  }
  
  // console.log("session", session)
  const loggedInUserEmail = session.user.email;
  const data = await req.formData();
  // console.log("data", data);

  const name = data.get("name");
  const date = data.get("date");
  const organiser = data.get("organiser");
  const description = data.get("description");
  const link = data.get("link");
  const fundedBy = data.get("fundedBy");
  const fund = data.get("fund");
  let numParticipants = data.get("numParticipants");
  numParticipants = parseInt(numParticipants);
  const speakers = JSON.parse(data.get("speakers"));
  // console.log("speakers", speakers)
  const randomId = crypto.randomBytes(64).toString("hex");
  //for local sql
  connectSql();
  const query = `INSERT INTO events (eName, eDate, eOrgEmail, fundedBy, fund, links, imageURI, Users_emailId, description, numParticipants,speaker_Id) VALUES ('${name}', '${date}', '${organiser}', '${fundedBy}', '${fund}', '${link}', '${name}', '${loggedInUserEmail}', '${description}', '${numParticipants}', '${randomId}')`;

  const res = await connection
    .promise()
    .query(query)
    .then(([data, fields]) => {
      // console.log(data);

      
      speakers.forEach(async (speaker) => {
        const query2 = `INSERT INTO speakers (id,title,affiliation) values ('${randomId}','${speaker.title}','${speaker.affiliation}')`;
        await connection.promise().query(query2).catch((err) => {
          console.log(err);
          return NextResponse.json(
            { result: "Error occured while adding event" },
            { status: 200 }
          );
        });
      });
      return data;
    })
    .catch((err) => {
      console.log(err);
      return NextResponse.json(
        { result: "Error occured while adding event" },
        { status: 200 }
      );
    });
    return NextResponse.json(
      { result: res },
      { status: 200 }
    );

  //for vercel sql
  // const client = createClient();
  // await client.connect();

  // try {
  //   const { rows, fields } = await client.sql`INSERT INTO events (ename, edate, eorgemail, fundedBy, fund, links, imageuri, users_emailid) VALUES (${name}, ${date}, ${organiser}, ${fundedBy}, ${fund}, ${link}, ${name}, ${organiser})`;
  //   return NextResponse.json({ result: rows }, { status: 200 });

  // }
  // catch (error) {
  //   console.log("error connecting sql", error)
  // }finally{
  //   await client.end();
  // }

  
  // return NextResponse.json({ result: "Error occured while adding event" }, { status: 200 });
}
