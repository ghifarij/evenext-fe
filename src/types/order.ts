export interface IOrder {
  expiredAt: string;
  coupon: boolean;
  point: number;
  total_price: number;
  final_price: number;
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
