(function( $ ) {

    //var tripHeader = sessionStorage.getItem( 'tripHeader' );

    //if ( tripHeader ) { 
        //$('.page-header').css({
            //display: 'none'
       // });
       // console.log( 'tripHeader' );
   // }

    $( '.fa-times' ).on( 'click', function() {
        $( '.control-header-height' ).css({
            top: '-40px'
        });
        //sessionStorage.setItem('tripHeader', 'none');
    });
})( jQuery );