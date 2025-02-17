"use client";

import { RootState, toggleLike } from '@/app/store/store';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { IoMdStar } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';

interface CardProps {
	data: {
		id: number;
		image: string;
		title: string;
		category: string;
		description: string;
		price: number;
		rating: {
			rate: number;
		};
	}[];
}

const Cards: React.FC<CardProps> = (props) => {
	const { data } = props;
	const router = useRouter();
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

	const cardClick = (productId: number) => {
		router.push(`/product/${productId}`);
	};


	return (
		<div className='home-page-cards'>
			{data.map((product) => (
				<div
					className='home-page-card-container'
					key={product.id}
					product-id={product.id}
					onClick={() => cardClick(product.id)}
				>
					<div className='home-page-image-container'>
						<img src={product.image} alt={product.title} />
						<div className='home-page-card-like' onClick={(event) => likeClick(event, product.id)}>
							{/* <FcLike />
							<FcLikePlaceholder /> */}
							{likedProducts.includes(product.id) ? <FcLike /> : <FcLikePlaceholder />}
						</div>
					</div>
					<div className='home-page-card-detail-container'>
						<div className='home-page-card-category'>{product.category}</div>
						<div className='home-page-card-title-header'>
							<div className='home-page-card-title'>{product.title}</div>
							<div className='home-page-card-rating'>
								<IoMdStar />
								{product.rating.rate}
							</div>
						</div>
						<div className='home-page-card-description'>{product.description}</div>
						<div className='home-page-card-price'>
							<span>{'$' + (product.price + 100)}</span>
							{'$' + product.price}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Cards;