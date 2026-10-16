import { Footer } from "@/components/layout/footer/Footer";
import { Header } from "@/components/layout/header/Header";
import { AboutSection } from "@/components/sections/about/AboutSection";
import { ClubSection } from "@/components/sections/club/ClubSection";
import { EventsSection } from "@/components/sections/events/EventsSection";
import { GallerySection } from "@/components/sections/gallery/GallerySection";
import { Hero } from "@/components/sections/hero/Hero";
import { LocationSection } from "@/components/sections/location/LocationSection";
import { MenuSection } from "@/components/sections/menu/MenuSection";
import { ReservationSection } from "@/components/sections/reservations/ReservationSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <MenuSection />
        <AboutSection />
        <GallerySection />
        <EventsSection />
        <ReservationSection />
        <LocationSection />
        <ClubSection />
      </main>
      <Footer />
    </>
  );
}
