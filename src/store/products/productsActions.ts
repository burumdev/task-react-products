
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

//obs
import { rawProducts$, cartProductIds$ } from './productsStore';

const API_URL = 'http://localhost:4000/products';

export const getProducts = () => ajax.getJSON(API_URL)
	.pipe(
		map((values: any) => {
			rawProducts$.next(values);
		})
	).subscribe();

export const addProductToCart = (
	productId: number
) => {
	cartProductIds$.next(
		[
			...cartProductIds$.value,
			productId
		]
	)
}

export const clearCart = () => {
	cartProductIds$.next([])
}
