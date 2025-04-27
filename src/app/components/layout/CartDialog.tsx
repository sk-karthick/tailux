import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ShoppingCart } from 'lucide-react'
import React from 'react'

const CartDialog = () => {
    const cartItems = [
        { id: 1, name: 'Premium Headphones', price: 199.99, quantity: 1, image: '/headphones.jpg' },
        { id: 2, name: 'Wireless Keyboard', price: 89.99, quantity: 2, image: '/keyboard.jpg' },
        { id: 3, name: 'Ergonomic Mouse', price: 49.99, quantity: 1, image: '/mouse.jpg' },
    ]

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const tax = subtotal * 0.1
    const total = subtotal + tax

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="relative">
                    <ShoppingCart className="w-5 h-5" />
                    {cartItems.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                            {cartItems.length}
                        </span>
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl">Your Shopping Cart</DialogTitle>
                    <DialogDescription>
                        {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
                    {cartItems.length === 0 ? (
                        <div className="text-center py-8">
                            <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium">Your cart is empty</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Start shopping to add items to your cart
                            </p>
                        </div>
                    ) : (
                        <>
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex items-center gap-4">
                                    <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                                        {/* Replace with actual image */}
                                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                                            Product Image
                                        </div>
                                        <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-1 rounded-bl-md">
                                            {item.quantity}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium">{item.name}</h4>
                                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                                    </div>
                               
                                    <Button variant="ghost" size="sm" className="text-destructive">
                                        Remove
                                    </Button>
                                </div>
                            ))}
                        </>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Subtotal</span>
                                <span className="font-medium">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Tax (10%)</span>
                                <span className="font-medium">${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between pt-2">
                                <span className="font-medium">Total</span>
                                <span className="font-bold">${total.toFixed(2)}</span>
                            </div>
                        </div>
                        <Button className="w-full mt-4" size="lg">
                            Proceed to Checkout
                        </Button>
                        <div className="text-center text-sm text-muted-foreground">
                            or <Button variant="link" className="p-0 h-auto">continue shopping</Button>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default CartDialog