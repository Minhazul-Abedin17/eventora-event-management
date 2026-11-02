import {
  CalendarDays,
  Users,
  HeartHandshake,
  ShieldCheck,
  MapPin,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: CalendarDays,
    title: "Easy Event Creation",
    description:
      "Create and manage your events easily with simple event management tools.",
  },
  {
    icon: Users,
    title: "Community Connection",
    description:
      "Connect with people who share your interests and bring communities together.",
  },
  {
    icon: HeartHandshake,
    title: "Meaningful Participation",
    description:
      "Join charity programs, social activities and community service events.",
  },
  {
    icon: ShieldCheck,
    title: "Manage Your Events",
    description:
      "Keep track of your created events and bookings from one place.",
  },
  {
    icon: MapPin,
    title: "Discover Events",
    description:
      "Explore different events and find activities happening around you.",
  },
  {
    icon: Sparkles,
    title: "Create Memories",
    description:
      "Turn your ideas into memorable experiences with Eventora.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-white px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
            Why Choose Eventora?
          </span>

          <h2 className="mt-5 text-3xl font-bold text-gray-900 sm:text-4xl">
            Everything You Need to
            <span className="text-violet-600"> Manage Events</span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
            Discover simple and powerful features that make planning,
            organizing and joining events easier.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group rounded-2xl border border-violet-100 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-100"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-violet-100 text-violet-600 transition group-hover:bg-violet-600 group-hover:text-white">
                  <Icon size={27} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;