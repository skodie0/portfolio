import { useState, useEffect } from "react";
import { getSectionData } from "@/lib/firestore";

export function useSiteData<T>(section: string, fallback: T): { data: T; loading: boolean } {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getSectionData<T>(section).then((result) => {
      if (!cancelled && result) {
        setData(result);
      }
      if (!cancelled) setLoading(false);
    });
    return () => { cancelled = true; };
  }, [section]);

  return { data, loading };
}
