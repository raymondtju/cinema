import "./globals.css";

import LocalFont from "next/font/local";
import { rc } from "@/lib/utils";
import Client from "@/components/client";
import { siteConfig } from "@/lib/config";
import { Metadata } from "next";

const manropeFont = LocalFont({
  src: "../assets/font/Manrope-VariableFont_wght.ttf",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["Next.js", "React", "Tailwind CSS", "Server Components"],
  authors: [
    {
      name: "Raymond",
      url: "https://recrav.com",
    },
  ],
  creator: "recrav",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@recrav",
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={rc(manropeFont.className)}>
        <Client />
        {props.modal}
        {props.children}
      </body>
    </html>
  );
}
