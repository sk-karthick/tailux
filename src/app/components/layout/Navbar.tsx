"use client";

import { Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { setSearchValue, setIsUser } from "@/app/store/appSlice";
import { useLogout } from "@/app/auth/auth";
import CartDialog from "./CartDialog";


const Navbar = () => {
    const dispatch = useDispatch();
    const searchValue = useSelector((state: RootState) => state.app.searchValue);
    const user = useSelector((state: RootState) => state.user.user);
    const logout = useLogout();
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setStep(1);
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    const actionLogout = () => {
        logout();
        dispatch(setIsUser(false)); // Update user state on logout
    };

    const ProfileView = () => {
        return (
            <>
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src={user?.image || "/profile.jpg"} alt="User" />
                        <AvatarFallback>
                            {user?.firstName ? user.firstName.charAt(0) : "U"}
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
        );
    };

    const notificationPopover = () => {
        return (
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="w-[40px] h-[40px]" />
                        {/* <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 animate-ping" /> */}
                        {/* <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" /> */}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-center p-2">
                            <p className="text-sm">No Notifications</p>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
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
                                <AvatarImage
                                    src={user?.image || "/profile.jpg"}
                                    alt="User-profile"
                                />
                                <AvatarFallback>
                                    {user?.firstName ? user.firstName.charAt(0) : "U"}
                                </AvatarFallback>
                            </Avatar>
                            <div className="transition-all duration-700 ease-in-out">
                                {step === 0 ? (
                                    <p className="animate-fade-in">Welcome back! ✨</p>
                                ) : (
                                    <p className="animate-fade-in">
                                        {user?.firstName && user.firstName}
                                    </p>
                                )}
                            </div>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-[35svh] p-4 ml-4">
                        {ProfileView()}
                    </PopoverContent>
                </Popover>

                <div className="flex-1 px-4 max-w-md">
                    <Input
                        type="text"
                        placeholder="Search products or orders"
                        className="w-full rounded-full px-5 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchValue}
                        onChange={(e) => dispatch(setSearchValue(e.target.value))}
                    />
                </div>
                <div className="flex items-center gap-4">
                    {notificationPopover()}
                    {CartDialog()}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
