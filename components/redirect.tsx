"use client";

import { useRouter } from "next/navigation";

const Redirect = ({ path }: { path: string }) => {
  const router = useRouter();
  router.push(path);
  return <></>;
};

export default Redirect;
