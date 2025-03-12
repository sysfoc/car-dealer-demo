import OverviewSection from "@/app/(admin)/components/invoices/Overview";
import DatatableSection from "@/app/(admin)/components/invoices/Datatable";
export default function Invoices() {
  return (
    <main>
      <OverviewSection />
      <DatatableSection />
    </main>
  );
}
