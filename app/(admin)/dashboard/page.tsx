import OverviewSection from "@/app/(admin)/components/dashboard/Overview";
import ChartsSection from "@/app/(admin)/components/dashboard/Charts";
import OrdersSection from "@/app/(admin)/components/dashboard/OrdersTable";
import GeoChartSection from "@/app/(admin)/components/dashboard/Statistics";
export default function Dashboard() {
  return (
    <main>
      {/* <OverviewSection />
      <ChartsSection /> */}
      <OrdersSection />
      {/* <GeoChartSection /> */}
    </main>
  );
}
