import ClosestEvent from "@/components/landing/closest";
import Swiper from "@/components/landing/swiper";
import CallAction from "@/components/cta";
import ByLocationEvent from "@/components/landing/byLocation";

export default function Home() {
  return (
    <div>
      <CallAction />
      <Swiper />
      <ClosestEvent />
      <ByLocationEvent />
    </div>
  );
}
