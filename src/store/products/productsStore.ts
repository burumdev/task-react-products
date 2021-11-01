
import { BehaviorSubject, combineLatestWith } from 'rxjs';
import { map } from 'rxjs/operators';

//setters
import { productsSetter } from './productsSetters';

//types
import { IRawProduct, IProductFilterConf, IProductSorterConf } from './products.types';

//subjects
export const rawProducts$ = new BehaviorSubject<IRawProduct[]>([]);
export const productFilterConf$ = new BehaviorSubject<IProductFilterConf>({
	categories: [],
	priceRange: null
});
export const productSorterConf$ = new BehaviorSubject<IProductSorterConf>({
	isAsc: true,
	sorter: 'name'
});
export const cartProductIds$ = new BehaviorSubject<number[]>([]);

//observables
const normalizedProducts$ = rawProducts$.pipe(
	map(prods =>
		productsSetter(prods)
	)
)

const listProducts$ = normalizedProducts$.pipe(
	map(prods =>
		prods.filter(p => !p.featured)
	)
)

export const featuredProduct$ = normalizedProducts$.pipe(
	map(prods =>
		prods.find(p => p.featured)
	)
)

export const productCategories$ = normalizedProducts$.pipe(
	map(prods =>
		prods.map(p => p.category).filter((p, index, self) => self.indexOf(p) === index)
	)
)

export const cartProducts$ = normalizedProducts$.pipe(
	combineLatestWith(cartProductIds$),
	map(([prods, cartProdIds]) =>
		cartProdIds.map(cpi => prods.find(p => p.id === cpi)!)
	)
)

export const filterSortedProducts$ = listProducts$.pipe(
	combineLatestWith(productFilterConf$, productSorterConf$),
	map(([prods, filterConf, sorterConf]) => {
		const { categories, priceRange } = filterConf;
		const { isAsc, sorter } = sorterConf;

		const catProds = prods.filter(p => {
			return categories.length === 0 ? true : categories.includes(p.category)
		});

		const filteredProds = catProds.filter(p => {
			return priceRange === null ? true : (p.price >= priceRange[0] && p.price < priceRange[1])
		})

		filteredProds.sort((a, b) => {
			return ((a[sorter] < b[sorter]) ? -1 : ((a[sorter] > b[sorter]) ? 1 : 0));
		});

		if (!isAsc) {
			filteredProds.reverse();
		}

		return filteredProds;
	})
)
