
import React, { useMemo, useCallback } from 'react';
import { useObservableState } from 'observable-hooks';

//store
import { productCategories$, productFilterConf$ } from '../../store/products/productsStore';

//comps
import Filter from '../common/Filter';

//styles
import s from './ProductsFilter.module.scss';

const ProductsFilter: React.FC = () => {
	//state
	const prodFilters = useObservableState(productFilterConf$, {
		categories: [],
		priceRange: null
	});
	const prodCats = useObservableState(productCategories$, []);

	//funcs
	const onTogglePriceRange = useCallback(
		(filterKey: [number, number], isChecked: boolean) => {

			const strCurrentRange = JSON.stringify(prodFilters.priceRange);
			const strFilterKey = JSON.stringify(filterKey);

			if (isChecked) {
				productFilterConf$.next({
					...prodFilters,
					priceRange: filterKey
				})
			} else if (strCurrentRange === strFilterKey) {
				productFilterConf$.next({
					...prodFilters,
					priceRange: null
				})
			}
		}, [prodFilters]
	);

	const onToggleCategory = useCallback(
		(filterKey: string, isChecked: boolean) => {
			if (isChecked) {
				productFilterConf$.next({
					...prodFilters,
					categories: [...prodFilters.categories, filterKey]
				})
			} else {
				productFilterConf$.next({
					...prodFilters,
					categories: prodFilters.categories.filter(cat => cat !== filterKey)
				})
			}
		}, [prodFilters]
	)

	const filterSections = useMemo(() => {
		const catFilterItems = prodCats.map(pc => {
			return {
				filterText: pc.charAt(0).toUpperCase() + pc.substr(1),
				onToggle: (isChecked: boolean) => onToggleCategory(pc, isChecked),
				isChecked: prodFilters.categories.includes(pc)
			}
		})

		const strPriceRange = JSON.stringify(prodFilters.priceRange);

		return [
			{
				title: 'Category',
				filterItems: catFilterItems
			},
			{
				title: 'Price range',
				filterItems: [
					{
						filterText: 'Lower than $20',
						onToggle: (isChecked: boolean) => onTogglePriceRange([0, 20], isChecked),
						isChecked: strPriceRange === JSON.stringify([0, 20])
					},
					{
						filterText: '$20 - $100',
						onToggle: (isChecked: boolean) => onTogglePriceRange([20, 100], isChecked),
						isChecked: strPriceRange === JSON.stringify([20, 100])
					},
					{
						filterText: '$100 - $200',
						onToggle: (isChecked: boolean) => onTogglePriceRange([100, 200], isChecked),
						isChecked: strPriceRange === JSON.stringify([100, 200])
					},
					{
						filterText: 'More than $200',
						onToggle: (isChecked: boolean) => onTogglePriceRange([200, Number.MAX_VALUE], isChecked),
						isChecked: strPriceRange === JSON.stringify([200, Number.MAX_VALUE])
					},
				]
			}
		]
	}, [prodCats, prodFilters, onTogglePriceRange, onToggleCategory]);

	return (
		<div className={s.ProductsFilter}>
			<Filter
				sections={filterSections}
			/>
		</div>
	)
}

export default ProductsFilter;
