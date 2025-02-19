"use client";

import useFetchData from '@/app/hooks/useFetchData';
import React from 'react';
import './HomePage.scss';
import Cards from './Cards';
import Slider from '../UI/Slider';
import LoadingSpinner from '../UI/LoadingSpinner';

const HomePage = () => {
  const api_url = 'https://fakestoreapi.com/products';
  const { data, error } = useFetchData<any[]>(api_url) as { data: any[]; error: any };
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <LoadingSpinner />;
  }

  return (
    <div className='home-page'>
      <Slider data={data} />
      <Cards data={data} />
    </div>
  );
};

export default HomePage;