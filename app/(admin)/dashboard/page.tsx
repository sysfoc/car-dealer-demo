import OverviewSection from '@/app/(admin)/components/dashboard/Overview'
import ChartsSection from '@/app/(admin)/components/dashboard/Charts'
export default function Dashboard() {
  return (
    <main>
      <OverviewSection />
      <ChartsSection />
    </main>
  );
}
