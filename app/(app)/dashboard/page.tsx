import SettingsContainer from "@/components/dashboard/settings-container";
import OrderContainer from "@/components/dashboard/order-container";
import { getCurrentUser, getOrderHistory } from "@/lib/actions/user";

async function DashboardPage() {
  const user = await getCurrentUser();
  const orderHistory = await getOrderHistory(user?.id as number);

  return (
    <div className="grid sm:grid-cols-4 gap-6 px-4 max-w-[1280px] grid-cols-none">
      <div className="sm:col-span-1">
        <SettingsContainer user={user} />
      </div>
      <div className="col-span-3">
        <OrderContainer orderHistory={orderHistory} />
      </div>
    </div>
  );
}

export default DashboardPage;
