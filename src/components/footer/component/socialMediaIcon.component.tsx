import { ReactNode } from "react";

type socialMedialFootericonprops = {
  href?: string;
  icon: ReactNode;
};
export default function SocialMedialFooterIcon({
  icon,
  href,
}: socialMedialFootericonprops) {
  return (
    <button
      onClick={() => {
        if (href) {
          window.open(href, "_blank");
        }
      }}
      className="h-[28px] hover:bg-primary hover:text-text text-text text-[12px] w-[28px] rounded-full bg-white flex justify-center items-center"
    >
      {icon}
    </button>
  );
}
