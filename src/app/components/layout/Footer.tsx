import Link from 'next/link'
import React from 'react'
import { BiCategoryAlt } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { CiShoppingCart } from 'react-icons/ci'
import { IoHomeOutline } from 'react-icons/io5'

const Footer = () => {
	return (
		<div className="footer-menu">
			<ul>
				<li><Link href="/"><IoHomeOutline /></Link></li>
				<li><Link href="/about"><CiShoppingCart /></Link></li>
				<li><Link href="/services"><BiCategoryAlt /></Link></li>
				<li><Link href="/contact"><CgProfile /></Link></li>
			</ul>
		</div>
	)
}

export default Footer