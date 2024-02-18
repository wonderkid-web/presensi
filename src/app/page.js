import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "./api/auth/[...nextauth]/options";

export default async function Home() {
  const {user} = await getServerSession(options)

  if(!user){
    redirect('/login')
  }

  redirect('/admin/beranda')
  return (
    <main>

    </main>
  );
}
