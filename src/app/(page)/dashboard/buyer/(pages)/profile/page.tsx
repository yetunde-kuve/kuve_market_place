import BuyerDashboardLayout from "@/layouts/buyerLayout/BuyerDashboard.wrapper";
import ProfileSettings from "./component/profile.component";
import ProfileBanner from "./component/banner.component";

export default function BuyerProfile() {
  return (
    <BuyerDashboardLayout>
      <div className="space-y-4">
        <ProfileBanner />
        <ProfileSettings />
      </div>
    </BuyerDashboardLayout>
  );
}
