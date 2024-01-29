import { redirect } from "next/navigation";
import Form from "./Form";
import { getServerSession } from "next-auth";

export async function Page() {
   const session = await getServerSession();

   if(session){
      redirect("/dashboardAdmin");
   }

  const siteKey = process.env.SITE_KEY;

  return (
    <>
      <Form siteKey={siteKey}/>
    </>
  );
}

export default Page