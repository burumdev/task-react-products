
import React, { useState, useEffect } from 'react';
import { useResizeDetector } from 'react-resize-detector';

//actions
import { getProducts } from '../store/products/productsActions';

//comps
import ProductsSorter from '../components/productsSorter/ProductsSorter';
import ProductsFilter from '../components/productsFilter/ProductsFilter';
import ProductsList from '../components/productsList/ProductsList';
import ProductFeatured from '../components/productFeatured/ProductFeatured';

import Button from '../components/common/Button';

//styles
import s from './ProductsSection.module.scss';

const ProductsSection: React.FC = () => {
	//state
	const [isFilterShown, setFilterShown] = useState(true);

	//resize
	const { width, ref } = useResizeDetector<HTMLDivElement>({
		handleHeight: false,
		refreshMode: 'throttle',
		refreshRate: 500
	});

	//effect
	useEffect(() => {
		if (width! < 600) {
			setFilterShown(false);
		}
	}, [width]);

	useEffect(() => {
		getProducts();
	}, []);

	return (
		<div className={s.ProductsSection} ref={ref}>
			<ProductFeatured />
			<div className={s.ProductsSectionHeader}>
				<h2 className={`heading-big ${s.ProductsSectionTitle}`}>Photography / <span>Premium Photos</span></h2>
				{width! < 600 &&
					<Button
						buttonInner={<img src='img/icons/filters.svg' alt="Click to open filters" />}
						onClick={() => setFilterShown(!isFilterShown)}
						isTransparentBox
						isIcon
					/>
				}
				{width! > 600 &&
					<ProductsSorter />
				}
			</div>
			<div className={s.ProductsSectionFilterList}>
				{isFilterShown &&
					<ProductsFilter />
				}
				<ProductsList forceShowCartButtons={width! < 600} />
			</div>
		</div>
	)
}

export default ProductsSection;
