"use client";

import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useRealtime(collection) {
  const [data, setData] = useState([]);

  const getRealTime = () => {
    onSnapshot(collection, (snapshot) => {
      setData(snapshot.docs.map((item) => ({ ...item.data(), id: item.id })));
    });
  };

  useEffect(() => {
    getRealTime();

    return () => getRealTime();
  }, []);

  return { data };
}
