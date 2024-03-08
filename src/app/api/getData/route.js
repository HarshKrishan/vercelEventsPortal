import connectSql, { connection } from "../connectDb/route";
import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

export async function POST(req) {
  const session = await getServerSession();
  if (!session) {
    return;
  }

  let { startDate, endDate, email, role } = await req.json();
  if(startDate == null || endDate ==null){
    connectSql();

    const queryForAdmin = `select * from events, speakers where events.speaker_Id=speakers.id order by eDate;`;

    const queryForCoAdmin = `select * from events, speakers where events.speaker_Id=speakers.id and Users_emailId = '${email}' order by eDate;`;

    const events = await connection
      .promise()
      .query(role == "admin" ? queryForAdmin : queryForCoAdmin)
      .then(([data, fields]) => {
        return data;
      })
      .catch((err) => {
        return NextResponse.json(
          { result: "Error getting events" },
          { status: 500 }
        );
      });

    return NextResponse.json({ result: events }, { status: 200 });

  }else{
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    startDate = startDate.setTime(startDate.getTime() + 330 * 60 * 1000);
    endDate = endDate.setTime(endDate.getTime() + 330 * 60 * 1000);

    startDate = new Date(startDate);
    endDate = new Date(endDate);

    startDate =
      startDate.getFullYear() +
      "-" +
      (startDate.getMonth() + 1) +
      "-" +
      startDate.getDate();
    endDate =
      endDate.getFullYear() +
      "-" +
      (endDate.getMonth() + 1) +
      "-" +
      endDate.getDate();

    connectSql();

    const queryForAdmin = `select * from events, speakers where events.speaker_Id=speakers.id and DATE(eDate) between '${startDate}' and '${endDate}' order by eDate;`;

    const queryForCoAdmin = `select * from events, speakers where events.speaker_Id=speakers.id and where DATE(eDate) between '${startDate}' and '${endDate}' and Users_emailId = '${email}' order by eDate;`;

    const events = await connection
      .promise()
      .query(role == "admin" ? queryForAdmin : queryForCoAdmin)
      .then(([data, fields]) => {
        return data;
      })
      .catch((err) => {
        return NextResponse.json(
          { result: "Error getting events" },
          { status: 500 }
        );
      });

    return NextResponse.json({ result: events }, { status: 200 });

  }
  
}
