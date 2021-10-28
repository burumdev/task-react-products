
export interface IPaginatorProps {
	currentStep: number;
	totalItems: number;
	perPage: number;
	onChangeStep: Function;
}