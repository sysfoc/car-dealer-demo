import OverviewSection from "@/app/(user)/components/dashboard/Overview";
import ChartsSection from "@/app/(user)/components/dashboard/Charts";
export default function UserDashboard() {
  return (
    <main>
      <OverviewSection />
      <ChartsSection />
    </main>
  );
}
