export const backendConfig = {
  url:
    process.env.NODE_ENV === "development"
      ? "/backend" // Use rewrite in development
      : "https://backend.sharkscout.tech", // Direct call in production
};
