
import React from 'react';
import cn from "classnames/bind";

//styles
import s from './Button.module.scss';

//types
import { IButtonProps } from './Button.types';

const Button: React.FC<IButtonProps> = ({
	buttonInner = '',
	isWhite = false,
	isTransparentBox = false,
	isHalfOpacity = false,
	isHidden = false,
	isAbsolute = false,
	isStrech = false,
	isIcon = false,
	//Getting functions in props to avoid scope confusion
	...props
}) => {
	//classnames
	const cx = cn.bind(s);
	const buttonClasses = cx(s.Button, {
		[s.ButtonWhite]: isWhite,
		[s.ButtonTransparentBox]: isTransparentBox,
		[s.ButtonHalfOpacity]: isHalfOpacity,
		[s.ButtonHidden]: isHidden,
		[s.ButtonAbsolute]: isAbsolute,
		[s.ButtonStretch]: isStrech,
		[s.ButtonIcon]: isIcon
	})

	return (
		<button onClick={e => props.onClick(e)} className={buttonClasses}>
			{buttonInner}
		</button>
	)
}

export default Button;
