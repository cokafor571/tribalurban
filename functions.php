<?php
/**
 * Starterpack functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Starterpack
 */

if ( ! function_exists( 'starterpack_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function starterpack_setup() {
	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on Starterpack, use a find and replace
	 * to change 'starterpack' to the name of your theme in all the template files.
	 */
	load_theme_textdomain( 'starterpack', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );
	add_image_size( 'starterpack-full-bleed', 2000, 1200, true );
    add_image_size( 'starterpack-index-img', 800, 450, true );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'menu-1' => esc_html__( 'Header', 'starterpack' ),
		'social' => esc_html__( 'Social Media Menu', 'starterpack' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

	// Set up the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( 'starterpack_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );

    // Add theme support for custom logo
    add_theme_support( 'custom-logo', array(
        'width' => 90,
        'height' => 90,
        'flex-width' => true,
    ));

	add_theme_support( 'woocommerce' );
    add_theme_support( 'wc-product-gallery-zoom' );
    add_theme_support( 'wc-product-gallery-lightbox' );
    add_theme_support( 'wc-product-gallery-slider' );

}
endif;

add_action( 'after_setup_theme', 'starterpack_setup' );

/*
* Hook into woocommerce if not using inc/woocommerce method
*
*
remove_action( 'woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10);
remove_action( 'woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10);

add_action('woocommerce_before_main_content', 'starterpack_wrapper_start', 10);
add_action('woocommerce_after_main_content', 'starterpack_wrapper_end', 10);

function starterpack_wrapper_start() {
  echo '<section id="main">';
}

function starterpack_wrapper_end() {
  echo '</section>';
}
*/ 


/**
 * Register custom fonts.
 */
function starterpack_fonts_url() {
    $fonts_url = '';

    /**
     * Translators: If there are characters in your language that are not
     * supported by Source Sans Pro and PT Serif, translate this to 'off'. Do not translate
     * into your own language.
     */
    $fira_sans = _x( 'on', 'Fira Sans Pro font: on or off', 'starterpack' );

    $crimson_text = _x( 'on', 'Crimson Text font: on or off', 'starterpack' );

    $font_families = array();

    if ( 'off' !== $fira_sans ) {
        $font_families[] = 'Fira Sans:400,700';
    }

    if ( 'off' !== $crimson_text ) {
        $font_families[] = 'Crimson Text:400,700';
    }

    if ( in_array( 'on', array( $fira_sans, $crimson_text ) ) ) {

        $query_args = array(
            'family' => urlencode( implode( '|', $font_families ) ),
            'subset' => urlencode( 'latin,latin-ext' ),
        );

        $fonts_url = add_query_arg( $query_args, 'https://fonts.googleapis.com/css' );
    }

    return esc_url_raw( $fonts_url );
}

/**
 * Add preconnect for Google Fonts.
 *
 * @since Twenty Seventeen 1.0
 *
 * @param array  $urls           URLs to print for resource hints.
 * @param string $relation_type  The relation type the URLs are printed.
 * @return array $urls           URLs to print for resource hints.
 */
function starterpack_resource_hints( $urls, $relation_type ) {
    if ( wp_style_is( 'starterpack-fonts', 'queue' ) && 'preconnect' === $relation_type ) {
        $urls[] = array(
            'href' => 'https://fonts.gstatic.com',
            'crossorigin',
        );
    }

    return $urls;
}
add_filter( 'wp_resource_hints', 'starterpack_resource_hints', 10, 2 );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function starterpack_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'starterpack_content_width', 640 );
}
add_action( 'after_setup_theme', 'starterpack_content_width', 0 );

/**
 * Add custom image sizes attribute to enhance responsive image functionality
 * for content images.
 *
 * @origin Twenty Seventeen 1.0
 *
 * @param string $sizes A source size value for use in a 'sizes' attribute.
 * @param array  $size  Image size. Accepts an array of width and height
 *                      values in pixels (in that order).
 * @return string A source size value for use in a content image 'sizes' attribute.
 */
function starterpack_content_image_sizes_attr( $sizes, $size ) {
    $width = $size[0];

    if ( 900 <= $width ) {
        $sizes = '(min-width: 900px) 700px, 900px';
    }

    if ( is_active_sidebar( 'sidebar-1' ) || is_active_sidebar( 'sidebar-2' ) ) {
        $sizes = '(min-width: 900px) 600px, 900px';
    }

    return $sizes;
}
add_filter( 'wp_calculate_image_sizes', 'starterpack_content_image_sizes_attr', 10, 2 );

