"use client";

import clsx from "clsx";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Loading from "./ui/loading";
import { Button } from "./ui/button";
import { rc } from "@/lib/utils";
import { randomUsername } from "@/lib/faker";
import { RotateCcw } from "lucide-react";

const SigninForm = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");

  const [loading, setLoading] = useState(false);

  return (
    <>
      <form className="space-y-6">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Username
          </label>
          <div className="mt-2 grid grid-cols-5 gap-3">
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={clsx(
                "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
                "col-span-4"
              )}
              disabled={loading}
            />
            <Button
              className="col-span-1"
              onClick={() => setUsername(randomUsername())}
            >
              <span className="sr-only">Generate</span>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Age
          </label>
          <div className="mt-2">
            <input
              id="age"
              name="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
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
              loading ? "bg-indigo-300 cursor-wait" : "hover:bg-indigo-500",
              "w-full"
            )}
            onClick={async (e) => {
              e.preventDefault();
              setLoading(true);
              const sign = await signIn("credentials", {
                username,
                age,
                redirect: false,
              });

              if (JSON.parse(sign?.error as string)) {
                toast.error(JSON.parse(sign?.error as string)?.message);
                setLoading(false);
              } else {
                toast.success("Welcome to cinema.");
                setLoading(false);
                setTimeout(() => {
                  window.location.replace("/");
                }, 1000);
              }
            }}
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
