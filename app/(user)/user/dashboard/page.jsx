import OverviewSection from "@/app/(user)/components/dashboard/Overview";
import ChartsSection from "@/app/(user)/components/dashboard/Charts";
export const metadata = {
  title: "Dealer Dashboard – Manage Your Website Easily",
  description:
    "Access your personal dashboard to manage your car listings, website settings, and account information—all in one place.",
};
export default function UserDashboard() {
  return (
    <main>
      <OverviewSection />
      <ChartsSection />
    </main>
  );
}
