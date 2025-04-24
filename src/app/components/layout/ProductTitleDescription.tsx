import { Badge } from 'lucide-react'
import React from 'react'

import { Product } from '@/types/product'

const ProductTitleDescription = ({ product }: { product: Product }) => {
    return (
        <>{product.tags.map((tag, index) => (
            <Badge
                key={index}
                className="h-4 font-normal p-2 opacity-50 text-[10px] mr-1 rounded-full"
            >
                {tag}
            </Badge>
        ))}
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
        </>
    )
}

export default ProductTitleDescription