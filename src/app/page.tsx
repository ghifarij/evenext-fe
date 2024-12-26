import ClosestEvent from "@/components/landing/closest";
import Swiper from "@/components/landing/swiper";
import ByLocationEvent from "@/components/landing/byLocation";
import BuyTicket from "@/components/landing/buyTicket";
<<<<<<< HEAD
=======
import CallActionMarquee from "@/components/landing/ctaMarquee";
>>>>>>> 5b5712d72f59f276cd759e09e45227282d21d903

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
