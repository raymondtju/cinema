import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="mt-16 flex max-w-[1280px] lg:px-8 px-4 mb-2">
      <p className="font-bold">
        @2023. Made by
        <Link href="https://github.com/raymondtju"> Raymond Tju</Link>
      </p>
    </div>
  );
}

export default Footer;
