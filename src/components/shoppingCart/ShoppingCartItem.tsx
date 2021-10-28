

import React from 'react';

//styles
import s from './ShoppingCartItem.module.scss';

//types
import { IShoppingCartItemProps } from './ShoppingCartItem.types';

const ShoppingCartItem: React.FC<IShoppingCartItemProps> = ({
	product
}) => {
	return (
		<div className={s.ShoppingCartItem}>
			<div className={s.ShoppingCartItemInfo}>
				<div className={s.ShoppingCartItemName}>
					{product.name}
				</div>
				<div className={s.ShoppingCartItemPrice}>
					{product.currencySign}{product.price}
				</div>
			</div>
			<div className={s.ShoppingCartItemImage}>
				<img src={product.image.src} alt={product.image.alt} />
			</div>
		</div>
	)
}

export default ShoppingCartItem;
