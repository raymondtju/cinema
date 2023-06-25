"use client";

import clsx from "clsx";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster, toast } from "sonner";

const SigninForm = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <>
      <Toaster />
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
            toast.success("Successfully create username.");
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
          <button
            type="submit"
            className={clsx("flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", loading && "bg-purple-300")}
            disabled={loading}
          >
            Sign in
          </button>
        </div>
      </form>
    </>
  );
};

export default SigninForm;
