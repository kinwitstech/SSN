export function useSubdomain() {
  const hostname = window.location.hostname;
  // e.g. "clinicx.localhost" → ["clinicx", "localhost"]
  const parts = hostname.split(".");
  const subdomain = parts.length > 2 ? parts[0] : parts[0]; // keeps "clinicx" from "clinicx.localhost"
  const isMainDomain =
    ["localhost", "ssn", "ssn-kamala"].includes(subdomain) ||
    subdomain.includes("ssn-kamala");

  return { subdomain, isMainDomain };
}
