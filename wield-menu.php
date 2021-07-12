<?php

/**
 * Plugin Name: Wield Menu
 * Plugin URI: https://github.com/alpipego/wield-menu.git
 * Description: Makes long and complex menus easier editable
 * Version: 1.2.1
 * Author: alpipego <alpipego@gmail.com>
 * Author URI: https://alpipego.com/
 * License: MIT
 */

if ( version_compare( PHP_VERSION, '5.4.0' ) >= 0 && function_exists( 'wp_add_inline_script' ) ) {
    add_action( 'admin_enqueue_scripts', function () {
        $min = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';
        wp_add_inline_script(
            is_customize_preview() ? 'customize-nav-menus' : 'nav-menu',
            file_get_contents( __DIR__ . '/js/wield-menu' . $min . '.js' )
        );
        wp_add_inline_style(
            is_customize_preview() ? 'customize-nav-menus' : 'nav-menus',
            file_get_contents( __DIR__ . '/css/wield-menu' . $min . '.css' )
        );
    } );
}
