import axios from "axios";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import HeartIcon from "./HeartIcon";

export default async function Products({
  products,
  className,
}: {
  products: ProductType[];
  className?: string;
}) {
  return (
    <div className="m-20 pb-20 ">
      <div className={`flex gap-10 items-center justify-center flex-wrap ${className}`}>
        {products.map((product) => (
          <Link
            key={product._id}
            className="shadow-xl flex flex-col "
            href={`/product/${product._id}`}
          >
            <Image
              width={250}
              height={200}
              src={product.media[0]}
              alt="collection-image"
              className="max-h-36 object-cover" 
            />
            <div className="p-2">
              <h2 className="font-semibold text-lg">{product.title}</h2>
              <p className="text-slate-500">{product.category}</p>
              <div className="flex justify-between items-center">
                <div className="font-semibold text-lg">{`$${product.price}`}</div>
                <HeartIcon productId={product._id} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
