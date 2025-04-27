"use client";
import Image from "next/image";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Reviews from "./Reviews";
import ProductDescription from "./ProductDescription";
import ProductDimensions from "./ProductDimensions";
import StarReview from "./StarReview";
import CheckStockPolicies from "./CheckStockPolicies";
import ProductTitleDescription from "./ProductTitleDescription";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed";
import useAddToCart from "../hooks/useAddToCart";
import { Loader2 } from "lucide-react";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  useRecentlyViewed(product);
  const [currentImage, setCurrentImage] = useState(product.images[0]);
  const [imageError, setImageError] = useState(false);

  if (!product) return <div>Product not found</div>;

  const { addToCart, isLoading } = useAddToCart();



  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-6">
      <div>
        <div className="space-y-4 flex flex-row-reverse">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            {imageError ? (
              <div className="w-full h-96 bg-gray-100 rounded-xl flex items-center justify-center">
                <span className="text-gray-500">Image not available</span>
              </div>
            ) : (
              <Image
                src={currentImage}
                alt={product.title}
                width={400}
                height={400}
                className="object-contain w-full h-auto rounded-xl"
                onError={() => setImageError(true)}
                priority
              />
            )}
          </div>

          <div className="flex gap-2 flex-col overflow-y-auto py-2 flex-shrink-0 h-[50dvh]">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentImage(image);
                  setImageError(false);
                }}
                className={`flex-shrink-0 w-30 h-30 rounded-md overflow-hidden border-2 ${currentImage === image ? 'border-[#390007]' : 'border-transparent'
                  }`}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                  src={image}
                  alt=""
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-5">
          {product.stock > 0 ? (
            <>
              <Button
                disabled={isLoading}
                className={`w-full py-7 px-6 rounded-lg font-bold text-lg transition-colors ${isLoading ? 'bg-[#390007] text-white' : 'bg-green-600 text-white hover:bg-green-700'}`}
                aria-label="Add to cart"
                onClick={() => addToCart(product)}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin w-6 h-6" />
                ) : (
                  "Added to Cart"
                )}
              </Button>
              <Button className="w-full border border-[#390007] text-white py-7 px-6 rounded-lg text-lg font-bold transition-colors">
                Buy Now
              </Button>
            </>
          ) : (
            <Button className="w-full bg-[#390007] text-white py-7 text-xl px-6 rounded-lg hover:bg-[#4f0012] transition-colors">
              Out of stock
            </Button>
          )
          }
        </div>
      </div>

      <div className="flex flex-col justify-between max-h-[92dvh] overflow-y-auto pr-3">
        <div>
          <ProductTitleDescription product={product} />
          <StarReview product={product} />
          <CheckStockPolicies product={product} />
          <ProductDimensions dimensions={product.dimensions} />
          <ProductDescription description={product.description} />
          <Reviews product={product} />
        </div>
      </div>
    </div>
  );
}