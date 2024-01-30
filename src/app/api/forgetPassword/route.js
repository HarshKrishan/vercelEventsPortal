import connectSql, { connection } from "../connectDb/route";
import { NextResponse } from "next/server";

import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req) {
  const { email } = await req.json();

  connectSql();
  const query = `Select * from users where emailId='${email}'`;
  const res = await connection
    .promise()
    .query(query)
    .then(([data, fields]) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      return NextResponse.json(
        { result: "Something went wrong..." },
        { status: 500 }
      );
    });

  if (res.length == 0) {
    return NextResponse.json({ result: "User not found" }, { status: 204 });
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const resetTokenExpiry = new Date(Date.now() + 390 * 60 * 1000)
    .toISOString()
    .slice(0, 19)
    .replace("T", " "); // 1 hour from now

  const query2 = `UPDATE users SET token='${passwordResetToken}', tokenExpiry='${resetTokenExpiry}' WHERE emailId='${email}'`;

  const res2 = await connection
    .promise()
    .query(query2)
    .then(([data, fields]) => {
      return data;
    })
    .catch((err) => {
      return NextResponse.json(
        { result: "Error reseting Password..." },
        { status: 500 }
      );
    });

  const resetUrl = `http://localhost:3000/resetPassword/${resetToken}`;

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

  return NextResponse.json(
    { result: "Email with reset password link is sent." },
    { status: 200 }
  );
}
