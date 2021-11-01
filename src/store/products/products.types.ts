
export interface IRawProduct {
	id: number;
	name: string;
	category: string;
	price: number;
	currency: 'USD' | 'EUR' | 'GBP' | 'JPY';
	dimmentions: Dimensions | undefined;
	image: Image | string;
	bestseller: boolean;
	featured: boolean;
	details: ProductDetails | null;
}

export interface IProduct extends IRawProduct {
	categoryName: string;
	currencySign: string;
	image: Image
}

interface ProductDetails {
	dimmentions: Dimensions;
	size: number;
	description: string[];
	recommendations: Image[];
}

interface Dimensions {
	width: number;
	height: number;
}

interface Image {
	src: string;
	alt: string;
}

export interface IProductFilterConf {
	categories: string[]
	priceRange: [number, number] | null
}

export interface IProductSorterConf {
	isAsc: boolean;
	sorter: 'name' | 'price';
}
