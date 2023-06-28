export const siteConfig = {
  name: "Cinema App",
  url: "https://cn.recrav.com",
  ogImage: "https://cn.recrav.com/og.png",
  description: "Project build using newest NextJS version 13",
};

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://cn.recrav.com"
    : "http://localhost:3000";
