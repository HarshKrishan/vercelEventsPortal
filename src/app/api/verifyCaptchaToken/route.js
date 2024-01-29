
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";
export const revalidate = 0;
export const cache = "no-store";

export async function POST(req) {
//   console.log("entering verify captcha token route");
  
  const { token } = await req.json();

  
//   console.log("Got this token ....", token);
  

    try{
        const response = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${token}`,
            {
              method: "POST",
            }
          );
          const data = await response.json();
          console.log("data", data);
          if (!data.success) {
            return NextResponse.json(
              { result: "Invalid captcha token" },
              { status: 400 }
            );
          }
    }catch(err){
        console.log(err);
        return NextResponse.json(
            { result: "Error verifying captcha token" },
            { status: 500 }
          );
    }
  
  return NextResponse.json(
    { result: "Token verified"},
    { status: 200 }
  );
}
