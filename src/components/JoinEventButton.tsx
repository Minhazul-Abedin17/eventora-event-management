
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { Users, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";

const JoinEventButton = ({ event }: { event: any }) => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [isJoined, setIsJoined] = useState(false);

  const eventId = String(event?._id || event?.id || "");

  // Check if user already joined this event
  useEffect(() => {
    const checkBooking = async () => {
      if (isPending) return;

      if (!user?.email || !eventId) {
        setChecking(false);
        return;
      }

      setChecking(true);

      try {
        const token = await getTokenFromClient();

        if (!token) {
          setChecking(false);
          return;
        }

        const res = await fetch(
          `http://localhost:8000/my-booking/check?email=${user.email}&eventId=${eventId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        );

        const result = await res.json();

        if (!res.ok) {
          throw new Error("Could not check booking.");
        }

        setIsJoined(result.alreadyJoined);
      } catch (error) {
        toast.error("Could not check booking status.");
      } finally {
        setChecking(false);
      }
    };

    checkBooking();
  }, [user?.email, isPending, eventId]);

  // Join event
  const handleJoin = async () => {
    if (!user) {
      toast.error("Please sign in to join this event.");
      return;
    }

    if (isJoined || loading || !eventId) return;

    try {
      setLoading(true);

      const token = await getTokenFromClient();

      if (!token) {
        toast.error("Please login first.");
        return;
      }

      const joinData = {
        eventId,
        eventName: event.eventName,
        eventDate: event.eventDate,
        eventTime: event.eventTime,
        location: event.location,
        category: event.category,
        imageUrl: event.imageUrl,
        username: user.name,
        email: user.email,
        image: user.image || "",
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/my-booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(joinData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to join event.");
      }

      setIsJoined(true);
      toast.success("Successfully joined the event!");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  const disabled = checking || loading || isJoined || isPending;

  return (
    <button
      type="button"
      onClick={handleJoin}
      disabled={disabled}
      className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-80 ${
        isJoined
          ? "bg-green-600"
          : "bg-violet-600 shadow-violet-200 hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-lg"
      }`}
    >
      {checking || loading || isPending ? (
        <>
          <Loader2 size={19} className="animate-spin" />
          {loading ? "Joining Event..." : "Checking..."}
        </>
      ) : isJoined ? (
        <>
          <CheckCircle2 size={19} />
          Joined Successfully
        </>
      ) : (
        <>
          <Users size={19} />
          Join This Event
        </>
      )}
    </button>
  );
};

export default JoinEventButton;
