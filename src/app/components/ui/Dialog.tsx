import { Button } from "@/components/ui/button";
import {
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import React from "react";

interface DialogModalProps {
    handleSaveClick: () => void;
    triggerButton?: boolean;
    dialogHeader?: string;
    dialogDescription?: string | React.ReactNode;
    confirmText?: string;
    disableConfirm?: boolean;
}

const Dialog: React.FC<DialogModalProps> = ({
    handleSaveClick,
    triggerButton = false,
    dialogHeader = "Dialog",
    dialogDescription = "This is a dialog",
    confirmText = "Confirm",
    disableConfirm = false,
}) => {
    const isJSX = typeof dialogDescription !== "string";

    return (
        <>
            {triggerButton && (
                <DialogTrigger asChild>
                    <div className="cursor-pointer text-blue-600 underline">Click me!</div>
                </DialogTrigger>
            )}

            <DialogContent className="sm:max-w-[425px] md:max-w-[50%] md:h-[60vh] flex flex-col md:flex-row p-0 m-0 sm:rounded-3xl overflow-hidden [&>button.absolute.right-4.top-4]:hidden">
                {/* Left Content */}
                <div className="modal-content md:w-[50%] flex flex-col justify-center items-center p-12">
                    <DialogHeader>
                        <DialogTitle className="text-5xl branding-name text-brand">
                            {dialogHeader}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="w-full mt-4">
                        {isJSX ? (
                            <div className="pt-2">{dialogDescription}</div>
                        ) : (
                            <p className="text-sm text-muted-foreground">{dialogDescription}</p>
                        )}
                    </div>

                    <DialogFooter className="flex flex-col items-center sm:justify-between mt-4 w-full">
                        <Button variant="secondary">Sign up</Button>
                        <Button
                            type="button"
                            onClick={handleSaveClick}
                            className="text-brand-foreground bg-brand mt-2"
                            disabled={disableConfirm}
                        >
                            {confirmText}
                        </Button>
                    </DialogFooter>
                </div>

                {/* Right Image */}
                <div className="w-[50%] h-auto md:block hidden">
                    <Image
                        src="/images/login-profile.jpg"
                        alt="Illustration"
                        width={500}
                        height={800}
                        className="w-full h-full object-cover object-top"
                    />
                </div>
            </DialogContent>
        </>
    );
};

export default Dialog;
