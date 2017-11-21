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
                data:'action=starterpack_add_cart&prodID=' + production_id + '&variation_id=' + variation_id + '&quantity=' + quantity,

                success:function(results) {
                    $('.cart-dropdown-inner').html(results);
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
                data:'action=starterpack_add_cart&prodID=' + prodID + '&quantity=' + quantity,

                success:function(results) {
                    $('.cart-dropdown-inner').html(results);
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
	}); /*

    $('.single_add_to_cart_button').click(function(e) {    
	e.preventDefault();
	$(this).addClass('adding-cart');
	var product_id = $(this).attr('data-product_id');
	var variation_id = $('input[name="variation_id"]').val();
	var quantity = $('input[name="quantity"]').val();
	$('.cart-dropdown-inner').empty();

	if (variation_id !== '') {
		$.ajax ({
			url: starterpack_ajax_object.ajax_url,
			type:'POST',
			data:'action=starterpack_add_cart_single&product_id=' + product_id + '&variation_id=' + variation_id + '&quantity=' + quantity,

			success:function(results) {
				$('.cart-dropdown-inner').append(results);
                console.log(results);
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
			data:'action=starterpack_add_cart_single&product_id=' + product_id + '&quantity=' + quantity,

			success:function(data) {
				$('.cart-dropdown-inner').append(results);
                console.log('reached me');
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
    }); */
})( jQuery );