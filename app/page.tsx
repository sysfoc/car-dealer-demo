import HeroBanner from "@/app/components/home/HeroBanner";
import ProjectTemplates from "@/app/components/home/ProjectTemplates";
import Features from "@/app/components/home/Features";
import Services from "@/app/components/home/Services";
import Advertisement from "@/app/components/home/Advertisement";
export default function Home() {
  return (
    <main>
      <HeroBanner />
      <ProjectTemplates />
      <Features />
      <Services />
      <Advertisement />
    </main>
  );
}
