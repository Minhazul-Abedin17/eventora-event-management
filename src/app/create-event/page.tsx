"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  Image as ImageIcon,
  Users,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const CreateEventPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    eventName: "",
    category: "",
    imageUrl: "",
    eventDate: "",
    eventTime: "",
    location: "",
    seats: "",
    description: "",
  });

  useEffect(() => {
    const date = new Date();

    const today = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");

    const dateInput = document.getElementById(
      "eventDate"
    ) as HTMLInputElement | null;

    if (dateInput) {
      dateInput.min = today;
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending || isSubmitting) return;
    if (!user?.email) {
      toast.error("Please login before creating an event.");
      return;
    }
    setIsSubmitting(true);
    try {
      // Get JWT Token from Better Auth
      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        console.error("JWT Token Error:", error);
        toast.error("Authentication failed. Please login again.");
        return;
      }

      const eventData = {
        ...form,
        seats: Number(form.seats),
        email: user.email,
        organizer: {
          name: user.name,
          email: user.email,
          image: user.image,
        },
      };

      // Send Event Data to Backend
      const res = await fetch("http://localhost:8000/create-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data?.token}`,
        },
        body: JSON.stringify(eventData),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("Backend Error:", result);
        toast.error(result.message || "Event creation failed!");
        return;
      }

      if (result.acknowledged) {
        toast.success("Your event has been created successfully!");

        setForm({
          eventName: "",
          category: "",
          imageUrl: "",
          eventDate: "",
          eventTime: "",
          location: "",
          seats: "",
          description: "",
        });
      } else {
        toast.error("Event creation failed! Please try again.");
      }
    } catch (error) {
      console.error("Create Event Error:", error);
      toast.error("Server error! Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-violet-600">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Please Login First
        </h2>
        <p className="mt-2 text-gray-500">
          You need to login before creating an event.
        </p>
        <Link
          href="/login"
          className="mt-5 rounded-lg bg-violet-600 px-6 py-3 font-semibold text-white"
        >
          Login Now
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Create Your <span className="text-violet-600">Event</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
            Bring your ideas to life. Share your event with the community and
            make a positive difference.
          </p>
        </div>

        <Card className="overflow-hidden rounded-2xl border-violet-100 bg-white shadow-xl shadow-violet-100/50">
          <CardHeader className="border-b border-violet-100 bg-violet-50/70 px-5 py-6 sm:px-8">
            <CardTitle className="text-xl font-bold text-gray-900">
              Event Information
            </CardTitle>
            <CardDescription>
              Fill in the details below to create your event.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-5 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="eventName">Event Name *</Label>
                  <Input
                    id="eventName"
                    name="eventName"
                    value={form.eventName}
                    onChange={handleChange}
                    placeholder="e.g. Winter Clothes Distribution"
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Event Category *</Label>
                  <select
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    <option value="Charity & Donation">
                      Charity & Donation
                    </option>
                    <option value="Community Service">Community Service</option>
                    <option value="Education">Education</option>
                    <option value="Social Events">Social Events</option>
                    <option value="Sports">Sports</option>
                    <option value="Cultural Events">Cultural Events</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Event Image URL *</Label>
                <div className="relative">
                  <ImageIcon
                    size={18}
                    className="absolute left-3 top-3 text-gray-400"
                  />
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    type="url"
                    value={form.imageUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/event-image.jpg"
                    required
                    className="h-11 pl-10"
                  />
                </div>
                <p className="text-xs text-gray-400">
                  Paste an image URL for your event cover.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="eventDate">Event Date *</Label>
                  <div className="relative">
                    <CalendarDays
                      size={18}
                      className="absolute left-3 top-3 text-gray-400"
                    />
                    <Input
                      id="eventDate"
                      name="eventDate"
                      type="date"
                      min={new Date().toLocaleDateString("en-CA")}
                      value={form.eventDate}
                      onChange={handleChange}
                      required
                      className="h-11 pl-10"
                    />
                  </div>
                  <p className="text-xs text-gray-400">
                    Select today or any future date.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventTime">Event Time *</Label>
                  <div className="relative">
                    <Clock
                      size={18}
                      className="absolute left-3 top-3 text-gray-400"
                    />
                    <Input
                      id="eventTime"
                      name="eventTime"
                      type="time"
                      value={form.eventTime}
                      onChange={handleChange}
                      required
                      className="h-11 pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="location">Event Location *</Label>
                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-3 top-3 text-gray-400"
                    />
                    <Input
                      id="location"
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      placeholder="e.g. Chattogram, Bangladesh"
                      required
                      className="h-11 pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seats">Available Seats *</Label>
                  <div className="relative">
                    <Users
                      size={18}
                      className="absolute left-3 top-3 text-gray-400"
                    />
                    <Input
                      id="seats"
                      name="seats"
                      type="number"
                      min="1"
                      value={form.seats}
                      onChange={handleChange}
                      placeholder="e.g. 100"
                      required
                      className="h-11 pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Event Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe your event, its purpose, activities and how people can participate..."
                  required
                  className="min-h-22 resize-y"
                />
                <p className="text-center text-xs text-gray-400">
                  Please fill out the form above accurately by providing all
                  your correct information.
                </p>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-between">
                <Link
                  href="/"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-input px-5 text-sm font-medium transition hover:bg-violet-50"
                >
                  <ArrowLeft size={17} />
                  Back to Home
                </Link>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-11 rounded-lg bg-violet-600 px-8 font-semibold text-white hover:bg-violet-700"
                >
                  <CalendarDays size={18} />
                  {isSubmitting ? "Creating Event..." : "Create Event"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-gray-400 sm:text-sm">
          Every great event starts with an idea. Make yours happen with
          Eventora.
        </p>
      </div>
    </main>
  );
};

export default CreateEventPage;
