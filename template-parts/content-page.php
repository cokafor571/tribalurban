<?php
/**
 * Template part for displaying page content in page.php
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Starterpack
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

    <?php if ( has_post_thumbnail() ) { ?>

        <figure class="featured-image full-bleed">
            <?php the_post_thumbnail( 'starterpack-full-bleed' ); ?>
        </figure>

    <?php } ?>

	<div class="entry-content post-content">
		<?php

			if( is_cart() && !is_checkout() ) : ?>
				<div class="cart-checkout-header">
					<a class="active" href="/cart">Shopping Cart</a>
					<i class="fa fa-angle-right" aria-hidden="true"></i>
					<a href="/checkout">Checkout Details</a>
					<i class="fa fa-angle-right" aria-hidden="true"></i>
					<span>Order Complete</span>
				</div>		
			<?php elseif ( !is_cart() && is_checkout() ) : ?>
				<div class="cart-checkout-header">
					<a class="active" href="/cart">Shopping Cart</a>
					<i class="fa fa-angle-right" aria-hidden="true"></i>
					<a class="active" href="/checkout">Checkout Details</a>
					<i class="fa fa-angle-right" aria-hidden="true"></i>
					<span>Order Complete</span>
				</div>	
			<?php endif;


			the_content();

			wp_link_pages( array(
				'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'starterpack' ),
				'after'  => '</div>',
			) );
		?>
	</div><!-- .entry-content -->

	<?php if ( get_edit_post_link() ) : ?>
		<footer class="entry-footer">
			<?php
				edit_post_link(
					sprintf(
						/* translators: %s: Name of current post */
						esc_html__( 'Edit %s', 'starterpack' ),
						the_title( '<span class="screen-reader-text">"', '"</span>', false )
					),
					'<span class="edit-link">',
					'</span>'
				);
			?>
		</footer><!-- .entry-footer -->
	<?php endif; ?>
    <?php get_sidebar( 'page' ); ?>
</article><!-- #post-## -->
