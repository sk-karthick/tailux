"use client";  // ✅ Ensure this is here

import useFetchData from "@/app/hooks/useFetchData";
import { useParams } from "next/navigation";
import './page.scss';
import { IoIosArrowBack } from "react-icons/io";
import { IoShareOutline } from "react-icons/io5";

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
  const productId = params?.productId;

  const api_url = `https://fakestoreapi.com/products/${productId}`;
  const { data, error } = useFetchData(api_url)<Product> as { data: Product; error: any };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product">
      <div className="product-image">
        <div className="action-buttons">
          <button><IoIosArrowBack /></button>
          <button><IoShareOutline /></button>
        </div>
        <img src={data.image} alt={data.title} />
      </div>
      <div className="product-details">
        <p className="product-category">{data.category}</p>
        <h2 className="product-title">{data.title}</h2>
        <p className="product-title">{data.description}</p>
        <p>${data.price}</p>
        <p>{data?.rating?.rate}</p>
      </div>
    </div>
  );
};

export default ProductPage;
