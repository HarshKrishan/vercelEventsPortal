import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Form from "./Form";

export async function Page({ params }) {
  const session = await getServerSession();
  const { token } = params;
  if (session) {
    redirect("/dashboardAdmin");
  }
  return (
    <>
      <Form token={token} />
    </>
  );
}

export default Page;
