export const isElectron
  = typeof navigator === "object" && navigator.userAgent.includes("Electron");
