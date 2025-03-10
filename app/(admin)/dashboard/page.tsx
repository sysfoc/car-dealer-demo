import OverviewSection from '@/app/(admin)/components/dashboard/Overview'
import ChartsSection from '@/app/(admin)/components/dashboard/Charts'
import OrdersSection from '@/app/(admin)/components/dashboard/OrdersTable'
export default function Dashboard() {
  return (
    <main>
      <OverviewSection />
      <ChartsSection />
      <OrdersSection />
    </main>
  );
}
