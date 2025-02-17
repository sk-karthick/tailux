"use client";
import React, { useState, useEffect } from 'react';

const useFetchData = (api_url: string) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api_url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setData(data);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, [api_url]);

  return { data, error };
};

export default useFetchData;