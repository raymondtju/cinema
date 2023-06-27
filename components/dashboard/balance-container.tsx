"use client";

import React, { useState } from "react";
import { User } from "@prisma/client";
import { Button, buttonVariants } from "../ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { rc } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { revalPath } from "@/lib/revalidate";
import Loading from "../ui/loading";

function BalanceContainer({ user }: { user: User | null }) {
  const router = useRouter();
  const [depoAmou, setDepoAmou] = useState<number>(0);
  const [withAmou, setWithAmou] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleBalance(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    type: string,
    amount: number
  ) {
    e.preventDefault();
    setLoading(true);

    const upt = await fetch(
      "/api/balance?action=" + type + "&amount=" + amount,
      {
        method: "PATCH",
      }
    );
    const json = await upt.json();

    if (upt.status !== 200) {
      setLoading(false);
      toast.error(json.message || "something went wrong huhuhu.");
    } else {
      revalPath("/dasboard");
      setLoading(false);
      setOpen(false);
      toast.success(json.message || type + " successful");
      router.back();
    }
  }

  return (
    <div className="max-w-full sm:max-w-xs rounded-lg border p-4">
      <div className="flex justify-between">
        <h3 className="font-bold">Balance</h3>
        <p>IDR {user?.balance}</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Dialog>
          <DialogTrigger
            className={rc(buttonVariants({ variant: "default" }), "col-span-1")}
          >
            Deposit
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Input amount to deposit</DialogTitle>
              <DialogDescription>
                Right now the deposit is manual hehe.
              </DialogDescription>

              <div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Amount
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                        IDR
                      </span>
                      <input
                        type="number"
                        name="amount"
                        id="amount"
                        autoComplete="username"
                        value={depoAmou}
                        onChange={(e) => setDepoAmou(parseInt(e.target.value))}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="1000000"
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>

                <DialogFooter className="mt-4">
                  <Button
                    onClick={(e) => handleBalance(e, "deposit", depoAmou)}
                  >
                    {loading ? <Loading /> : "Deposit"}
                  </Button>
                </DialogFooter>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger
            className={rc(buttonVariants({ variant: "outline" }), "col-span-1")}
          >
            Withdrawal
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Input amount to withdraw</DialogTitle>

              <div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Amount
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                        IDR
                      </span>
                      <input
                        type="number"
                        name="amount"
                        id="amount"
                        autoComplete="username"
                        value={withAmou}
                        onChange={(e) => setWithAmou(parseInt(e.target.value))}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="1000000"
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>

                <DialogFooter className="mt-4">
                  <Button
                    onClick={(e) => handleBalance(e, "withdrawal", withAmou)}
                  >
                    {loading ? <Loading /> : "Withdraw"}
                  </Button>
                </DialogFooter>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default BalanceContainer;
