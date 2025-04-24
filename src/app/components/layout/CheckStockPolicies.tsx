import { CheckCircle, RefreshCw, ShieldCheck, Truck } from 'lucide-react'
import React from 'react'
import { Product } from '@/types/product'


const CheckStockPolicies = ({ product }: { product: Product }) => {
  return (
      <div className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {product.returnPolicy && (
                  <div className="flex flex-col items-center text-center p-5 border rounded-lg hover:shadow-sm transition-all">
                      <RefreshCw className="h-6 w-6 text-primary mb-3" />
                      <h4 className="text-sm font-medium mb-2">Return Policy</h4>
                      <p className="text-sm text-muted-foreground">
                          {product.returnPolicy}
                      </p>
                  </div>
              )}

              {product.warrantyInformation && (
                  <div className="flex flex-col items-center text-center p-5 border rounded-lg hover:shadow-sm transition-all">
                      <ShieldCheck className="h-6 w-6 text-primary mb-3" />
                      <h4 className="text-sm font-medium mb-2">Warranty</h4>
                      <p className="text-sm text-muted-foreground">
                          {product.warrantyInformation}
                      </p>
                  </div>
              )}

              {product.shippingInformation && (
                  <div className="flex flex-col items-center text-center p-5 border rounded-lg hover:shadow-sm transition-all">
                      <Truck className="h-6 w-6 text-primary mb-3" />
                      <h4 className="text-sm font-medium mb-2">Shipping</h4>
                      <p className="text-sm text-muted-foreground">
                          {product.shippingInformation}
                      </p>
                  </div>
              )}

              {product.availabilityStatus && (
                  <div className="flex flex-col items-center text-center p-5 border rounded-lg hover:shadow-sm transition-all">
                      <CheckCircle className="h-6 w-6 text-primary mb-3" />
                      <h4 className="text-sm font-medium mb-2">Availability</h4>
                      <p className="text-sm text-muted-foreground">
                          {product.availabilityStatus}
                      </p>
                  </div>
              )}
          </div>
      </div>  )
}

export default CheckStockPolicies