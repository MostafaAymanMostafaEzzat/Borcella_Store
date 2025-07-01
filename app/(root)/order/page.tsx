import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import Image from "next/image";

export default async function OrderPage() {
  const { userId } = await auth();

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/customers/${userId}`
  );
  const Orders = res.data;
  console.log("Orders", Orders[0]);
  return (
    <div className="flex flex-col p-10 mb-7 gap-5  ">
      <h1 className="text-2xl ">Your Orders :</h1>
      <div className="flex flex-col items-start gap-4 ">
        {Orders.map((order: any) => (
          <div key={order._id} className="border border-blue-400/35 p-4 rounded-lg w-full">
            <div className="flex justify-start items-center gap-8 mb-4">
              <h2 className="font-semibold text-lg">Order ID: {order._id}</h2>
              <p className="font-semibold text-lg">Total Amount: ${order.totalAmount}</p>
            </div>
            <ul className="list-disc pl-5 ">
              {order.products.map((item: any) => (
                <li key={item.product._id} className="flex gap-4 p-6 hover:bg-gray-50 hover:rounded-2xl items-center max-h-36">
                    <Image
                      src={item.product.media[0]}
                      alt={item.product.title}
                      width={100}
                      height={100}
                      className="mr-2"
                    />
                    <div className="flex flex-col gap-2 ">
                        <p>Title: <span className="font-semibold">{item.product.title}</span></p>
                        <p>Unit price: <span className="font-semibold">{item.product.price}</span></p>
                        <p>Quantity: <span className="font-semibold"> {item.quantity} </span></p>
                    </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
