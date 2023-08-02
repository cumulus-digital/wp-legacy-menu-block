/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';

import metadata from './block.json';

import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	JustifyToolbar,
	BlockVerticalAlignmentToolbar,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import {
	Spinner,
	Panel,
	PanelBody,
	SelectControl,
	TextControl,
	__experimentalNumberControl as NumberControl,
	Disabled,
} from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( props ) {
	const { attributes, setAttributes, className } = props;
	const {
		justifyContent,
		verticalAlignment,
		layout: { orientation = 'horizontal' } = {},
	} = attributes;
	const blockProps = useBlockProps( {
		className: classnames( className, {
			'items-justified-right': justifyContent === 'right',
			'items-justified-space-between': justifyContent === 'space-between',
			'items-justified-left': justifyContent === 'left',
			'items-justified-center': justifyContent === 'center',
			'items-aligned-top': verticalAlignment === 'top',
			'items-aligned-center': verticalAlignment === 'center',
			'items-aligned-bottom': verticalAlignment === 'bottom',
			'is-vertical': orientation === 'vertical',
		} ),
	} );

	const { availableMenus } = useSelect( ( select ) => {
		return { availableMenus: select( 'core' ).getMenus() };
	}, [] );

	const MySpinner = () => {
		return (
			<>
				<Spinner />
				<small>Loading Menu&hellip;</small>
			</>
		);
	};

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<Panel>
					<PanelBody>
						<SelectControl
							label="Classic Menu"
							value={ attributes.menuId }
							onChange={ ( val ) =>
								setAttributes( { menuId: parseInt( val ) } )
							}
							options={
								availableMenus && [
									{ label: 'Select a menu...' },
									...availableMenus.map( ( menu ) => ( {
										label: menu.name,
										value: menu.id,
									} ) ),
								]
							}
						/>
					</PanelBody>
				</Panel>
			</InspectorControls>
			<InspectorControls group="advanced">
				<TextControl
					label="Aria Role"
					value={ attributes.ariaRole }
					onChange={ ( val ) => setAttributes( { ariaRole: val } ) }
				/>
				<NumberControl
					label="Tab Index"
					value={ attributes.tabIndex }
					onChange={ ( val ) => setAttributes( { tabIndex: val } ) }
				/>
				<NumberControl
					label="Menu Depth"
					value={ attributes.menuDepth }
					onChange={ ( val ) => setAttributes( { menuDepth: val } ) }
					help="Controls how many levels of menu items will be displayed."
				/>
			</InspectorControls>
			<BlockControls>
				<JustifyToolbar
					value={ attributes.justifyContent }
					onChange={ ( val ) =>
						setAttributes( { justifyContent: val } )
					}
				/>
				<BlockVerticalAlignmentToolbar
					value={ attributes.verticalAlignment }
					onChange={ ( val ) =>
						setAttributes( { verticalAlignment: val } )
					}
				/>
			</BlockControls>
			<Disabled>
				<ServerSideRender
					block={ metadata.name }
					attributes={ attributes }
					EmptyResponsePlaceholder={ MySpinner }
				/>
			</Disabled>
		</div>
	);
}
