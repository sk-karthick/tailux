"use client";

import { useState } from "react";
import { Dialog } from "@radix-ui/react-dialog";
import DialogModal from "../ui/Dialog";
import { useFetch } from '../hooks/useLoginFetch';

interface LoginProps {
    setIsUser: (isOpen: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useFetch(); // Only 'login' is available from this hook

    const handleSaveClick = async () => {
        await login({
            email,
            password,
            setLoading,
            setError,
            setIsUser,
        });
    };

    const renderDialogContent = () => (
        <div className="flex flex-col">
            <div className="mb-4 mt-5">
                <label htmlFor="email" className="text-gray-700">Email</label>
                <input
                    type="text"
                    id="email"
                    className="border border-gray-300 rounded p-2 w-full"
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="text-gray-700">Password</label>
                <input
                    type="password"
                    id="password"
                    className="border border-gray-300 rounded p-2 w-full"
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {loading && <p className="text-blue-500 text-sm">Loading...</p>}
        </div>
    );

    return (
        <Dialog open={true}>
            <DialogModal
                setIsUser={setIsUser}
                handleSaveClick={handleSaveClick}
                triggerButton={false}
                dialogHeader="Login"
                dialogDescription={renderDialogContent()}
                confirmText={loading ? "Logging in..." : "Login"}
            />
        </Dialog>
    );
};

export default Login;