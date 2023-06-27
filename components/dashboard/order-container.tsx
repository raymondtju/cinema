"use client";
import { toast } from "sonner";

import { revalPath } from "@/lib/revalidate";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";
import Loading from "../ui/loading";

const OrderContainer = ({ orderHistory }: { orderHistory: any[] | null }) => {
  const [loading, setLoading] = useState(false);

  async function handleCancel(id: number) {
    setLoading(true);
    const act = await fetch("/api/movie/checkout?order_id=" + id, {
      method: "PATCH",
    });
    const res = await act.json();

    if (act.status === 200) {
      setLoading(false);
      revalPath("/dashboard");
      toast.success(res.message);
    } else {
      setLoading(false);
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="rounded-lg border p-4">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Order History
      </h2>
      <div className="relative ">
        <table className=" mt-6 table-auto w-[672px] sm:max-w-full sm:w-full rounded-lg overflow-hidden">
          <thead className="bg-slate-100 py-2">
            <tr className="py-2">
              <th className="text-start pl-4">Movie Name</th>
              <th className="text-start">Quantity</th>
              <th className="text-start">Total Payment</th>
              <th className="text-start">Status</th>
              <th className="text-start">Action</th>
            </tr>
          </thead>
          <tbody>
            {orderHistory &&
              orderHistory.map((order) => (
                <tr className="" key={order.id}>
                  <td className="pl-4">
                    <Link href={"/movie/" + order.movie_id}>
                      {order.Movies.title}
                    </Link>
                  </td>
                  <td>
                    {order.reserved_seat.length} x {order.Movies.ticket_price}
                  </td>
                  <td>
                    IDR{" "}
                    {order.Movies.ticket_price &&
                      order.reserved_seat.length * order.Movies.ticket_price}
                  </td>
                  <td>{order.payment_status}</td>
                  <td>
                    <Button
                      variant="outline"
                      onClick={() => handleCancel(order.id)}
                      disabled={order.payment_status === "canceled"}
                    >
                      {loading ? <Loading /> : "Cancel"}
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderContainer;
