"use client";

import React from "react";
import { User } from "@prisma/client";
import { Button } from "../ui/button";
import { revalPath } from "@/lib/revalidate";
import Loading from "../ui/loading";
import { toast } from "sonner";

const SettingsContainer = ({ user }: { user: User | null }) => {
  const [age, setAge] = React.useState("");
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setAge(user?.age?.toString() as string);
    setName(user?.name as string);
  }, [user]);

  return (
    <div className="max-w-full sm:max-w-xs rounded-lg border p-4">
      <form>
        <div className="pb-4">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Account Settings
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="username"
                  id="username"
                  defaultValue={user?.username}
                  placeholder="Your username"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200 disabled:text-slate-50 disabled:cursor-not-allowed"
                  disabled
                />
              </div>
            </div>

            <div className="col-span-2">
              <label
                htmlFor="age"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Age
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="age"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            type="submit"
            className="w-full"
            onClick={async (e) => {
              e.preventDefault();
              setLoading(true);

              const upt = await fetch("/api/settings", {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name,
                  age,
                }),
              });
              const json = await upt.json();

              if (upt.status !== 200) {
                setLoading(false);
                toast.error(json.message);
              } else {
                setLoading(false);
                toast.success(json.message);
                revalPath("/dashboard");
              }
            }}
            disabled={loading}
          >
            {loading ? <Loading /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SettingsContainer;
