import "./globals.css";

import { Inter } from "next/font/google";
import { rc } from "@/lib/utils";
import Client from "@/components/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cinema App",
  description: "Build using NextJS 13",
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={rc(inter.className)}>
        <Client />
        {props.modal}
        {props.children}
      </body>
    </html>
  );
}
