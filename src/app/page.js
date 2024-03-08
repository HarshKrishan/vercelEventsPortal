import Home from "@/components/Home";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession();

  if (session) {
    redirect("/dashboardAdmin");
  }

  return (
    <div className="">
      <Home />
      {/* <div className="fixed bottom-0 mb-2 z-[-1] w-full opacity-50 text-center">
        <p>Made by Harsh Aggarwal (2020508) and Harsh Krishan (2020509)</p>
      </div> */}
    </div>
  );
}
