
//types
import { IRawProduct, IProduct } from './products.types';

export const productsSetter = (products: IRawProduct[]): IProduct[] => {
	return products.map(p => {
		let currencySign = '$';
		switch (p.currency) {
			case 'USD':
				currencySign = '$';
				break;
			case 'EUR':
				currencySign = '€';
				break;
			case 'GBP':
				currencySign = '£';
				break;
			case 'JPY':
				currencySign = '¥';
				break;
			default:
				currencySign = '$';
				break;
		}
		return {
			...p,
			image: {
				src: typeof p.image === 'object' ? p.image.src : p.image,
				alt: typeof p.image === 'object' ? p.image.alt : p.name
			},
			categoryName: p.category.charAt(0).toUpperCase() + p.category.substr(1),
			currencySign,
			details: p.details ? {
				...p.details,
				size: p.details.size / 1000
			} : null
		}
	})
}
