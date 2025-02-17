"use client";

import { useRouter } from 'next/navigation';
import React from 'react';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { IoMdStar } from 'react-icons/io';

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

	const cardClick = (productId: number) => {
		router.push(`/product/${productId}`);
	};

	const likeClick = (event: React.MouseEvent, product: any) => {
		event.stopPropagation();
		console.log('Liked product:', product);
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
						<div className='home-page-card-like' onClick={(event) => likeClick(event, product)}>
							<FcLike />
							<FcLikePlaceholder />
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