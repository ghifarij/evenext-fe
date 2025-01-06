import CountDown from "@/components/order/countDown";
import PayButton from "@/components/order/payButton";
import { formatCurrency, formatDate, formatTime } from "@/helpers/formatDate";
import { getOrderDetail } from "@/libs/order";
import { IOrder } from "@/types/order";
import Image from "next/image";
import { FaTicketAlt, FaCalendarAlt, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

export default async function OrderPage({
  params,
}: {
  params: { orderId: string };
}) {
  const order: IOrder = await getOrderDetail(params.orderId);

  return (
    <main className="flex flex-col mx-auto max-w-[1200px] p-4 bg-gray-100 rounded-xl shadow mt-10 mb-20 py-10">
      <div className="tablet:w-[60%]">
        <h1 className="text-2xl font-semibold my-2 text-center">
          Detail Order
        </h1>
        <div className="rounded-md border p-3 tablet:mb-4">
          <div className="flex w-full py-4">
            <div className="flex gap-4 w-[50%]">
              <div className="w-60 h-32 rounded-md overflow-hidden relative">
                <Image
                  src={order.Order_Details[0].ticket.event.thumbnail}
                  alt={order.Order_Details[0].ticket.event.title}
                  fill
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-semibold line-clamp-1">
                  {order.Order_Details[0].ticket.event.title}
                </span>
                <span className="flex items-center gap-2 text-gray-500">
                  <FaCalendarAlt className="text-teal-500" />
                  {formatDate(order.Order_Details[0].ticket.event.date)}
                </span>
                <span className="flex items-center gap-2 text-gray-500">
                  <FaClock className="text-teal-500" />
                  {formatTime(order.Order_Details[0].ticket.event.time)}
                </span>
                <span className="line-clamp-1 flex items-center gap-2 text-gray-500">
                  <FaLocationDot className="text-teal-500" />
                  {order.Order_Details[0].ticket.event.venue},{" "}
                  {order.Order_Details[0].ticket.event.location}
                </span>
              </div>
            </div>
            <div className="flex flex-col w-[50%]">
              <table className="w-full">
                <thead>
                  <tr className="border-t border-b border-black/50">
                    <th className="py-2 text-start">Jenis Tiket</th>
                    <th className="text-end">Harga</th>
                    <th className="text-end">Jumlah</th>
                  </tr>
                </thead>
                <tbody>
                  {order.Order_Details.map((Order_Details, idx) => {
                    return (
                      <tr key={idx}>
                        <td className="text-start flex items-center gap-2">
                          <span>
                            <FaTicketAlt className="text-3xl font-bold text-teal-800 my-2" />
                          </span>
                          <span>{Order_Details.ticket.category}</span>
                        </td>
                        <td className="text-end">
                          {formatCurrency(Order_Details.ticket.price)}
                        </td>
                        <td className="text-end">x{Order_Details.qty}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="flex flex-col rounded-md shadow-xl py-6 px-4 tablet:w-[40%] gap-2 mt-6">
                <h1 className="text-xl font-semibold mb-2">Detail Pembelian</h1>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Harga</span>
                  <span>{formatCurrency(order.totalPrice)}</span>
                </div>
                <span className="text-gray-600">Point Digunakan : </span>
                {order.point && (
                  <div className="flex justify-between items-center">
                    <span>Points</span>
                    <span className="font-semibold text-red-500">
                      - {formatCurrency(order.point)}
                    </span>
                  </div>
                )}
                {order.coupon && (
                  <div className="flex justify-between items-center">
                    <span>Coupon</span>
                    <span className="font-semibold text-red-500">
                      - {formatCurrency((order.totalPrice - order.point) / 10)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center font-semibold text-xl border-t border-b py-2">
                  <span>Total Bayar</span>
                  <span>{formatCurrency(order.finalPrice)}</span>
                </div>
                <PayButton
                  point={order.point}
                  total_price={order.totalPrice}
                  final_price={order.finalPrice}
                  order_id={params.orderId}
                  category={order.Order_Details[0].ticket.category}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
