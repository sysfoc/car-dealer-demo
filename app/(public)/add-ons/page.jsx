import HeroSection from "@/app/components/add-ons/HeroSection";
import Addons from "@/app/components/add-ons/AddOns";
import Form from "@/app/components/add-ons/Form";

export const metadata = {
  title: "Add-Ons to Grow Your Dealership Website",
  description:
    "Supercharge your site with our optional add-ons like SEO, digital marketing, and inventory tools. Customize your platform with ease.",
};
export default function AddOns() {
  return (
    <main>
      <HeroSection />
      <Addons />
      <Form />
    </main>
  );
}
