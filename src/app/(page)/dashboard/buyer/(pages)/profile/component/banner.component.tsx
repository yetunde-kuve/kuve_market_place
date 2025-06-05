import Image from "next/image";
import ProfileBannerimg from "../../../../../../../../public/svg/profile-banner.svg";

export default function ProfileBanner() {
  return (
    <div className="w-full h-[169px] relative rounded-[8px] overflow-hidden">
      <Image src={ProfileBannerimg} alt="profile banner" fill className="object-cover" priority />
    </div>
  );
}
