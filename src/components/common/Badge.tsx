
import React from 'react';
import cn from "classnames/bind";

//styles
import s from './Badge.module.scss';

//types
import { IBadgeProps } from './Badge.types';

const Badge: React.FC<IBadgeProps> = ({
	badgeText = '',
	position = 'top-left',
	size = 'normal',
	isBlack = false
}) => {
	//classnames
	const cx = cn.bind(s);
	const badgeClasses = cx(s.Badge, {
		[s.BadgeBottomLeft]: position === 'bottom-left',
		[s.BadgeBottomRight]: position === 'bottom-right',
		[s.BadgeBig]: size === 'big',
		[s.BadgeSmall]: size === 'small',
		[s.BadgeBlack]: isBlack,
	})

	return (
		<div className={badgeClasses}>
			{badgeText}
		</div>
	)
}

export default Badge;
