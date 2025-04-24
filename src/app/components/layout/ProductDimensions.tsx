import { Box } from 'lucide-react'
import React from 'react'

interface Dimensions {
  depth: number;
  width: number;
  height: number;
}

const ProductDimensions: React.FC<{ dimensions: Dimensions }> = ({ dimensions }) => {
  return (
      <div className="border rounded-lg p-4 bg-white shadow-sm mt-6">
          <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium flex items-center gap-2">
                  <Box className="h-4 w-4 text-primary" />
                  Dimensions
              </h3>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">L x W x H</span>
          </div>

          <div className="flex items-center justify-around">
              <div className="text-center">
                  <p className="text-2xl font-light">{dimensions.depth}</p>
                  <p className="text-xs text-muted-foreground mt-1">Length</p>
              </div>
              <div className="text-center px-4">
                  <p className="text-2xl font-light">{dimensions.width}</p>
                  <p className="text-xs text-muted-foreground mt-1">Width</p>
              </div>
              <div className="text-center">
                  <p className="text-2xl font-light">{dimensions.height}</p>
                  <p className="text-xs text-muted-foreground mt-1">Height</p>
              </div>
          </div>
      </div>
  )
}

export default ProductDimensions