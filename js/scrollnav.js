(function( $ ) {
    $(window).on('scroll', function() {
        var scrollTop = $(this).scrollTop(),
            navDistance = $('.main-navigation').offset().top,
            nav = $('.main-navigation-search-wrapper');

        if ( scrollTop > 150 ) {
            nav.addClass('fixed-nav');
        } else {
            nav.removeClass( 'fixed-nav' );
        }

        if ( $(window).width() >= 900  && scrollTop > 50 ) {
            nav.addClass( 'mini-nav' );
        } else {
            nav.removeClass( 'mini-nav' );
        }
    });
})( jQuery );