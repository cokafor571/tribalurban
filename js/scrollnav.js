(function( $ ) {
    $(window).on('scroll', function() {
        var scrollTop = $(this).scrollTop(),
            navDistance = $('.main-navigation').offset().top,
            nav = $('.main-navigation');

        if ( scrollTop === 0 ) {
            nav.removeClass( 'fixed-nav' ); 
        } else {
            nav.addClass('fixed-nav');
        }

        if ( $(window).width() >= 900  && scrollTop > 50 ) {
            nav.addClass( 'mini-nav' );
        } else {
            nav.removeClass( 'mini-nav' );
        }
    });
})( jQuery );