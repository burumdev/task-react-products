
import React from 'react';

//comps
import ShoppingCart from '../components/shoppingCart/ShoppingCart';

//styles
import s from './HeaderSection.module.scss';

const HeaderSection: React.FC = () => {
	return (
		<div className={s.Header}>
			<div className={s.Logo}>
				<img src="img/icons/logo.svg" alt="React Task for Products" />
			</div>
			<ShoppingCart />
		</div>
	)
}

export default HeaderSection;
