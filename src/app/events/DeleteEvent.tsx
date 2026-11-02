
"use client";

import { useState } from "react";
import { Trash2, X } from "lucide-react";
import { toast } from "react-toastify";

type Props = {
  eventId: string;
  ownerEmail: string;
  onDelete: () => void;
};

const DeleteEvent = ({ eventId, ownerEmail, onDelete }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    const response = await fetch(
      `http://localhost:8000/all-events/${eventId}?email=${encodeURIComponent(ownerEmail)}`,
      { method: "DELETE" }
    );

    if (response.ok) {
      toast.success("Event deleted successfully!");
      setIsOpen(false);
      onDelete();
    } else {
      toast.error("Failed to delete event.");
    }

    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 px-3 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
      >
        <Trash2 size={16} />
        Delete Event
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Delete Event?
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <p className="mb-6 text-sm leading-6 text-gray-600">
              Are you sure you want to delete this event? This action cannot
              be undone.
            </p>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-700 disabled:opacity-60"
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteEvent;
