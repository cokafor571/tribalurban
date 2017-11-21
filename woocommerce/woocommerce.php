<?php

get_header();

woocommerce_content();
if ( is_shop() ||  is_product_category()  ) :  get_sidebar( 'sidebar-1' );
endif;

get_footer();