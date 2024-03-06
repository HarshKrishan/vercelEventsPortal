import connectSql, { connection } from "../connectDb/route";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import crypto from "crypto";

export async function POST(req) {
  const session = await getServerSession({ req });

  if (!session) {
    return;
  }

  const loggedInUserEmail = session.user.email;
  const data = await req.formData();

  const name = data.get("name");
  const date = data.get("date");
  const time = data.get("time");
  const organiser = data.get("organiser");
  const description = data.get("description");
  const link = data.get("link");
  const fundedBy = data.get("fundedBy");
  const fund = data.get("fund");
  const numParticipants = data.get("numParticipants");
  const speakers = JSON.parse(data.get("speakers"));

  const randomId = crypto.randomBytes(64).toString("hex");

  connectSql();
  const query = `INSERT INTO events (eName, eDate, eOrgEmail, fundedBy, fund, links, imageURI, Users_emailId, description, numParticipants,speaker_Id,eTime) VALUES ('${name}', '${date}', '${organiser}', '${fundedBy}', '${fund}', '${link}', '${name}', '${loggedInUserEmail}', '${description}', '${numParticipants}', '${randomId}','${time}')`;

  const res = await connection
    .promise()
    .query(query)
    .then(([data, fields]) => {
      speakers.forEach(async (speaker) => {
        const query2 = `INSERT INTO speakers (id,title,name,affiliation) values ('${randomId}','${speaker.title}','${speaker.name}','${speaker.affiliation}')`;
        await connection
          .promise()
          .query(query2)
          .catch((err) => {
            const query3 = `DELETE FROM events WHERE speaker_Id = '${randomId}'`;
            async function deleteEvent() {
              await connection
                .promise()
                .query(query3)
                .catch((err) => {
                  return NextResponse.json(
                    { result: "Something went wrong!" },
                    { status: 500 }
                  );
                });
            }

            deleteEvent();
            return NextResponse.json(
              { result: "Something went wrong!" },
              { status: 500 }
            );
          });
      });
      return data;
    })
    .catch((err) => {
      return NextResponse.json(
        { result: "Error occured while adding event" },
        { status: 500 }
      );
    });
  return NextResponse.json({ result: res }, { status: 200 });
}
