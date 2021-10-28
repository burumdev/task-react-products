
import React, { useEffect, useState, useMemo } from 'react';
import { useObservableState } from 'observable-hooks';

//store
import { filterSortedProducts$, productFilterConf$ } from '../../store/products/productsStore';

//types
import { IProductsListProps } from './ProductsList.types';
//comps
import ProductItem from './ProductItem';
import Paginator from '../common/Paginator';

//styles
import s from './ProductsList.module.scss';

const ProductsList: React.FC<IProductsListProps> = ({
	forceShowCartButtons = false
}) => {
	const pagPerPage = 6;
	//state
	const [paginationStep, setPaginationStep] = useState(1);
	const products = useObservableState(filterSortedProducts$, []);
	const prodFilters = useObservableState(productFilterConf$, {
		categories: [],
		priceRange: null
	});

	//funcs
	const onPaginatorChangeStep = (step: number) => {
		if (step !== paginationStep) {
			setPaginationStep(step);
		}
	}

	useEffect(() => {
		setPaginationStep(1);
	}, [prodFilters]);

	//memo
	const paginatedProducts = useMemo(() => {
		const startIndex = paginationStep === 1 ? 0 : (paginationStep - 1) * pagPerPage;
		return products.slice(startIndex, startIndex + pagPerPage);
	}, [paginationStep, products]);

	return (
		<div className={s.ProductsListContainer}>
			<div className={s.ProductsList}>
				{paginatedProducts.map(product => (
					<ProductItem
						key={`prod-item-${product.id}`}
						product={product}
						forceShowCartButtons={forceShowCartButtons}
					/>
				))}
			</div>
			<Paginator
				currentStep={paginationStep}
				totalItems={products.length}
				perPage={pagPerPage}
				onChangeStep={onPaginatorChangeStep}
			/>
		</div>
	)
}

export default ProductsList;
