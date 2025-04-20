import { Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import useUserFetch from "../hooks/useUserFetch";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import CartSection from "./CartSection";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { logout } from "@/app/auth/auth";

interface Navbarprops {
    setSearchValue: (value: string) => void;
    setIsUser: (isOpen: boolean) => void;
}


interface UserType {
    name?: string;
    email?: string;
    avatar?: string;
}
interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
}

const Navbar: React.FC<Navbarprops> = (props) => {
    // const [user, setUser] = useState<UserType>({});
    const { setSearchValue, setIsUser } = props
    const [step, setStep] = useState(0);
    const likedProductIds = useSelector((state: RootState) => state.liked.likedProducts);
    const [likedProducts, setLikedProducts] = useState<Product[]>([]);

    const user = useSelector((state: RootState) => state.user.user);
    const getUser = useUserFetch();
    console.log(user, getUser)
    useEffect(() => {
        if (user) {
            console.log("User info in navbar:", user);
        } else {
            console.log("No user info available");
        }
    }, [user]);

    useEffect(() => {
        const fetchLikedProducts = async () => {
            // setLoading(true);
            try {
                const allProductsRes = await fetch("https://fakestoreapi.com/products");
                const allProducts: Product[] = await allProductsRes.json();

                const filtered = allProducts.filter((product) =>
                    likedProductIds.includes(product.id)
                );

                setLikedProducts(filtered);
            } catch (err) {
                console.error("Error fetching liked products", err);
            } finally {
                // setLoading(false);
            }
        };

        if (likedProductIds.length > 0) {
            fetchLikedProducts();
        } else {
            setLikedProducts([]);
        }
    }, [likedProductIds]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setStep(1);
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    const actionLogout = () => {
        logout();
        setIsUser(false);
    }

    const ProfileView = () => {
        return (
            <>
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src="/profile.jpg" alt="User" />
                        <AvatarFallback onClick={ProfileView}>
                            {user?.image ? (
                                <Image width={100} height={100} src={user?.image} alt="user-avatar" />
                            ) : user?.firstName?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-semibold">{user?.firstName}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                </div>
                <div className="flex align-center justify-between mt-4">
                    <Button variant="secondary">
                        Edit Profile
                    </Button>
                    <Button variant="destructive" onClick={actionLogout}>
                        Logout
                    </Button>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="branding-name bg-[#390007] text-white h-8 py-2 text-xl flex items-center justify-center">
                TAILUX
            </div>
            <nav className="w-full px-4 py-2 border-b bg-white flex items-center justify-between">
                <Popover>
                    <PopoverTrigger>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <Avatar>
                                <AvatarImage src={user?.image || "/profile.jpg"} alt="User-profile" />
                                <AvatarFallback>
                                    {user?.firstName ? user.firstName.charAt(0) : "U"}
                                </AvatarFallback>
                            </Avatar>
                            <div className="transition-all duration-700 ease-in-out">
                                {step === 0 ? (
                                    <p className="animate-fade-in">Welcome back! ✨</p>
                                ) : (
                                        <p className="animate-fade-in">{user?.firstName && user.firstName}</p>
                                )}
                            </div>
                        </div>
                        <PopoverContent className="w-[30svh] p-4">
                            {ProfileView()}
                        </PopoverContent>

                    </PopoverTrigger>
                </Popover>
                <div className="flex-1 px-4 max-w-md">
                    <Input
                        type="text"
                        placeholder="Search products or orders"
                        className="w-full rounded-full px-5 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="w-[40px] h-[40px]" />
                        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 animate-ping" />
                        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
                    </Button>
                    <CartSection cartItems={likedProducts.map(product => ({
                        ...product,
                        name: product.title,
                        quantity: 1
                    }))} />
                </div>
            </nav>
        </>
    )
}
export default Navbar;