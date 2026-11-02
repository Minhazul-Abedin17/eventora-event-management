import { Camera } from "lucide-react";

const galleryImages = [
  {
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800",
    title: "Community Volunteering",
    category: "Community Service",
  },
  {
    image:
      "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800",
    title: "Helping Hands",
    category: "Charity & Donation",
  },
  {
    image:
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800",
    title: "Education for Everyone",
    category: "Education",
  },
  {
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800",
    title: "Together We Celebrate",
    category: "Social Events",
  },
  {
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800",
    title: "Making a Difference",
    category: "Community Service",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800",
    title: "Building Connections",
    category: "Community Events",
  },
];

const GallerySection = () => {
  return (
    <section className="bg-white px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
            <Camera size={16} />
            Our Memories
          </span>

          <h2 className="mt-5 text-3xl font-bold text-gray-900 sm:text-4xl">
            Moments That <span className="text-violet-600">Matter</span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
            A glimpse of the wonderful moments, kindness and connections
            created through community events.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((item, index) => (
            <div
              key={index}
              className="group relative h-64 overflow-hidden rounded-2xl bg-violet-100 sm:h-72"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 p-5 text-white">
                <p className="text-xs font-medium text-violet-200">
                  {item.category}
                </p>
                <h3 className="mt-2 text-xl font-bold">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;