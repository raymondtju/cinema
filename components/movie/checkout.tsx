"use client";

import { revalPath } from "@/lib/revalidate";
import { Movies, Seat } from "@prisma/client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import Loading from "../ui/loading";
import { X } from "lucide-react";

const Checkout = ({
  movie,
  reservedSeat,
}: {
  movie: Movies;
  reservedSeat: Seat | { reserved: number[] } | null;
}) => {
  const [loading, setLoading] = useState(false);

  const num = [];
  for (let x = 0; x < 64; x++) num.push(x);

  const [selectedSeat, setSelectedSeat] = useState<number[]>([]);

  useEffect(() => {
    reservedSeat && setSelectedSeat(reservedSeat.reserved);
  }, [reservedSeat]);

  function handleClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) {
    e.preventDefault();
    if (selectedSeat.includes(id)) {
      const temp = selectedSeat.filter((x) => x != id);
      setSelectedSeat(temp);
    } else if (
      selectedSeat.filter((seat) => !reservedSeat?.reserved.includes(seat))
        .length > 5
    ) {
      toast.error("Maximum selected seat is 6.");
    } else {
      setSelectedSeat([...selectedSeat, id]);
    }
  }

  async function handleCheckout(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    setLoading(true);
    const checkout = await fetch("/api/movie/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movie,
        seat: selectedSeat.filter(
          (seat) => !reservedSeat?.reserved.includes(seat)
        ),
      }),
    });
    const json = await checkout.json();
    if (checkout.status != 200) {
      setLoading(false);
      toast.error(json?.message);
    } else {
      setLoading(false);
      revalPath("/movie" + movie.id);
      toast.success(json?.message);
    }
  }

  return (
    <div>
      <div className="grid grid-cols-8 gap-1.5 w-fit">
        {reservedSeat &&
          num.map((box) => {
            return (
              <button
                className={clsx(
                  "relative w-7 h-7 rounded-md bg-neutral-200 inline-block hover:bg-indigo-400 duration-200",
                  selectedSeat.includes(box) && "bg-indigo-400",
                  reservedSeat.reserved.includes(box) &&
                    "cursor-not-allowed bg-stone-700 text-stone-700 hover:bg-stone-700"
                )}
                key={box}
                onClick={(e) => handleClick(e, box)}
                disabled={reservedSeat.reserved.includes(box) && true}
              >
                <div className="absolute inset-0 font-bold text-sm flex items-center justify-center text-white">
                  {reservedSeat.reserved.includes(box) ? (
                    <X className="w-4 h-4" />
                  ) : (
                    box
                  )}
                </div>
              </button>
            );
          })}
      </div>

      <Button
        type="submit"
        className="w-full mt-3"
        onClick={(e) => handleCheckout(e)}
        disabled={loading}
      >
        {loading ? (
          <Loading />
        ) : (
          <p>
            Checkout
            {selectedSeat.filter(
              (seat) => !reservedSeat?.reserved.includes(seat)
            ).length !== 0 &&
              " - " +
                (movie.ticket_price as number) *
                  selectedSeat.filter(
                    (seat) => !reservedSeat?.reserved.includes(seat)
                  ).length}
          </p>
        )}
      </Button>

      <div className="mt-4 space-y-2">
        <div className="flex gap-2 items-center">
          <div className="relative w-6 h-6 rounded-md bg-neutral-200 inline-block" />
          <p className="text-sm font-semibold">Non-reserved seat</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="relative w-6 h-6 rounded-md bg-indigo-400 inline-block" />
          <p className="text-sm font-semibold">Selected seat</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="relative w-6 h-6 rounded-md bg-stone-700 inline-block" />
          <p className="text-sm font-semibold">Reserved seat</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
