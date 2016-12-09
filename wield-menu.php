<?php

/**
 * Plugin Name: Wield Menu
 * Plugin URI: https://github.com/alpipego/wield-menu.git
 * Description: Makes long and complex menus more editable (without adding additional features)
 * Version: 1.0.0
 * Author: alpipego <alpipego@gmail.com>
 * Author URI: https://alexandergoller.com/
 * License: MIT
 */

if ( version_compare( PHP_VERSION, '5.4.0' ) >= 0 ) {
	add_action( 'admin_enqueue_scripts', function () {
		wp_add_inline_script( 'nav-menu', file_get_contents( __DIR__ . '/assets/wield-menu.js' ) );
		wp_add_inline_style( 'nav-menus', file_get_contents( __DIR__ . '/assets/wield-menu.css' ) );
	} );
}