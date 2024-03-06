import { data } from "autoprefixer";
import connectSql, { connection } from "../connectDb/route";
import { NextResponse } from "next/server";

export async function GET(req) {
  connectSql();

  const events = await connection
    .promise()
    .query("SELECT * FROM events ORDER BY eDate DESC")
    .then(([data, fields]) => {
      return data;
    })
    .catch((err) => {
      return NextResponse.json(
        { result: "Error getting events" },
        { status: 500 }
      );
    });

  const dataToSend = [];

events.map((event) => {
    dataToSend.push({
        id: event.id,
        eName: event.eName,
        description: event.description,
        eDate: event.eDate,
        eTime:event.eTime,
        numParticipants: event.numParticipants,
        speaker_Id: event.speaker_Id,
    });
});

  return NextResponse.json({ result: dataToSend }, { status: 200 });
}
