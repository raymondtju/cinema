"use client";

import clsx from "clsx";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import Loading from "./ui/icons/loading";
import { Button } from "./ui/button";
import { rc } from "@/lib/utils";

const SigninForm = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <>
      <Toaster position="top-center" />
      <form
        className="space-y-6"
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          const sign = await signIn("credentials", {
            username: username,
            redirect: false,
          });

          if (JSON.parse(sign?.error as string)) {
            toast.error(JSON.parse(sign?.error as string)?.message);
            setLoading(false);
          } else {
            toast.success("Welcome to cinema.");
            setTimeout(() => {
              router.push("/");
            }, 2000);
          }
        }}
      >
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Username
          </label>
          <div className="mt-2">
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={clsx(
                "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              )}
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <Button
            type="submit"
            className={rc(
              loading
                ? "bg-purple-300 cursor-wait"
                : "bg-purple-600 hover:bg-purple-500", "w-full"
            )}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loading />
                Loading
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </div>
      </form>
    </>
  );
};

export default SigninForm;
