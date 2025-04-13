import _ from "lodash";
import { Button } from "@/components/ui/button";
import {
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface LoginProps {
    setIsUser: (isOpen: boolean) => void;
    handleSaveClick: () => void;
    triggerButton?: boolean;
    dialogHeader?: string;
    dialogDescription?: string | React.ReactNode;
    confirmText?: string;
}

const DialogModal: React.FC<LoginProps> = (props) => {
    const {
        handleSaveClick = _.noop,
        triggerButton = false,
        dialogHeader = "Dialog",
        dialogDescription = "<h1>Dialog</h1>",
        confirmText = "Confirm",
    } = props;

    const isJSX = typeof dialogDescription !== "string";

    return (
        <>
            {triggerButton && (
                <DialogTrigger asChild>
                    <div className="cursor-pointer text-blue-600 underline">Click me!</div>
                </DialogTrigger>
            )}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{dialogHeader}</DialogTitle>
                    {isJSX ? (
                        <div className="pt-2">{dialogDescription}</div>
                    ) : (
                        <p className="text-sm text-muted-foreground">{dialogDescription}</p>
                    )}
                </DialogHeader>
                <DialogFooter>
                    <Button type="submit" onClick={handleSaveClick}>
                        {confirmText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </>
    );
};

export default DialogModal;
