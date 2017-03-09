<?php
function nret_preprocess_page(&$variables) {
	if (isset($variables['node'])) {
		$node_type = $variables['node']->type;
		$real_estate_prefix = 'real_estate';
		if (substr($node_type, 0, strlen($real_estate_prefix)) === $real_estate_prefix) {
			$variables['theme_hook_suggestions'][] = 'page__node__' . $real_estate_prefix;
		}
		$homepage_prefix = 'homepage';
		if (substr($node_type, 0, strlen($homepage_prefix)) === $homepage_prefix) {
			$variables['theme_hook_suggestions'][] = 'page__node__' . $homepage_prefix;
		}

		$menu_main_left_nav = menu_navigation_links('menu_main_left_nav');
		$variables['custom_menu'] = theme('links__menu_main_left_nav', array('links' => $menu_main_left_nav));

		$menu_main_right_nav = menu_navigation_links('menu_main_right_nav');
		$variables['custom_menu'] = theme('links__menu_main_right_nav', array('links' => $menu_main_right_nav));
	}
}
