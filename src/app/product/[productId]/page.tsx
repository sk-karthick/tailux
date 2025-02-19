"use client";  // ✅ Ensure this is here

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import useFetchData from "@/app/hooks/useFetchData";
import { IoIosArrowBack } from "react-icons/io";
import LoadingSpinner from "@/app/components/UI/LoadingSpinner";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { toggleLike } from "@/app/store/store";
import { FaRegShareSquare } from "react-icons/fa";
import './page.scss';

interface Product {
  id: number;
  image: string;
  title: string;
  category: string;
  description: string;
  price: number;
  rating: {
    rate: number;
  };
}

const ProductPage = () => {
  const params = useParams();
  const router = useRouter();
  const productId = params?.productId;

  const dispatch = useDispatch();
  const likedProducts = useSelector((state: RootState) => state.likes.likedProducts);

  const likeClick = (event: React.MouseEvent, productId: number) => {
    event.stopPropagation();
    dispatch(toggleLike(productId));

    fetch("/api/like", {
      method: "POST",
      body: JSON.stringify({ productId }),
      headers: { "Content-Type": "application/json" },
    });
  };

  const api_url = `https://fakestoreapi.com/products/${productId}`;
  const { data, error } = useFetchData(api_url)<Product> as { data: Product; error: any };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <LoadingSpinner />;
  }

  return (
    <div className="product">
      <div className="product-image">
        <div className="action-buttons">
          <button onClick={() => router.back()}><IoIosArrowBack /></button>
          <div className="product-share-button">
            <button onClick={(event) => likeClick(event, data.id)}>
              {likedProducts.includes(data.id) ? <FcLike /> : <FcLikePlaceholder />}
            </button>
            <button><FaRegShareSquare /></button>
          </div>
        </div>
        {data.image ? (
          <Image src={data.image} alt={data.title} width={500} height={500} />
        ) : (
          <LoadingSpinner />
        )}
      </div>
      <div className="product-details">
        <p className="product-category">{data.category}</p>
        <h2 className="product-title">{data.title}</h2>
        <p className="product-description">{data.description}</p>
        <p>${data.price}</p>
        <p>{data?.rating?.rate}</p>
      </div>
    </div>
  );
};

export default ProductPage;
