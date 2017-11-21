(function( $ ) {
    $(window).on('scroll', function() { 
        var scrollTop = $(this).scrollTop(); 
            accessoriesDistance = $('.accessories').offset().top - 650;
            eventsDistance = $('.events').offset().top - 650;

        if ( scrollTop >= accessoriesDistance ) {
           $('.accessories').addClass( 'animate-element' );
        }

        if ( scrollTop >= eventsDistance ) {
           $('.events').addClass( 'animate-element' );
        }

        if ( scrollTop >= 0 ) {
            $('.intro').addClass( 'animate-element' );
        }

    });
})( jQuery );