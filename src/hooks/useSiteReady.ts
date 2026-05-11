import { useState, useEffect } from "react";
import { getSectionData } from "@/lib/firestore";

const SECTIONS = ["hero", "about", "skills", "projects", "contact", "footer"];

/**
 * Fires all section fetches in parallel and returns true once every
 * request has settled (success or error). Components can then render
 * with their actual data instead of showing the fallback first.
 */
export function useSiteReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Promise.allSettled(SECTIONS.map((s) => getSectionData(s))).then(() => {
      setReady(true);
    });
  }, []);

  return ready;
}

