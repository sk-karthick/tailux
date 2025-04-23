"use client";
import Image from "next/image";
import { Star } from "lucide-react";
import { Product } from "@/types/product";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Reviews from "./Reviews";

interface ProductDetailsProps {
    product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const [currentImage, setCurrentImage] = useState(product.images[0]);
    const [imageError, setImageError] = useState(false);

    if (!product) return <div>Product not found</div>;

    // Calculate prices (moved outside JSX for cleaner code)
    const currentPrice = (product.price * 83).toFixed(0);
    const originalPrice = (product.price * 83 * 1.2).toFixed(0);



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
                                className="w-full bg-[#390007] text-white py-7 px-6 rounded-lg hover:bg-[#4f0012] font-bold text-lg transition-colors"
                                aria-label="Add to cart"

                            >
                                Add to Cart
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

            <div className="flex flex-col justify-between max-h-[92dvh] overflow-y-auto">
                <div>
                    <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
                    <p className="text-gray-600 mb-4">{product.description}</p>

                    <div className="flex items-center mb-4">
                        <span className="text-3xl font-semibold text-[#390007]">
                            ₹{currentPrice}
                        </span>
                        {product.discountPercentage > 0 && (
                            <>
                                <span className="ml-4 text-sm text-gray-400 line-through">
                                    ₹{originalPrice}
                                </span>
                                <span className="ml-2 text-sm bg-[#390007] text-white px-2 py-0.5 rounded">
                                    {product.discountPercentage}% OFF
                                </span>
                            </>
                        )}
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-5 h-5 ${i < Math.floor(product.rating)
                                        ? 'text-yellow-400 fill-yellow-400'
                                        : 'text-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-sm">
                            {product.rating.toFixed(1)} / 5
                        </span>
                        <span className="text-xs text-gray-500">
                            ({product.reviews?.length || 0} reviews)
                        </span>
                    </div>

                    <div className="space-y-2 text-sm mb-6">
                        {product.brand && (
                            <p>
                                <span className="font-medium">Brand:</span> {product.brand}
                            </p>
                        )}
                        {product.category && (
                            <p>
                                <span className="font-medium">Category:</span> {product.category}
                            </p>
                        )}
                        {product.stock && (
                            <p>
                                <span className="font-medium">Availability:</span> {product.stock > 0
                                    ? `${product.stock} in stock`
                                    : 'Out of stock'}
                            </p>
                        )}
                    </div>
                    
                    <Reviews product={product}  />
                </div>

                {/* Action Buttons */}

            </div>
        </div>
    );
}