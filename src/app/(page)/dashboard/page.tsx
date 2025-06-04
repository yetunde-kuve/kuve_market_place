import BuyerDashboardLayout from "@/layouts/buyerLayout/BuyerDashboard.wrapper";
import React from "react";
import RecentOrdersTable from "./components/buyercomponent/table.component";
import BuyerDashboardHomeBanner from "./components/buyercomponent/homeBanner.component";

const Page = () => {
  return (
    <BuyerDashboardLayout>
      <div className="space-y-4">
        <div>Buyer Dashboard</div>
        <BuyerDashboardHomeBanner />
        <RecentOrdersTable />
      </div>
    </BuyerDashboardLayout>
  );
};

export default Page;
