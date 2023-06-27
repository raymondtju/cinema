"use client";
import { toast } from "sonner";

import { revalPath } from "@/lib/revalidate";
import Link from "next/link";
import { Button } from "../ui/button";

function formatDate(date: Date) {
  // const options = ;
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const OrderContainer = ({ orderHistory }: { orderHistory: any[] | null }) => {
  async function handleCancel(id: number) {
    const act = await fetch("/api/movie/checkout?order_id=" + id, {
      method: "PATCH",
    });
    const res = await act.json();

    if (act.status === 200) {
      revalPath("/dashboard");
      toast.success(res.message);
    } else {
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
                      Cancel
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* <ul role="list" className="divide-y divide-gray-100">
        {orderHistory ? (
          orderHistory.map((order) => (
            <li key={order.id} className="flex justify-between gap-x-6 py-5">
              <div className="flex gap-x-4">
                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={order.Movies.poster as string}
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <Link
                    className="text-sm font-semibold leading-6 text-gray-900"
                    href={"/movie/" + order.movie_id}
                  >
                    {order.Movies.title}
                  </Link>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    Aired on : {formatDate(order.Movies.aired_at as Date)}
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  {order.payment_status} / {order.reserved_seat.length} x{" "}
                  {order.Movies.ticket_price}
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  IDR{" "}
                  {order.Movies.ticket_price &&
                    order.reserved_seat.length * order.Movies.ticket_price}
                </p>
              </div>
              <div>
                <Button
                  variant="secondary"
                  onClick={() => handleCancel(order.id)}
                >
                  Cancel
                </Button>
              </div>
            </li>

            
          ))
        ) : (
          <p>No order found.</p>
        )}
      </ul> */}
    </div>
  );
};

export default OrderContainer;
