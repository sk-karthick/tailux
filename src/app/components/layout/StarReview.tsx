import React from 'react'
import { Product } from '@/types/product';
import { Star } from 'lucide-react';

interface StarReviewProps {
    product: Product;
}

const StarReview: React.FC<StarReviewProps> = ({ product }) => {
    const currentPrice = (product.price * 83).toFixed(0);
    const originalPrice = (product.price * 83 * 1.2).toFixed(0);
    return (
        <>
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
        </>
        )
}

export default StarReview