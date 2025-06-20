import OrdersSection from "@/app/(admin)/components/dashboard/OrdersTable";
export const metadata = {
  title: "Admin Dashboard – Website and User Management",
  description:
    "Admin panel for managing users, plans, site configurations, and analytics. Control your platform with ease.",
};
export default function Dashboard() {
  return (
    <main>
      <OrdersSection />
    </main>
  );
}
