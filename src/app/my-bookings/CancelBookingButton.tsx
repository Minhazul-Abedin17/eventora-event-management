"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

type Props = {
  bookingId: string;
  userEmail: string;
};

const CancelBookingButton = ({ bookingId, userEmail }: Props) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    const token = await getTokenFromClient();

    if (!token) {
      toast.error("Please login first.");
      return;
    }

    setLoading(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/my-booking/${bookingId}?email=${userEmail}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {
      toast.success("Booking cancelled successfully!");
      window.location.reload();
    } else {
      toast.error("Failed to cancel booking.");
    }

    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="mt-3 inline-flex w-fit items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
      >
        <X size={16} />
        Cancel Booking
      </button>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
              <X size={28} />
            </div>

            <h2 className="mt-4 text-xl font-bold text-gray-900">
              Cancel Booking?
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Are you sure you want to cancel this booking?
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                disabled={loading}
                className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Keep Booking
              </button>

              <button
                onClick={handleCancel}
                disabled={loading}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 size={17} className="animate-spin" />
                ) : (
                  "Yes, Cancel"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CancelBookingButton;