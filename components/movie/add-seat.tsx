"use client";

import { revalPath } from "@/lib/revalidate";
import { Seat } from "@prisma/client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AddSeat = ({
  movie_id,
  reservedSeat,
}: {
  movie_id: number;
  reservedSeat: Seat | null;
}) => {
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
    } else if (selectedSeat.length > 5) {
      console.log("huhu");
    } else {
      setSelectedSeat([...selectedSeat, id]);
    }
  }

  async function handleCheckout(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    toast.promise(
      fetch("/api/movie/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movie_id,
          seat: selectedSeat.filter(
            (seat) => !reservedSeat?.reserved.includes(seat)
          ),
        }),
      }),
      {
        loading: "Loading...",
        success: () => {
          revalPath("/movie" + movie_id);
          return "Seat reserved";
        },
        error: (error) => error,
      }
    );
  }

  return (
    <div>
      <div className="grid grid-cols-8 gap-1.5 w-fit">
        {reservedSeat &&
          num.map((box) => {
            return (
              <button
                className={clsx(
                  "w-6 h-6 rounded-md bg-neutral-200 inline-block hover:bg-purple-400 duration-200",
                  selectedSeat.includes(box) && "bg-purple-400",
                  reservedSeat.reserved.includes(box) && "cursor-not-allowed"
                )}
                key={box}
                onClick={(e) => handleClick(e, box)}
                disabled={reservedSeat.reserved.includes(box) && true}
              />
            );
          })}
      </div>

      <button
        type="submit"
        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-purple-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={(e) => handleCheckout(e)}
      >
        Checkout
      </button>
    </div>
  );
};

export default AddSeat;
