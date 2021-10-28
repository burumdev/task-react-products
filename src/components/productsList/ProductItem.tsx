
import React, { useState } from 'react';

//types
import { IProductItemProps } from './ProductItem.types';

//actions
import { addProductToCart } from '../../store/products/productsActions';

//styles
import s from './ProductItem.module.scss';

//comps
import Badge from '../common/Badge';
import Button from '../common/Button';

const ProductItem: React.FC<IProductItemProps> = ({
	product,
	forceShowCartButtons = false
}) => {
	//state
	const [isCartButtonShown, setCartButtonShown] = useState(forceShowCartButtons);

	return (
		<div
			className={s.ProductItem}
			onMouseEnter={() => setCartButtonShown(true)}
			onMouseLeave={() => setCartButtonShown(forceShowCartButtons)}
		>
			{product.bestseller &&
				<Badge
					badgeText='Best Seller'
				/>
			}
			<div className={s.ProductItemImage}>
				<img src={product.image.src} alt={product.image.alt} />
				{isCartButtonShown &&
					<Button
						buttonInner='ADD TO CART'
						onClick={() => addProductToCart(product.id)}
						isAbsolute
					/>
				}
			</div>
			<div className='heading-midsize gray-medium'>
				{product.categoryName}
			</div>
			<div className={`heading-big ${s.ProductItemName}`}>
				{product.name}
			</div>
			<div className={s.ProductItemPrice}>
				{product.currencySign}{product.price}
			</div>
		</div>
	)
}

export default ProductItem;
