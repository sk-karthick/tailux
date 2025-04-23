import { Star } from 'lucide-react';
import React, { useState } from 'react'

import { Product, Review } from '@/types/product';

interface productProps {
  product: Product
}

const Reviews = (props: productProps) => {
  const { product } = props;
  const [expandedReviews, setExpandedReviews] = useState<Record<number, boolean>>({});

  const toggleReviewExpansion = (id: number) => {
    setExpandedReviews(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="mt-12 border-t pt-8">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

        <div className="flex items-center gap-8 mb-8">
          <div className="text-center">
            <div className="text-5xl font-bold">{product.rating.toFixed(1)}</div>
            <div className="flex justify-center mt-1">
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
            <div className="text-sm text-gray-500 mt-1">
              {product.reviews.length} {product.reviews.length === 1 ? 'review' : 'reviews'}
            </div>
          </div>

          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = product.reviews.filter(r => Math.floor(r.rating) === stars).length;
              const percentage = (count / product.reviews.length) * 100;

              return (
                <div key={stars} className="flex items-center gap-2 mb-2">
                  <div className="w-8 text-sm">{stars} star</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-yellow-400 h-2.5 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="w-8 text-sm text-right">{count}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          {product.reviews.map((review, index) => (
            <div key={index} className="border-b pb-6 last:border-b-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{review.reviewerName}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                            }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                {review.reviewerEmail && (
                  <span className="text-xs text-gray-500">{review.reviewerEmail}</span>
                )}
              </div>

              <p className={`mt-3 ${!expandedReviews[index] && 'line-clamp-3'}`}>
                {review.comment}
              </p>

              {review.comment.length > 200 && (
                <button
                  onClick={() => toggleReviewExpansion(index)}
                  className="text-sm text-[#390007] hover:underline mt-1"
                >
                  {expandedReviews[index] ? 'Show less' : 'Read more'}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* {product.reviews.length > 5 && (
                                <div className="flex justify-center mt-8">
                                    <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
                                        Load More Reviews
                                    </button>
                                </div>
                            )} */}
      </div>
    </section>
  )
}

export default Reviews