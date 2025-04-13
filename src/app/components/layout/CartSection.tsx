import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

import { ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card } from "@/components/ui/card";

interface CartItem {
    image: string;
    name: string;
    quantity: number;
    price: number;
}

const CartSection = ({ cartItems }: { cartItems: CartItem[] }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart />
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[50svh] mx-auto">
                <DialogHeader>
                    <DialogTitle>Your Cart</DialogTitle>
                    <DialogDescription>Items you’ve added</DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto">
                     {cartItems.length > 0 ? (
                        cartItems.map((item, idx) => (
                            <Card key={idx} className="flex items-center gap-4 p-3 relative">
                                <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={64}
                                        height={64}
                                        className="object-cover w-full h-full rounded"
                                    />
                                </div>

                                <div className="flex flex-col w-full">
                                    <h3 className="font-semibold text-base line-clamp-1">{item.name}</h3>
                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    <p className="font-medium text-green-600 mt-1">₹{item.price}</p>
                                </div>

                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="absolute top-2 right-2"
                                    onClick={() => console.log("Remove logic")}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </Card>
                        ))
                    ) : (
                        <p className="text-center text-sm text-gray-500">Cart is empty</p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CartSection;
