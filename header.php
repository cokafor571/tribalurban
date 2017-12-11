<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Starterpack
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-svg">
<head>

<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'starterpack' ); ?></a>

<div class="control-header-height">
    <div class="main-navigation-wrapper">   <!-- wrapper placeholder for fixed nav -->
        <div class="main-navigation-search-wrapper">   <!--wrap search bar in navigation-->
            <nav id="site-navigation" class="main-navigation" role="navigation"> <!-- beign navigation containing social, navigation and account/cart/search menus -->


                <div class="social-account-header">     <!--social menu in header-->
                    <div class="social-icons">
                        <a class="instagram" href="https://www.instagram.com/tribalgauges/" target="_blank"><i class="fa fa-instagram" aria-hidden="true"></i></a>
                        <a class="facebook" href="https://www.facebook.com/TribalGauges/" target="_blank"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                        <a class="pinterest" href="https://www.pinterest.com/tribalgauges/" target="_blank"><i class="fa fa-pinterest-p" aria-hidden="true"></i></a>
                    </div>
                    <a href="http://tribalurban.dev/my-account/" class="tooltip-account">    <!--my-account-->
                        <i class="fa fa-user-circle" aria-hidden="true"></i>
                        <span>My Account</span>
                    </a> 
                </div>      <!-- end social header menu -->

                <?php wp_nav_menu( array( 'theme_location' => 'menu-1', 'menu_id' => 'primary-menu' ) ); ?>     <!-- header navigation links -->

                <div class="woo-menu"> <!-- begin menu containing in order, account; cart; search -->   
                    
                    <?php if ( in_array( 'woocommerce/woocommerce.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) ) ) { ?>      <!-- cart header menu container -->
                            
                        <div class="secondary-cart">
                            <?php $items = WC()->cart->get_cart();
                            $item_count = count($items); ?>
                            
                            <a class="cart-contents" href="<?php echo wc_get_cart_url(); ?>" title="<?php _e( 'View your shopping cart' ); ?>">
                            <?php if ( $item_count > 0 ) : ?>
                                <span class="cart-contents-count"><?php echo $item_count; ?></span>
                            <?php endif; ?>
                            </a>
                            
                            <div class="cart-dropdown">
                                <div class="cart-dropdown-inner">
                                    <?php woocommerce_mini_cart(); ?>
                                </div>
                            </div>
                        </div>

                    <?php } ?>      <!-- end cart container -->

                    <div class="search-header">     <!-- Search icon -->
                        SEARCH <i class="fa fa-search" aria-hidden="true"></i>     
                    </div>

                </div>  <!--end menu container containing account; cart; search; -->


                <button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><i class="fa fa-bars" aria-hidden="true"></i></button>
                
            </nav><!-- end site-navigation -->

            <div class="show-search">   <!-- #hide and show search -->
                <form role="search" method="get" class="woocommerce-product-search" action="<?php echo esc_url( home_url( '/' ) ); ?>">
                    <label class="screen-reader-text" for="woocommerce-product-search-field-<?php echo isset( $index ) ? absint( $index ) : 0; ?>"><?php _e( 'Search for:', 'woocommerce' ); ?></label>
                    <input type="search" id="woocommerce-product-search-field-<?php echo isset( $index ) ? absint( $index ) : 0; ?>" class="search-field" placeholder="<?php echo esc_attr__( 'Search products&hellip;', 'woocommerce' ); ?>" value="<?php echo get_search_query(); ?>" name="s" />
                    <input type="submit" value="&#xf002;" />
                    <input type="hidden" name="post_type" value="product" />
                </form>
            </div>

        </div>  <!-- end nav search wrapper -->
    </div>  <!-- end nav wrapper placeholder -->

        <div class="logo-container">    <!-- logo on separate line -->
            <?php the_custom_logo(); ?>     
        </div>

        <?php
        if (  is_woocommerce() ) :

            $args = array(
                'delimiter' => ' / '
            );

            woocommerce_breadcrumb( $args ); 
            
        endif; 
    
    if ( ! is_woocommerce() && ! is_cart()  && ! is_checkout() ) : ?>
	<header id="masthead" class="site-header" role="banner">
        <figure class="header-image"> <?php the_header_image_tag(); ?> </figure>
		<div class="site-branding">

            <div class="site-branding-text">
                <?php
                if ( is_front_page() ) : ?>
                    <h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
                <?php else : ?>
                    <header class="entry-header"><?php the_title( '<h1 class="entry-title">', '</h1>' ); ?></header>
                <?php
                endif;

                if ( is_front_page() ) : ?>
                    <div class="site-description">
                        <h2>Holistic Solutions for your Body</h2>
                        <div class="header-buttons">
                            <a class="shop-button" href="#"><span>Shop</span></a>
                        </div>
                    </div>
                <?php
                endif; ?>
            </div>
            
		</div><!-- .site-branding -->

	</header><!-- #masthead -->
</div> <!-- end control header height -->
    <?php elseif ( is_woocommerce() && ! is_single() ) : ?>
            <header class="woocommerce-products-header">

                <?php if ( apply_filters( 'woocommerce_show_page_title', true ) ) : ?>

                    <h1 class="woocommerce-products-header__title page-title"><?php woocommerce_page_title(); ?></h1>

                <?php endif; ?>

                <?php
                    /**
                        * woocommerce_before_shop_loop hook.
                        *
                        * @hooked wc_print_notices - 10
                        * @hooked woocommerce_result_count - 20
                        * @hooked woocommerce_catalog_ordering - 30
                        */
                    do_action( 'woocommerce_before_shop_loop' );
                ?>

            </header>
        </div>
        <?php endif; ?>

	<div id="content" class="site-content">
