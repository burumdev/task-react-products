
import React from 'react';

//styles
import s from './Checkbox.module.scss';

//types
import { ICheckboxProps } from './Checkbox.types';

const Checkbox: React.FC<ICheckboxProps> = ({
	cbText = '',
	isChecked = false,
	...props
}) => {
	//funcs
	const onToggle = () => {
		props.onToggle(!isChecked);
	}

	return (
		<div className={s.Checkbox} onClick={onToggle}>
			<div className={s.CheckboxIcon}>
				<img src="img/icons/checkbox.svg" alt={cbText} />
				{isChecked &&
					<img src="img/icons/checkmark.svg" alt={`${cbText}-checked`} />
				}
			</div>
			<span className={s.CheckboxText}>
				{cbText}
			</span>
		</div>
	)
}

export default Checkbox;
