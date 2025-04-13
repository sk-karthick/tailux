// components/ProductDetails.tsx
"use client";
import Image from "next/image";
import { Star } from "lucide-react";
type ProductType = {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
};

interface Props {
    product: ProductType;
}

export default function ProductDetails({ product }: Props) {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-xl shadow-sm">
                <Image
                    src={product.image}
                    alt={product.title}
                    width={400}
                    height={400}
                    className="object-contain w-full h-96 rounded-xl"
                />
            </div>

            <div className="flex flex-col justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
                    <p className="text-gray-600 mb-4">{product.description}</p>

                    <div className="flex items-center mb-4">
                        <span className="text-xl font-semibold text-[#390007]">
                            ₹{(product.price * 83).toFixed(0)} {/* USD to INR */}
                        </span>
                        <span className="ml-4 text-sm text-gray-400 line-through">
                            ₹{(product.price * 83 * 1.2).toFixed(0)}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                        <Star className="w-5 h-5 text-yellow-400" />
                        <span className="text-sm">{product.rating?.rate} / 5</span>
                        <span className="text-xs text-gray-500">
                            ({product.rating?.count} reviews)
                        </span>
                    </div>
                </div>

                <button className="bg-[#390007] text-white py-2 px-6 rounded-lg mt-4 hover:bg-[#4f0012]">
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
