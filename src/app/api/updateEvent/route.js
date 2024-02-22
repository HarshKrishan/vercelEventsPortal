import connectSql, { connection } from "../connectDb/route";
import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

export async function POST(req) {
  const session = await getServerSession({ req });
  if (!session) {
    return;

  }
    const data = await req.formData();

    const name = data.get("name");
    const eventId = data.get("eventId");
    const date = data.get("date");
    const eTime = data.get("eTime");
    const organiser = data.get("organiser");
    const description = data.get("description");
    const link = data.get("link");
    const fundedBy = data.get("fundedBy");
    const fund = data.get("fund");
    const numParticipants = data.get("numParticipants");
    const speakers = JSON.parse(data.get("speakers"));
    const speaker_Id = data.get("speaker_id");

    connectSql();

    const query = `update events set eName='${name}',eDate='${date}',eOrgEmail='${organiser}',links='${link}',fundedBy='${fundedBy}',fund='${fund}', description='${description}',numParticipants='${numParticipants}', eTime='${eTime}' where eventId='${eventId}'`;

    const res = await connection
      .promise()
      .query(query)
      .then(([data, fields]) => {



        const query2 = `delete from speakers where id='${speaker_Id}'`;
        connection.promise().query(query2).then(([data, fields]) => {
          speakers.forEach(async (speaker) => {
            const query3 = `INSERT INTO speakers (id,title,affiliation) values ('${speaker_Id}','${speaker.title}','${speaker.affiliation}')`;
            await connection
              .promise()
              .query(query3)
              .catch((err) => {
                return NextResponse.json(
                  { result: "Error updating speakers" },
                  { status: 500 }
                );
              });
          });
        }).catch((err) => {
          return NextResponse.json(
            { result: "Error deleting previous speakers" },
            { status: 500 }
          );
        }
        );


        return data;
      })
      .catch((err) => {
        return NextResponse.json(
          { result: "Error updating Event..." },
          { status: 500 }
        );
      });

    return NextResponse.json({ result: res }, { status: 200 });
}
