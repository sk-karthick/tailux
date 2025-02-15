"use client";

import useFetchData from '@/app/hooks/useFetchData';
import React from 'react';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import './HomePage.scss';

const HomePage = () => {
  const api_url = 'https://fakestoreapi.com/products';
  const { data, error } = useFetchData<any[]>(api_url) as { data: any[]; error: any };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  console.log(data);

  return (
    <div className='home-page'>
      <div className='home-page-cards'>
        {data.map((data) => (
          <div className='home-page-card-container' key={data.id}>
            <div className='home-page-image-container'>
              <img src={data.image} alt={data.title} />
              <div className='home-page-card-like'> <FcLike /><FcLikePlaceholder /></div>
            </div>
            <div className='home-page-card-detail-container'>
              <div className='home-page-card-category'>{data.category}</div>
              <div className='home-page-card-title-header'>
                <div className='home-page-card-title'>{data.title}</div>
                <div className='home-page-card-rating'>{data.rating.rate}</div>
              </div>
              <div className='home-page-card-description'> {data.description}</div>
              <div className='home-page-card-price'><span>{data.price + 100}</span>{data.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;