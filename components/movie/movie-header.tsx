"use client";

import { StepBackIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const MovieHeader = () => {
  const router = useRouter();
  return (
    <div>
      <button onClick={() => router.back()} className="flex gap-2 items-center">
        <StepBackIcon className="w-4 h-4" />
        <span>Back</span>
      </button>
    </div>
  );
};

export default MovieHeader;
