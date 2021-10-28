
import React from 'react';

//styles
import s from './Filter.module.scss';

//comps
import Checkbox from './Checkbox';

//types
import { IFilterProps } from './Filter.types';

const Filter: React.FC<IFilterProps> = ({
	sections
}) => {
	return (
		<div className={s.Filter}>
			{sections.map((sec, secIndex) => (
				<div className={s.FilterSection} key={`filter-section-${secIndex}`}>
					<h3 className='heading-midsize'>{sec.title}</h3>
					{sec.filterItems.map((fi, findex) => (
						<div className={s.FilterItem} key={`filter-item-${secIndex}-${findex}`}>
							<Checkbox
								isChecked={fi.isChecked}
								cbText={fi.filterText}
								onToggle={fi.onToggle}
							/>
						</div>
					))}
				</div>
			))

			}
		</div>
	)
}

export default Filter;
