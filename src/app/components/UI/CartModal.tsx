import React, { useEffect, useMemo, useState } from 'react'
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import './CartModal.scss';
import LoadingSpinner from './LoadingSpinner';

const Dialog = dynamic(() => import("primereact/dialog").then((mod) => mod.Dialog), { ssr: false });

interface CartModaProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
}

const CartModal: React.FC<CartModaProps> = (props) => {
    const { isOpen, setIsOpen } = props;

    const [likedProductDetails, setLikedProductDetails] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    const likedProducts = useSelector((state: RootState) => state.likes.likedProducts);

    useEffect(() => {
        const fetchLikedProducts = async () => {
            if (likedProducts.length === 0) {
                setLikedProductDetails([]);
                return;
            }

            setLoading(true);
            try {
                const productPromises = likedProducts.map((productId) =>
                    fetch(`https://fakestoreapi.com/products/${productId}`).then((res) => res.json())
                );

                const products = await Promise.all(productPromises);
                setLikedProductDetails(products);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLikedProducts();
    }, [likedProducts]);

    const renderLikedProducts = useMemo(() => {
        if (loading) return <LoadingSpinner />;
        if (likedProductDetails.length === 0) return <p>No liked products</p>;

        return likedProductDetails.map((product) => (
            <div key={product.id} className="liked-product-item">
                <img src={product.image} alt={product.title} className="liked-product-image" />
                <div className="liked-product-details">
                    <h3>{product.title}</h3>
                    <p>Price: ${product.price}</p>
                </div>
            </div>
        ));
    }, [loading, likedProductDetails]);

    return (
        <Dialog header="My Cart" visible={isOpen} onHide={() => setIsOpen(false)}>
            <div className='liked-products'>
                {renderLikedProducts}
            </div>
        </Dialog>
    );
};

export default CartModal;