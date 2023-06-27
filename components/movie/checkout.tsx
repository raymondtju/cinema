"use client";

import { revalPath } from "@/lib/revalidate";
import { Movies, Seat } from "@prisma/client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

const Checkout = ({
  movie,
  reservedSeat,
}: {
  movie: Movies;
  reservedSeat: Seat | { reserved: number[] } | null;
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
      toast.error(json?.message);
    } else {
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

      <Button
        type="submit"
        className="w-full mt-3"
        onClick={(e) => handleCheckout(e)}
      >
        Checkout -{" "}
        {(movie.ticket_price as number) *
          selectedSeat.filter((seat) => !reservedSeat?.reserved.includes(seat))
            .length}
      </Button>
    </div>
  );
};

export default Checkout;
