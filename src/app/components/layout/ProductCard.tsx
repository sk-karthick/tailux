import { Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { toggleLike } from "@/app/store/likedSlice";
import { toast } from "sonner";

type ProductProps = {
    image: string;
    title: string;
    description: string;
    price: number;
    discount: number;
    id: number;
};

export default function ProductCard({
    image,
    title,
    description,
    price,
    discount,
    id,
}: ProductProps) {
    const router = useRouter();
    const dispatch = useDispatch();
    const likedProducts = useSelector((state: RootState) => state.liked.likedProducts);
    const isLiked = likedProducts.includes(id);

    const discountedPrice = price - (price * discount) / 100;

    const handleCardClick = () => {
        router.push(`/products/${id}`);
    };

    const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        dispatch(toggleLike(id));
        toast.custom((t) => (
            <div className={`dark:bg-zinc-900 p-4 rounded-md shadow-md w-full max-w-sm ${!isLiked ? "bg-[#5E3023]" : "bg-[#5E6067]"}`} role="alert">
                <div className="text-sm font-medium mb-1 text-white">
                    {!isLiked ? "Added to liked products" : "Removed from liked products"}
                </div>
                <div className={`text-xs mb-3 text-white`}>
                    {title} has been {!isLiked ? "added to" : "removed from"} your liked products.
                </div>
            </div>
        ));
    };

    return (
        <Card
            onClick={handleCardClick}
            className="w-full max-w-sm overflow-hidden cursor-pointer rounded-2xl shadow-sm border transition hover:shadow-md hover:scale-[1.02] duration-200"
        >
            <div className="relative group">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-56 object-cover rounded-t-2xl transition-transform duration-200 group-hover:scale-105"
                />

                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 bg-white/80 backdrop-blur-md rounded-full shadow-sm z-10"
                    onClick={handleLikeClick}
                >
                    <Heart
                        className={`w-5 h-5 transition ${isLiked ? "fill-red-500 text-red-500" : "text-gray-500"}`}
                    />
                </Button>
            </div>

            <CardContent className="p-4 flex flex-col justify-between h-[180px]">
                <div>
                    <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
                    <p className="text-sm text-gray-600 mt-1 mb-2 line-clamp-2">{description}</p>
                </div>

                <div className="flex items-center justify-center mt-auto">
                    <div className="flex items-center gap-2 flex-wrap justify-center">
                        <span className="text-xl font-bold text-green-600">₹{discountedPrice.toFixed(0)}</span>
                        {discount > 0 && (
                            <>
                                <span className="text-sm line-through text-gray-400">₹{price}</span>
                                <span className="text-sm font-medium text-red-500">({discount}% OFF)</span>
                            </>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
