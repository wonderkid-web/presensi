import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page() {
  const session = await getServerSession(options);

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
