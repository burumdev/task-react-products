
import React from 'react';

//styles
import s from './Paginator.module.scss';

//comps
import Button from './Button';

//types
import { IPaginatorProps } from './Paginator.types';

const Paginator: React.FC<IPaginatorProps> = ({
	currentStep,
	totalItems,
	perPage,
	//Getting functions in props to avoid scope confusion
	...props
}) => {
	const totalSteps = Math.ceil(totalItems / perPage);

	const renderSteps = () => {
		const stepItems: React.ReactNode[] = [];
		for (let i = 1; i <= totalSteps; i++) {
			stepItems.push(
				<Button
					key={`button-pag-${i}`}
					buttonInner={i}
					onClick={() => props.onChangeStep(i)}
					isTransparentBox
					isHalfOpacity={currentStep !== i}
				/>
			)
		}
		return stepItems;
	}

	return (
		<div className={s.Paginator}>
			<Button
				buttonInner='<'
				onClick={() => props.onChangeStep(currentStep - 1)}
				isTransparentBox
				isHidden={currentStep === 1}
			/>
			{renderSteps()}
			<Button
				buttonInner='>'
				onClick={() => props.onChangeStep(currentStep + 1)}
				isTransparentBox
				isHidden={currentStep === totalSteps}
			/>
		</div>
	)
}

export default Paginator;
