"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect, useState } from "react";

export default function useRole() {
  const { data: session } = useSession();
  const [check, setCheck] = useState(false)
  const router = useRouter();

  useLayoutEffect(() => {
    if (session) {
      if (session.user.role != "admin") {
        setCheck(true)
        router.push("/admin");
      }
    }
  }, [session]);

  return check

}
