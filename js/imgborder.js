(function( $ ) {
    $( '.imgwrapper' ).on('mouseover', function() {

        $(this).find( '.btb' ).stop( true, false ).animate({ 
            height: '100%' 
        }, 1000 ); 

        $(this).find( '.btr' ).stop( true, false ).animate({ 
            width: '100%' 
        }, 1000 );

        $(this).find( '.bbt' ).stop( false, false ).animate({ 
            height: '100%' 
        }, 1000 ); 

        $(this).find( '.bbl' ).stop( false, false ).animate({ 
            width: '100%' 
        }, 1000 ); 

    });

    $( '.imgwrapper' ).on('mouseout', function() {

        $( '.btb' ).stop( false, false ).animate({ 
            height: '0' 
        }, 800 ); 

        $( '.btr' ).stop( false, false ).animate({ 
            width: '0' 
        }, 800 );

        $( '.bbt' ).stop( false, false ).animate({ 
            height: '0' 
        }, 800 ); 

        $( '.bbl' ).stop( false, false ).animate({ 
            width: '0' 
        }, 800 ); 

    });
})( jQuery );