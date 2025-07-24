import { useMemo } from "react";

export function useSubdomain() {
  const hostname = window.location.hostname;
  return useMemo(() => {
    const parts = hostname.split(".");
    const rawSubdomain = parts[0];
    const isMainDomain =
      ["localhost", "ssn", "ssn-kamala"].includes(rawSubdomain) ||
      rawSubdomain.includes("ssn-kamala");

    const subdomain = isMainDomain ? "" : rawSubdomain;

    return { subdomain, isMainDomain };
  }, [hostname]);
}
