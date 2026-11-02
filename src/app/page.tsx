import Banner from "@/components/ui/shared/Banner";
import FeaturesSection from "@/components/ui/shared/FeaturesSection";
import RecentUpcomingEvents from "@/components/ui/shared/RecentUpcomingEvents";
import GallerySection from "@/components/ui/shared/GallerySection";
import NewsletterSection from "@/components/ui/shared/NewsletterSection";

export default function Home() {
  return (
    <main>
      <Banner />
      <FeaturesSection />
      <RecentUpcomingEvents />
      <GallerySection />
      <NewsletterSection />
    </main>
  );
}