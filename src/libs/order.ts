import axios from "@/helpers/axios";

export async function getOrderDetail(orderId: string) {
  try {
    const res = await fetch(`http://localhost:8000/api/orders/${orderId}`);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log(data); 
    return data.result;
  } catch (err) {
    console.error("Error fetching order details:", err);
  }
}

export async function getSnapToken(
  total_price: number,
  final_price: number,
  order_id: number
) {
  try {
    const { data } = await axios.post(
      "/orders/payment",
      {
        order_id,
        total_price,
        gross_amount: final_price,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return data.result;
  } catch (err) {
    console.log(err);
  }
}

export async function getCoupon() {
  try {
    const { data } = await axios.get("/users/coupon", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return data.result;
  } catch (err) {
    console.log(err);
  }
}

export async function getPoints() {
  try {
    const { data } = await axios.get("/users/points", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return data.result || 0;
  } catch (err) {
    console.log(err);
  }
}
