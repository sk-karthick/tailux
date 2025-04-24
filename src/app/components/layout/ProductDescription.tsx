import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react'

interface ProductDescriptionProps {
    description: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ description }) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const previewLength: number = 150;
    const descriptionText: string = description || '';

    return (
        <div className="border rounded-lg overflow-hidden transition-all duration-200 mt-6">
            <button
                className="w-full flex justify-between items-start p-4 hover:bg-gray-50 transition-colors"
                onClick={() => setExpanded(!expanded)}
            >
                <div className="text-left relative w-full">
                    <h3 className="font-medium mb-1 ">Product Details</h3>
                    <div className="relative ">
                        <p className={`text-sm text-gray-600 transition-all duration-200 ${!expanded ? 'line-clamp-3' : ''}`}>
                            {descriptionText}
                        </p>
                        {!expanded && descriptionText.length > previewLength && (
                            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none" />
                        )}
                    </div>
                </div>
                {descriptionText.length > previewLength && (
                    expanded ? <ChevronUp className="h-5 w-5 ml-2 flex-shrink-0 mt-1" />
                        : <ChevronDown className="h-5 w-5 ml-2 flex-shrink-0 mt-1" />
                )}
            </button>

            {expanded && descriptionText.length > previewLength && (
                <div className="px-4 pb-4 -mt-2 text-sm text-gray-700">
                    <p>{descriptionText}{descriptionText}</p>
                    <p>{descriptionText}{descriptionText}</p>
                    <p>{descriptionText}{descriptionText}</p>
                    <p>{descriptionText}{descriptionText}</p>
                    <p>{descriptionText}{descriptionText}</p>
                    <p>{descriptionText}{descriptionText}</p>
                </div>
            )}
        </div>
    )
}

export default ProductDescription