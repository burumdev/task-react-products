
import React, { useState, useEffect } from 'react';
import { useObservableState } from 'observable-hooks';

//styles
import s from './ShoppingCart.module.scss';

//store
import { cartProducts$ } from '../../store/products/productsStore';

//actions
import { clearCart } from '../../store/products/productsActions';

//comps
import ShoppingCartItem from './ShoppingCartItem';
import Button from '../common/Button';
import Badge from '../common/Badge';

const ShoppingCart: React.FC = () => {
	//state
	const [isCartOpen, setCartOpen] = useState(false);
	const cartProds = useObservableState(cartProducts$, []);

	//funcs
	const onToggleCart = () => {
		if (cartProds.length > 0) {
			setCartOpen(!isCartOpen);
		}
	}

	const onClearCart = () => {
		clearCart();
		setCartOpen(false);
	}

	useEffect(() => {
		setCartOpen(true);
	}, [cartProds]);

	return (
		<div className={s.ShoppingCart}>
			<div className={s.ShoppingCartButton}>
				<Button
					buttonInner={<img src='img/icons/cart.svg' alt="Shopping Cart" />}
					onClick={onToggleCart}
					isTransparentBox
					isIcon
				/>
				{cartProds.length > 0 &&
					<Badge
						badgeText={cartProds.length}
						isBlack
						size='small'
						position='bottom-right'
					/>
				}
			</div>
			{(isCartOpen && cartProds.length > 0) &&
				<div className={s.ShoppingCartContentsContainer}>
					<div className={s.CartCloseButton}>
						<Button
							buttonInner={<img src='img/icons/x.svg' alt="Close" />}
							onClick={onToggleCart}
							isTransparentBox
						/>
					</div>
					<div className={s.ShoppingCartContents}>
						{cartProds.map((cp, index) => (
							<ShoppingCartItem
								key={`cart-item-${cp.id}-${index}`}
								product={cp}
							/>
						))}
					</div>
					<div className={s.ShoppingCartSpacer}></div>
					<div className={s.CartClearButton}>
						<Button
							buttonInner='Clear'
							onClick={onClearCart}
							isWhite
							isStrech
						/>
					</div>
				</div>
			}
		</div>
	)
}

export default ShoppingCart;
