
export interface IFilterProps {
	sections: IFilterSection[];
}

export interface IFilterSection {
	title: string;
	filterItems: IFilterItem[];
}

export interface IFilterItem {
	isChecked: boolean;
	filterText: string;
	onToggle: Function;
}
