/** @type {import('next').NextConfig} */

import * as dotenv from "dotenv";

dotenv.config();

const nextConfig = {
  reactStrictMode: true,
  env: {
    FIREBASE_APIKEY: process.env.FIREBASE_APIKEY,
    authDomain: process.env.FBASE_AUTH_DOMAIN,
    FBASE_AUTH_DOMAIN: process.env.FBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FBASE_MESSAGING_SENDER_ID: process.env.FBASE_MESSAGING_SENDER_ID,
    FBASE_APP_ID: process.env.FBASE_APP_ID,
    FBASE_MEASUREMENT_ID: process.env.FBASE_MEASUREMENT_ID,
    baseApi: process.env.BASE_API,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
