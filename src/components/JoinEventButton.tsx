"use client";

import { Users } from "lucide-react";
import { toast } from "react-toastify";

const JoinEventButton = () => {
  const handleJoin = () => {
    toast.info("Please sign in to join this event.");
  };

  return (
    <button
      onClick={handleJoin}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
    >
      <Users size={19} />
      Join This Event
    </button>
  );
};

export default JoinEventButton;