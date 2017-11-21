(function( $ ) {

        $( '.secondary-cart' ).on( 'hover', function() {
            $( '.cart-dropdown' ).addClass( 'show-dropdown' );
            $('.secondary-cart').addClass('show-arrow');
        });

        $( '.secondary-cart' ).on( 'mouseleave', function() {
            $( '.cart-dropdown' ).removeClass( 'show-dropdown' );
            $('.secondary-cart').removeClass('show-arrow');
        });

})( jQuery );