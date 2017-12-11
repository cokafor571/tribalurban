(function( $ ) {
        $('.ajax_add_to_cart').click(function(e) {
		e.preventDefault();
		var prodID = $(this).attr('data-product_id');
        var production_id = $('input[name="product_id"]').val();
        var variation_id = $('input[name="variation_id"]').val();
        var quantity = $('input[name="quantity"]').val();
        $(this).addClass('adding-cart');
		$('.cart-dropdown-inner').empty();

        if (variation_id) {
            $.ajax ({
                url: starterpack_ajax_object.ajax_url,
                type:'POST',
                dataType: 'json',
                data: {
                    action: "starterpack_add_cart",
                    production_id: production_id,
                    variation_id: variation_id,
                    quantity: quantity
                },

                success: function(response) {
                    if ( ! response || response.error )
                        return;

                    var fragments = response.fragments;

                    // Replace fragments
                    if ( fragments ) {
                        $.each( fragments, function( key, value ) {
                            $( key ).replaceWith( value );
                        });
                    }
                    var cartcount = $('.item-count').html();
                    $('.cart-totals span').html(cartcount);
                    $('.products .add_to_cart_button').removeClass('adding-cart');
                    $('.secondary-cart').addClass('show-arrow');
                    $('.cart-dropdown').addClass('show-dropdown');
                    setTimeout(function () { 
                        $('.cart-dropdown').removeClass('show-dropdown');
                    }, 3000);
                    setTimeout(function () { 
                        $('.secondary-cart').removeClass('show-arrow');
                    }, 3000);
                }
            });
        } else {
            $.ajax ({
                url: starterpack_ajax_object.ajax_url,
                type:'POST',
                dataType: 'json',
                data: {
                    action: "starterpack_add_cart",
                    prodID: prodID,
                    quantity: quantity
                },

                success: function(response) {
                    if ( ! response || response.error )
                        return;

                    var fragments = response.fragments;

                    // Replace fragments
                    if ( fragments ) {
                        $.each( fragments, function( key, value ) {
                            $( key ).replaceWith( value );
                        });
                    }
                    var cartcount = $('.item-count').html();
                    $('.cart-totals span').html(cartcount);
                    $('.products .add_to_cart_button').removeClass('adding-cart');
                    $('.secondary-cart').addClass('show-arrow');
                    $('.cart-dropdown').addClass('show-dropdown');
                    setTimeout(function () { 
                        $('.cart-dropdown').removeClass('show-dropdown');
                    }, 3000);
                    setTimeout(function () { 
                        $('.secondary-cart').removeClass('show-arrow');
                    }, 3000);
                }
            });
        }
	}); 
})( jQuery );