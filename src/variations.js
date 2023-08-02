import { __ } from '@wordpress/i18n';
import { row, stack } from '@wordpress/icons';
import metadata from './block.json';

const variations = [
	{
		name: `${ metadata.name }`,
		isDefault: true,
		title: __( 'Legacy Menu' ),
		attributes: { layout: { orientation: 'horizontal' } },
		scope: [ 'block' ],
	},
	{
		name: `${ metadata.name }`,
		isDefault: false,
		title: __( 'Legacy Menu Horizontal' ),
		icon: row,
		attributes: { layout: { orientation: 'horizontal' } },
		scope: [ 'block' ],
	},
	{
		name: `${ metadata.name }-vertical`,
		isDefault: false,
		title: __( 'Legacy Menu Vertical' ),
		icon: stack,
		attributes: { layout: { orientation: 'vertcial' } },
		scope: [ 'block' ],
	},
];

export default variations;
