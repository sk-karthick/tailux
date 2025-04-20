import { Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { toggleLike } from "@/app/store/likedSlice";
import { toast } from "sonner";
import Image from "next/image";

import { Product } from '@/types/product';

interface ProductCardProps {
    products: Product;
}
export default function ProductCard({ products }: ProductCardProps) {
    const router = useRouter();
    const dispatch = useDispatch();
    const likedProducts = useSelector((state: RootState) => state.liked.likedProducts);
    const isLiked = likedProducts.includes(products.id);

    const discountPercentageedPrice = products.price - (products.price * products.discountPercentage) / 100;

    const handleCardClick = () => {
        router.push(`/products/${products.id}`);
    };

    const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        dispatch(toggleLike(products.id));
        toast.custom(() => (
            <div className={`dark:bg-zinc-900 p-4 rounded-md shadow-md w-full max-w-sm ${!isLiked ? "bg-[#5E3023]" : "bg-[#5E6067]"}`} role="alert">
                <div className="text-sm font-medium mb-1 text-white">
                    {!isLiked ? "Added to liked products" : "Removed from liked products"}
                </div>
                <div className={`text-xs mb-3 text-white`}>
                    {products.title} has been {!isLiked ? "added to" : "removed from"} your liked products.
                </div>
            </div>
        ));
    };

    return (
        <Card
            onClick={handleCardClick}
            className="w-full max-w-sm overflow-hidden cursor-pointer rounded-2xl shadow-sm border transition hover:shadow-md hover:scale-[1.02] duration-500"
        >
            <div className="relative group">
                <Image
                    src={products.images[0]}
                    width={500}
                    height={300}
                    alt={products.title}
                    className="w-full h-[300px] object-contain"
                />

                <Button
                    variant="ghost"
                    size="icon"
                    className="text-2xl absolute top-3 right-3 bg-white/80 backdrop-blur-md rounded-full shadow-sm z-10"
                    onClick={handleLikeClick}
                >
                    <Heart width={30} height={30}
                        className={` transition ${isLiked ? "fill-red-500 text-red-500" : "text-gray-500"}`}
                    />
                </Button>
            </div>

            <CardContent className="p-4 flex flex-col justify-between">
                <div>{products.brand}</div>
                <div>
                    <h3 className="text-lg font-semibold line-clamp-1">{products.title}</h3>
                    <p className="text-sm text-gray-600 mt-1 mb-2 line-clamp-2">{products.description}</p>
                </div>

                <div className="flex items-flex justify-center mt-2">
                    <div className="flex items-end gap-2 flex-wrap justify-center">
                        <span className="text-3xl font-bold text-green-600">${discountPercentageedPrice.toFixed(0)}</span>
                        {products.discountPercentage > 0 && (
                            <div className="flex gap-2 mb-1">
                                <span className="text-sm line-through text-gray-400">${products.price}</span>
                                <span className="text-sm font-medium text-red-500">({products.discountPercentage}% OFF)</span>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
