
//types
import { IProduct } from '../../store/products/products.types';

export interface IProductItemProps {
	product: IProduct;
	forceShowCartButtons?: boolean;
}
