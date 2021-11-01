
import React from 'react';
import { useObservableState } from 'observable-hooks';
import { useResizeDetector } from 'react-resize-detector';

//store
import { featuredProduct$ } from '../../store/products/productsStore';

//actions
import { addProductToCart } from '../../store/products/productsActions';

//styles
import s from './ProductFeatured.module.scss';

//types
import { IProductFeaturedProps } from './ProductFeatured.types';

//comps
import Button from '../common/Button';
import Badge from '../common/Badge';

const ProductFeatured: React.FC<IProductFeaturedProps> = () => {
	//state
	const featuredProduct = useObservableState(featuredProduct$, undefined);

	//resize
	const { width, ref } = useResizeDetector<HTMLDivElement>({
		handleHeight: false,
		refreshMode: 'throttle',
		refreshRate: 500
	});

	return (
		<div className={s.ProductFeatured} ref={ref}>
			{featuredProduct &&
				<>
					<div className={s.ProductFeaturedHeader}>
						<h2 className='heading-big'>
							{featuredProduct.name}
						</h2>
						{width! > 600 &&
							<Button
								buttonInner='ADD TO CART'
								onClick={() => addProductToCart(featuredProduct.id)}
							/>
						}
					</div>
					<div className={s.ProductFeaturedImage}>
						<img src={featuredProduct.image.src} alt={featuredProduct.image.alt} />
						<Badge
							badgeText='Photo of the day'
							size='big'
							position='bottom-left'
						/>
					</div>
					{width! <= 600 &&
						<Button
							buttonInner='ADD TO CART'
							onClick={() => addProductToCart(featuredProduct.id)}
							isStrech
						/>
					}
					<div className={s.ProductFeaturedDetailsContainer}>
						<div className={s.ProductFeaturedInfo}>
							<h4 className={`heading-midsize ${s.ProductFeaturedAboutName}`}>
								{`About the ${featuredProduct.name}`}
							</h4>
							{width! > 600 &&
								<div className='heading-midsize gray-medium'>
									{featuredProduct.categoryName}
								</div>
							}
							{featuredProduct.details?.description.map((para, index) => (
								<p key={`fp-para-${index}`} className='gray-medium'>{para}</p>
							))}
						</div>
						<div className={s.ProductFeaturedDetailsAside}>
							<div className={s.ProductFeaturedAlsoBuy}>
								<h4 className='heading-midsize'>People Also Buy</h4>
								<div className={s.ProductFeaturedAlsoBuyImages}>
									{featuredProduct.details?.recommendations.map((rec, index) => (
										<img key={`fp-rec-img-${index}`} src={rec.src} alt={rec.alt} />
									))}
								</div>
							</div>
							<div className={s.ProductFeaturedDetails}>
								<h4 className='heading-midsize'>Details</h4>
								<p className='gray-medium'>Size: {`${featuredProduct.details?.dimmentions.width} x ${featuredProduct.details?.dimmentions.height} pixel`}</p>
								<p className='gray-medium'>Size: {`${featuredProduct.details?.size} mb`}</p>
							</div>
						</div>
					</div>
				</>
			}
		</div>
	)
}

export default ProductFeatured;
