
import React from 'react';
import { useObservableState } from 'observable-hooks';

//styles
import s from './ProductsSorter.module.scss';

//types
import { IProductsSorterProps } from './ProductsSorter.types';

//store
import { productSorterConf$ } from '../../store/products/productsStore';

//comps
import Button from '../common/Button';

const ProductsSorter: React.FC<IProductsSorterProps> = () => {
	//state
	const sorterConf = useObservableState(productSorterConf$, {
		asc: true,
		sorter: 'name'
	});

	//funcs
	const onToggleAsc = () => {
		productSorterConf$.next(
			{
				...sorterConf,
				asc: !sorterConf.asc
			}
		);
	}

	const onChangeSorter = (e: any) => {
		productSorterConf$.next(
			{
				...sorterConf,
				sorter: e.target.value
			}
		)
	}

	return (
		<div className={s.ProductsSorter}>
			<Button
				buttonInner={<img src="img/icons/sort.svg" alt="Change sort order" />}
				onClick={onToggleAsc}
				isTransparentBox
				isIcon
			/>
			<span>Sort By</span>
			<select onChange={onChangeSorter}>
				<option value='name'>{sorterConf.asc ? 'A-Z' : 'Z-A'}</option>
				<option value='price'>{`Price ${sorterConf.asc ? '<' : '>'}`}</option>
			</select>
		</div>
	)
}

export default ProductsSorter;
