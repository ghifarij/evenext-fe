import ClosestEvent from "@/components/landing/closest";
import Swiper from "@/components/landing/swiper";
import CallAction from "@/components/cta";
import ByLocationEvent from "@/components/landing/byLocation";
import BuyTicket from "@/components/landing/buyTicket";

export default function Home() {
  return (
    <div>
      <CallAction />
      <Swiper />
      <ClosestEvent />
      <ByLocationEvent />
      <BuyTicket />
    </div>
  );
}
