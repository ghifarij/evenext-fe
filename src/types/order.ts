export interface IOrder {
  expiredAt: string;
  coupon: boolean;
  point: number;
  totalPrice: number;
  finalPrice: number;
  Order_Details: IOrderDetail[];
}

interface IOrderDetail {
  qty: number;
  subtotal: number;
  ticket: {
    category: "Free" | "EarlyBird" | "Regular" | "VIP";
    price: number;
    event: {
      title: string;
      thumbnail: string;
      date: string;
      time: string;
      location: "Bandung" | "Jakarta" | "Surabaya" | "Bali";
      venue: string;
    };
  };
}
