import ClosestEvent from "@/components/landing/closest";
import Swiper from "@/components/landing/swiper";
import ByLocationEvent from "@/components/landing/byLocation";
import BuyTicket from "@/components/landing/buyTicket";
import CallActionMarquee from "@/components/landing/ctaMarquee";

export default function Home() {
  return (
    <div>
      <CallActionMarquee />
      <Swiper />
      <ClosestEvent />
      <ByLocationEvent />
      <BuyTicket />
    </div>
  );
}
