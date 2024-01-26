import connectSql, { connection } from "../connectDb/route";
import { NextResponse } from "next/server";
import { createClient } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import crypto from "crypto";
import nodemailer from "nodemailer";



export const dynamic = "force-dynamic";
export const revalidate = 0;
export const cache = "no-store";

export async function POST(req) {
  console.log("entering ForgotPassword route");
  // console.log(req);
  const {email} = await req.json();

  //for local sql
  console.log("Got this....",email);
  connectSql();
  const query = `Select * from users where emailId='${email}'`;
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
        { status: 500 }
      );
    });

    if(res.length==0){
        return NextResponse.json(
            { result: "User not found" },
            { status: 200 }
        );
    }
//   return NextResponse.json(
//     { result: "Successfully added User" },
//     { status: 200 }
//   );
  


  const resetToken = crypto.randomBytes(32).toString("hex");
  const passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    
    const resetTokenExpiry = new Date(Date.now() +390 * 60 * 1000)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");// 1 hour from now

    const query2 = `UPDATE users SET token='${passwordResetToken}', tokenExpiry='${resetTokenExpiry}' WHERE emailId='${email}'`;
    console.log("reset token",resetToken)
    const res2 = await connection
    .promise()
    .query(query2)
    .then(([data, fields]) => {
      // console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(err);
      return NextResponse.json(
        { result: "Error reseting Password..." },
        { status: 500 }
      );
    });

    const resetUrl = `http://localhost:3000/resetPassword/${resetToken}`;

    console.log(resetUrl);


    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "robyn.jast26@ethereal.email",
        pass: "1AYa2xycCueJFtUDvY",
      },
    });

    const emailTemplate = `<div>
        <h2>Password Reset</h2>
        <p>Dear User,</p>
        <p>We received a request to reset your password. To proceed with the password reset, please click the button below:</p>
        <p>
            <a href=${resetUrl} target="_blank" rel="noopener noreferrer">Reset Password</a>
        </p>
        <p>If you did not request a password reset, you can ignore this email.</p>
        <p>Thank you,<br>Your Company Name</p>
    </div>`;
    const info = await transporter.sendMail({
      from: '"IIITD Events Portal 👻" <foo@example.com>', // sender address
      to: email, // list of receivers
      subject: "Reset Your Password", // Subject line
      text: emailTemplate, // plain text body
      html: emailTemplate, // html body
    });

    console.log("Message sent: %s", info.messageId);
    return NextResponse.json({result:"Email with reset password link is sent."}, { status: 200 });
}
