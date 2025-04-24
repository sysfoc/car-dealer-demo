import OverviewSection from "@/app/(user)/components/dashboard/Overview";
import ChartsSection from "@/app/(user)/components/dashboard/Charts";
import AdminButton from "@/app/(user)/components/dashboard/AdminButton";
export default function UserDashboard() {
  return (
    <main>
      <AdminButton/>
      <OverviewSection />
      <ChartsSection />
    </main>
  );
}
