import connectSql, { connection } from "../connectDb/route";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { writeFile, mkdir } from "fs/promises";

export async function POST(req, res) {
  const session = await getServerSession({ req });

  if (!session) {
    return;
  }
  const data = await req.formData();

  const files = data.getAll("files[]"); // getting attachments
  connectSql();
  for (const file of files) {
    const byteData = await file.arrayBuffer();
    const buffer = Buffer.from(byteData);

    const currtime = new Date().getTime();
    const eventName = data.get("eventName");
    const eventDate = data.get("eventDate");
    await mkdir(`./public/uploads/${eventName+eventDate}`, { recursive: true });
    const extension = file.type.split("/")[1];
    const path = `./public/uploads/${eventName+eventDate}/${currtime + "." + extension}`;

    await writeFile(path, buffer);
    const query = `INSERT INTO images (imageId,Events_eventId) VALUES (${currtime}, ${parseInt(
      data.get("eventId")
    )})`;
    const res = await connection
      .promise()
      .query(query)
      .then(([data, fields]) => {
        return data;
      })
      .catch((err) => {
        return NextResponse.json(
          { result: "Error uploading attachments" },
          { status: 500 }
        );
      });
  }

  return NextResponse.json({ result: res }, { status: 200 });
}
