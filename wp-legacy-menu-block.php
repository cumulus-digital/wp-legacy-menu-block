<?php
/**
 * Plugin Name:       Legacy Menu Block
 * Description:       WordPress block to include a Classic Menu in block themes.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.1
 * Author:            vena
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wp-legacy-menu-block
 * Plugin URI:        https://github.com/cumulus-digital/wp-legacy-menu-block/
 * GitHub Plugin URI: https://github.com/cumulus-digital/wp-legacy-menu-block/
 * Primary Branch:    main
 * Description:       WordPress block to include a Classic Menu in block themes.
 */

namespace CUMULUS\Gutenberg\Blocks\LegacyMenu;

function init() {
	\register_block_type(
		__DIR__ . '/build',
		array(
			'render_callback' => __NAMESPACE__ . '\\render_callback',
		)
	);
}
\add_action( 'init', __NAMESPACE__ . '\\init' );

function render_callback( $attributes, $content, $block ) {
	if ( empty( $attributes['menuId'] ) ) {
		return 'No menu selected';
	}

	$has_blockgap = \_wp_array_get( $attributes, array( 'style', 'spacing', 'blockGap' ) );
	$style_class  = array(
		'style' => '',
		'class' => '',
	);

	if ( $has_blockgap ) {
		// wp_style_engine_get_styles may not support blockGap yet, causing blockGap
		// to not be included in get_block_wrapper_attributes
		$style_attrs       = \wp_style_engine_get_styles( $attributes['style'] );
		$supports_blockgap = \_wp_array_get( $style_attrs, array( 'declarations', 'blockGap' ) );

		if ( ! $supports_blockgap ) {
			// we abuse the fact tht blockGap and margin should support the same attributes
			$temp_style = array(
				'spacing' => array(
					'margin' => $has_blockgap,
				),
			);
			$parsed_style = \wp_style_engine_get_styles( $temp_style );
			$gap          = \_wp_array_get( $parsed_style, array( 'css' ) );
			if ( $gap ) {
				// Replace margin properties with gap properties
				$gap = \str_replace(
					array( 'margin-top', 'margin-left', 'margin' ),
					array( 'row-gap', 'column-gap', 'gap' ),
					$gap
				);
				$style_class['style'] .= ";{$gap}";
			}
		}
	}

	// Justification and align are only actually supported in layout with InnerBlocks,
	// so we use custom attributes.

	$valid_justification = array(
		'left',
		'right',
		'center',
		'space-between',
	);
	$has_justification = \_wp_array_get( $attributes, array( 'justifyContent' ) );
	if ( $has_justification && \in_array( $has_justification, $valid_justification ) ) {
		$style_class['class'] .= " items-justified-{$has_justification}";
	}

	$valid_aligns = array(
		'top',
		'center',
		'bottom',
	);
	$has_alignment = \_wp_array_get( $attributes, array( 'verticalAlignment' ) );
	if ( $has_alignment && \in_array( $has_alignment, $valid_aligns ) ) {
		$style_class['class'] .= " items-aligned-{$has_alignment}";
	}

	// Remove leading/trailing spaces and ; from extra_attrs
	\array_walk( $style_class, function ( &$val ) {
		$val = \trim( $val, " \t\n\r\0\x0B;" );
	} );

	$extra_attributes = \array_filter( array(
		'role'     => $attributes['ariaRole'] ?? 'menu',
		'tabindex' => $attributes['tabIndex'] ?? null,
	) );

	return \sprintf(
		'<nav %1$s %2$s>%3$s</nav>',
		\get_block_wrapper_attributes( $style_class ),
		\implode( ' ', \array_map( function ( $v, $k ) {
			return $k . '="' . \esc_attr( $v ) . '"';
		}, $extra_attributes, \array_keys( $extra_attributes ) ) ),
		\wp_nav_menu(
			array(
				'echo'      => false,
				'menu'      => $attributes['menuId'],
				'container' => false,
				'depth'     => $attributes['menuDepth'] ?? 1,
			)
		)
	);
}
