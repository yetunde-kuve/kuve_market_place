import Image from "next/image";
import Sneakers from "../../../../../public/svg/sneaker.svg";
import { useWishlistStore } from "@/features/wishList/store/wishlistStore";
import { useWishlistModal } from "@/features/wishList/store/wishListModal.store";
import { useAuth } from "@/context/auth.context";
import { useRouter } from "next/navigation";
export default function SearchProductCard() {
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const openModal = useWishlistModal((state) => state.openModal);
  const { login, isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const handleAddToWishlist = () => {
    const item = {
      id: "1234",
      name: "Sneakers",
      image: Sneakers,
      price: 1500,
    };
    addToWishlist(item);
  };
  return (
    <div className="w-full max-w-sm md:p-[15px] p-[9px] mx-auto bg-white rounded-2xl">
      {/* Image Section */}
      <div className="relative w-full overflow-hidden h-52 rounded-xl">
        <Image
          src={Sneakers} // Replace with actual image path
          alt="Ladies Nike Sneakers"
          layout="fill"
          objectFit="cover"
        />

        {/* Verified Badge */}
        <div className="absolute top-2 left-2 md:text-[16px] text-[8px] bg-white flex items-center gap-1 px-2 py-1 rounded-full  font-medium text-[#F85E9F] shadow">
          <i className="ri-verified-badge-fill text-primary"></i>
          <p className="md:text-[14px] text-[8px] text-[#111928] font-[500]"> Verified</p>
        </div>

        {/* Like Icon */}
        <button
          onClick={() => {
            if (isLoggedIn) {
              openModal({
                id: "1234",
                name: "Sneakers",
                image: Sneakers,
                price: 1500,
              });
            } else {
              router.push("/auth/login");
            }
          }}
          className="absolute md:h-[34px] md:w-[34px] h-[21px] w-[21px] text-[8px] md:text-[16px]  flex justify-center items-center p-1 bg-white rounded-full shadow top-2 right-2"
        >
          <i className="ri-heart-3-line"></i>
        </button>
      </div>

      {/* Details Section */}
      <div className="mt-4 space-y-1">
        <div className="flex items-center justify-between">
          <p className="md:text-[16px] text-[10px] font-bold text-black">₦150,000.00</p>
          <span className="inline-block  bg-[#E6F6FB] text-[#212844] md:text-[13px] text-[8px] font-[300] px-[6px] py-[4px] md:px-[10px] md:py-[6px] rounded-full">
            Used
          </span>
        </div>

        <p className="md:text-[14px] text-[10px] text-gray-600">Ladies Nike Sneakers</p>

        {/* Condition Tag */}
      </div>
    </div>
  );
}