/**
 * Filter the `sizes` value in the header image markup.
 *
 * @origin Twenty Seventeen 1.0
 *
 * @param string $html   The HTML image tag markup being filtered.
 * @param object $header The custom header object returned by 'get_custom_header()'.
 * @param array  $attr   Array of the attributes for the image tag.
 * @return string The filtered header image HTML.
 */
function starterpack_header_image_tag( $html, $header, $attr ) {
    if ( isset( $attr['sizes'] ) ) {
        $html = str_replace( $attr['sizes'], '100vw', $html );
    }
    return $html;
}
add_filter( 'get_header_image_tag', 'starterpack_header_image_tag', 10, 3 );

/**
 * Add custom image sizes attribute to enhance responsive image functionality
 * for post thumbnails.
 *
 * @origin Twenty Seventeen 1.0
 *
 * @param array $attr       Attributes for the image markup.
 * @param int   $attachment Image attachment ID.
 * @param array $size       Registered image size or flat array of height and width dimensions.
 * @return string A source size value for use in a post thumbnail 'sizes' attribute.
 */
function starterpack_post_thumbnail_sizes_attr( $attr, $attachment, $size ) {

    if ( !is_singular() ) {
        if ( is_active_sidebar( 'sidebar-1' ) ) {
            $attr['sizes'] = '(max-width: 900px) 90vw, 800px';
        } else {
            $attr['sizes'] = '(max-width: 1000px) 90vw, 1000px';
        }
    } else {
        $attr['sizes'] = '100vw';
    }

    return $attr;
}
add_filter( 'wp_get_attachment_image_attributes', 'starterpack_post_thumbnail_sizes_attr', 10, 3 );



/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function starterpack_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'starterpack' ),
		'id'            => 'sidebar-1',
		'description'   => esc_html__( 'Add widgets here.', 'starterpack' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );

    register_sidebar( array(
        'name'          => esc_html__( 'Footer Widgets', 'starterpack' ),
        'id'            => 'sidebar-2',
        'description'   => esc_html__( 'Add footer widgets here.', 'starterpack' ),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ) );

    register_sidebar( array(
        'name'          => esc_html__( 'Page Widgets', 'starterpack' ),
        'id'            => 'sidebar-3',
        'description'   => esc_html__( 'Add page widgets here.', 'starterpack' ),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ) );
}
add_action( 'widgets_init', 'starterpack_widgets_init' );


/**
 * Enqueue scripts and styles.
 */
