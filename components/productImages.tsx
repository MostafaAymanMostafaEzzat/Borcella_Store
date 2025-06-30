'use client';

import { useState } from "react";



export const ProductImages = (product:ProductType) => {

    const [currentimage, setCurrentImage] = useState(product.media[0]);
  return (
        <div className="flex flex-col  justify-center gap-5 col-span-4">
          <img
            className="w-11/12 h-96 object-cover shadow-lg rounded-lg "
            src={currentimage}
            alt="Product Image"
          />
          <div>
            {product.media.length > 0 && (
              <div className="flex gap-4 overflow-x-auto">

                {product.media.map((image: string, index: number) => (
                  <img
                    key={index}
                    className={`w-24 h-24 object-cover rounded-2xl cursor-pointer ${currentimage === image ? 'border-2 border-blue-500' : ''}`}
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    onClick={() => {
                        setCurrentImage(image);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
  );
}