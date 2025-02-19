"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Slider.scss";
import { useRouter } from "next/navigation";

const Carousel = dynamic(
    () => import("react-responsive-carousel").then((mod) => mod.Carousel),
    { ssr: false }
);

interface SliderProps {
    data: Array<{
        image: string;
        title: string;
    }>;
}

const Slider: React.FC<SliderProps> = ({ data }) => {
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;
    console.log(data);
    

    const productClickHandler = (id: number) => {
        console.log("Product clicked: ", id);
        router.push(`/product/${id}`);

    };

    return (
        <Carousel
            className="image-slider"
            selectedItem={0}
            autoPlay
            interval={3000}
            infiniteLoop
            showThumbs={false}
            // showArrows
            showStatus={false}
            showIndicators={false}
            // dynamicHeight
            swipeable 
            useKeyboardArrows
            axis="horizontal"
            centerSlidePercentage={100}
        >
            {data.map((item, id) => (
                <div key={id} className="image-slider__item" onClick={() => {productClickHandler(item.id)}}>
                    <Image
                        width={500}
                        height={500}
                        src={item.image}
                        alt={item.title}
                    />
                </div>
            ))}
        </Carousel>
    );
};

export default Slider;