function starterpack_scripts() {

	/*
	* Production scripts and css
	*
    // Enque google fonts: 
    wp_enqueue_style( 'google-fonts', 'https://fonts.googleapis.com/css?family=Lato:400,700' );

	// This stylesheet is minified
	wp_enqueue_style( 'starterpack-style', get_stylesheet_uri() );

	wp_enqueue_script( 'starterpack-navigation', get_template_directory_uri() . '/js/navigation.min.js', array( 'jquery' ), '20151215', true );
    wp_localize_script( 'starterpack-navigation', 'starterpackScreenReaderText', array(
        'expand' => __( 'Expand child menu', 'starterpack' ),
        'collapse' => __( 'Collapse child menu', 'starterpack' ),
    ) );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

	if ( is_front_page() ) {
		wp_enqueue_script( 'fpscripts', get_template_directory_uri() . '/js/fpscripts.min.js', array(), '20171022', true );
	} else {
		wp_enqueue_script( 'scripts', get_template_directory_uri() . '/js/scripts.min.js', array(), '20171022', true );
	}

	//move error notice on checkout page
	global $wp_scripts; 
	$wp_scripts->registered[ 'wc-checkout' ]->src =  get_template_directory_uri() . '/js/woocommerce/checkout.min.js';

    wp_enqueue_script( 'addviewcart', get_template_directory_uri() . '/js/addviewcart.min.js', array(), '20171022', true );
    wp_localize_script( 'addviewcart', 'starterpack_ajax_object', array( 'ajax_url' => admin_url( 'admin-ajax.php' ) ) );

    wp_enqueue_style( 'fa-icons', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' );
	*/

	/*
	* Development scripts and css
	*
	*/
    // Enque google fonts: 
    wp_enqueue_style( 'google-fonts', 'https://fonts.googleapis.com/css?family=Montserrat:400,700' );

	// May Need to unminify this stylesheet
	wp_enqueue_style( 'starterpack-style', get_stylesheet_uri() );

	// Full bleed images
    wp_enqueue_script( 'starterpack-functions', get_template_directory_uri() . '/js/functions.js', array( 'jquery' ), '20170516', true );

	wp_enqueue_script( 'starterpack-navigation', get_template_directory_uri() . '/js/navigation.js', array( 'jquery' ), '20151215', true );
    wp_localize_script( 'starterpack-navigation', 'starterpackScreenReaderText', array(
        'expand' => __( 'Expand child menu', 'starterpack' ),
        'collapse' => __( 'Collapse child menu', 'starterpack' ),
    ) );

    wp_enqueue_script( 'starterpack-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20151215', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

	//move error notice on checkout page
	global $wp_scripts; 
	$wp_scripts->registered[ 'wc-checkout' ]->src =  get_template_directory_uri() . '/js/woocommerce/checkout.js';

    wp_enqueue_script( 'scrollnav', get_template_directory_uri() . '/js/scrollnav.js', array(), '20171022', true );

    wp_enqueue_script( 'scrolltoelement', get_template_directory_uri() . '/js/scrolltoelement.js', array(), '20171022', true );

    wp_enqueue_script( 'hovercartdropdown', get_template_directory_uri() . '/js/hovercartdropdown.js', array(), '20171022', true );
	
    wp_enqueue_script( 'addviewcart', get_template_directory_uri() . '/js/addviewcart.js', array(), '20171022', true );

    wp_localize_script( 'addviewcart', 'starterpack_ajax_object', array( 'ajax_url' => admin_url( 'admin-ajax.php' ) ) );

    wp_enqueue_style( 'fa-icons', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' );
}
add_action( 'wp_enqueue_scripts', 'starterpack_scripts' );


function custom_upload_mimes( $existing_mimes = array() ) {
	// add svg to the list of mime types
	$existing_mimes['svg'] = 'image/svg';

	// return the array back to the function with our added mime type
	return $existing_mimes;
}
add_filter( 'upload_mimes', 'custom_upload_mimes' );

remove_filter('the_content', 'wpautop');

//* TN - Remove Query String from Static Resources
function remove_css_js_ver( $src ) {
    if( strpos( $src, '?ver=' ) )
    $src = remove_query_arg( 'ver', $src );
    return $src;
}
add_filter( 'style_loader_src', 'remove_css_js_ver', 10, 2 );
add_filter( 'script_loader_src', 'remove_css_js_ver', 10, 2 ); 

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/inc/jetpack.php';

/**
* Load WooCommerce compatibility file. 
*
require get_template_directory() . '/inc/woocommerce.php'; */

/**
 * Load SVG compatability
 */
require get_template_directory() . '/inc/icon-functions.php';

/* 
** Woocommere Hooks and Filters
*/
function remove_wc_breadcrumbs() {
    remove_action( 'woocommerce_before_main_content', 'woocommerce_breadcrumb', 20, 0 );
}
add_action( 'init', 'remove_wc_breadcrumbs' );


/**
 * custom_woocommerce_template_loop_add_to_cart text
*/
function custom_woocommerce_product_add_to_cart_text() {
	global $product;
	
	$product_type = $product->product_type;
	
	switch ( $product_type ) {
		case 'external':
			return __( 'Buy product', 'woocommerce' );
		break;
		case 'grouped':
			return __( 'View products', 'woocommerce' );
		break;
		case 'simple':
			return __( 'Add to cart', 'woocommerce' );
		break;
		case 'variable':
			return __( 'Choose a size', 'woocommerce' );
		break;
		default:
			return __( 'Shop', 'woocommerce' );
	}
	
}
add_filter( 'woocommerce_product_add_to_cart_text' , 'custom_woocommerce_product_add_to_cart_text' );


/* Remove single product meta */
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_meta', 40 );


//+/- finctionality add to cart single product page
function kia_add_script_to_footer(){
    if( ! is_admin() ) { ?>
    <script>
    jQuery(document).ready(function($){
    $('.quantity').on('click', '.plus', function(e) {
        $input = $(this).prev('input.qty');
        var val = parseInt($input.val());
        var step = $input.attr('step');
        step = 'undefined' !== typeof(step) ? parseInt(step) : 1;
        $input.val( val + step ).change();
    });
    $('.quantity').on('click', '.minus', 
        function(e) {
        $input = $(this).next('input.qty');
        var val = parseInt($input.val());
        var step = $input.attr('step');
        step = 'undefined' !== typeof(step) ? parseInt(step) : 1;
        if (val > 0) {
            $input.val( val - step ).change();
        } 
    });
	});
	</script>
	<?php }
}
add_action( 'wp_footer', 'kia_add_script_to_footer' );


/**
 * Ensure cart contents update when products are added to the cart via AJAX
 */
function my_header_add_to_cart_fragment( $fragments ) {
 
    ob_start();
    $count = WC()->cart->cart_contents_count;
    ?><a class="cart-contents" href="<?php echo WC()->cart->get_cart_url(); ?>" title="<?php _e( 'View your shopping cart' ); ?>"><?php
    if ( $count > 0 ) {
        ?>
        <span class="cart-contents-count"><?php echo esc_html( $count ); ?></span>
        <?php            
    }
        ?></a><?php
 
    $fragments['a.cart-contents'] = ob_get_clean();
     
    return $fragments;
}
add_filter( 'woocommerce_add_to_cart_fragments', 'my_header_add_to_cart_fragment' );


/* 
** Add to cart ajax on single product page
*/
function add_custom_loop_add_to_cart() {

	global $product;

	if ( ! $product->is_purchasable() ) {
		return;
	}

	echo wc_get_stock_html( $product );

	if ( $product->is_in_stock() ) :

		do_action( 'woocommerce_before_add_to_cart_form' ); 

		if ($product->product_type == "variable" ) {
			woocommerce_variable_add_to_cart();
		}
		else { ?>

		<form class="cart" method="post" enctype='multipart/form-data'>
			<?php
				/**
				* @since 2.1.0.
				*/
				do_action( 'woocommerce_before_add_to_cart_button' );

				/**
				* @since 3.0.0.
				*/
				do_action( 'woocommerce_before_add_to_cart_quantity' );

				?>
				<script>
				jQuery(function($) {
				$("form.cart").on("change", "input.qty", function() {
					$(this.form).find("button[data-quantity]").data("quantity", this.value);
				});
				$(document.body).on("adding_to_cart", function() {
					$("a.added_to_cart").remove();
				});
				});
				</script>
				<?php

				/**
				* @since 3.0.0.
				*/
				do_action( 'woocommerce_after_add_to_cart_quantity' );

				woocommerce_template_loop_add_to_cart();

				/**
				* @since 2.1.0.
				*/
				do_action( 'woocommerce_after_add_to_cart_button' );
			?>
		</form>

		<?php } // end else

	endif; 
	
}

remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_add_to_cart', 30 );
add_action( 'woocommerce_single_product_summary', 'add_custom_loop_add_to_cart', 30 );
add_filter('woocommerce_loop_add_to_cart_link', 'custom_woo_loop_add_to_cart_link', 10, 2);


/*
** Add to cart ajax woocommerce store
*/
function starterpack_add_cart_ajax() {
	$prodID = $_POST['prodID'];
	$quantity = $_POST['quantity'];
	$production_id = $_POST['production_id'];
	$variation_id = $_POST['variation_id'];

	if ($variation_id) {
        WC()->cart->add_to_cart( $production_iD, $quantity, $variation_id );
    } else {
        WC()->cart->add_to_cart( $prodID, $quantity);
    }

	    foreach( WC()->cart->get_cart() as $cart_item_key => $cart_item ) { 
		$_product = $cart_item['data']->post; ?>
		
		<div class="dropdown-cart-wrap">
			<div class="dropdown-cart-left">
				<!-- Checks whether the product is a variation, then display the variation image. -->
				<?php $variation = $cart_item['variation_id'];
				if ($variation) {
					echo get_the_post_thumbnail( $cart_item['variation_id'], 'thumbnail' ); 
				} else {
					echo get_the_post_thumbnail( $cart_item['product_id'], 'thumbnail' ); 
				} ?>
			</div>

			<div class="dropdown-cart-right">
				<a href="<?php echo get_permalink($_product->ID); ?>"><?php echo $_product->post_title; ?></a>
				<p class="price-amount"><?php echo $cart_item['quantity']; ?> <span>x</span>
				<?php global $woocommerce;
				$currency = get_woocommerce_currency_symbol();

				if ($variation) {
					$price = get_post_meta( $cart_item['variation_id'], '_regular_price', true);
				} else {
					$price = get_post_meta( $cart_item['product_id'], '_regular_price', true);
				}

				if ($variation) {
					$sale = get_post_meta( $cart_item['variation_id'], '_sale_price', true);
				} else {
					$sale = get_post_meta( $cart_item['product_id'], '_sale_price', true);
				}
				?>
				 
				<?php if($sale) { ?>
					<del><?php echo $currency; echo $price; ?></del> <?php echo $currency; echo $sale; ?></p>
				<?php } elseif($price) { ?>
					<?php echo $currency; echo $price; ?></p>    
				<?php } ?>
			</div>

			<div class="clear"></div>
		</div>
	<?php } ?>

	<div class="dropdown-cart-wrap dropdown-cart-subtotal">
		<div class="dropdown-cart-left">
			<h6>Subtotal:</h6>
		</div>

		<div class="dropdown-cart-right">
			<h6><?php echo WC()->cart->get_cart_total(); ?></h6>
		</div>

		<div class="clear"></div>
	</div>

	<?php $cart_url = $woocommerce->cart->get_cart_url();
	$checkout_url = $woocommerce->cart->get_checkout_url(); ?>

	<div class="dropdown-cart-wrap dropdown-cart-links">
		<div class="dropdown-cart-left dropdown-cart-link">
			<a href="<?php echo $cart_url; ?>">View Cart</a>
		</div>

		<div class="dropdown-cart-right dropdown-checkout-link">
			<a href="<?php echo $checkout_url; ?>">Checkout</a>
		</div>

		<div class="clear"></div>
	</div>

	<?php die();
}

add_action('wp_ajax_starterpack_add_cart', 'starterpack_add_cart_ajax');
add_action('wp_ajax_nopriv_starterpack_add_cart', 'starterpack_add_cart_ajax');


// more products per page
function new_loop_shop_per_page( $cols ) {
  // $cols contains the current number of products per page based on the value stored on Options -> Reading
  // Return the number of products you wanna show per page.
  $cols = 20;
  return $cols;
}

add_filter( 'loop_shop_per_page', 'new_loop_shop_per_page', 20 );


// add quantity buttons to shop page and update cart
/*function custom_woo_before_shop_link() {
    add_filter('woocommerce_loop_add_to_cart_link', 'custom_woo_loop_add_to_cart_link', 10, 2);
    add_action('woocommerce_after_shop_loop', 'custom_woo_after_shop_loop');
}
add_action('woocommerce_before_shop_loop', 'custom_woo_before_shop_link'); */


/**
* customise Add to Cart link/button for product loop
* @param string $button
* @param object $product
* @return string
*/
function custom_woo_loop_add_to_cart_link($button, $product) {
    // not for variable, grouped or external products
    if (!in_array($product->product_type, array('variable', 'grouped', 'external'))) {
        // only if can be purchased
        if ($product->is_purchasable()) {
            // show qty +/- with button
            ob_start();
            woocommerce_simple_add_to_cart();
            $button = ob_get_clean();
            // modify button so that AJAX add-to-cart script finds it
            $replacement = sprintf('data-product_id="%d" data-quantity="1" $1 ajax_add_to_cart add_to_cart_button product_type_simple ', $product->id);
            $button = preg_replace('/(class="single_add_to_cart_button)/', $replacement, $button);
        }
    }
    return $button;
}


/**
* add the required JavaScript
*/
function custom_woo_after_shop_loop() {
    ?>

    <script>
    jQuery(function($) {
    $("form.cart").on("change", "input.qty", function() {
        $(this.form).find("button[data-quantity]").data("quantity", this.value);
    });
    $(document.body).on("adding_to_cart", function() {
        $("a.added_to_cart").remove();
    });
    });
    </script>

    <?php
}