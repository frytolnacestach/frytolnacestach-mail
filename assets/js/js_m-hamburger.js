$( document ).ready(function() {
    $( ".js_m-hamburger" ).click(function() {
        $status = $(this).data( "hamburger" );

        if ($status == "close") {
            $(this).data('hamburger', 'open');
            $(this).addClass('open');
            $(".t-header").addClass('open');
            $("html").addClass('no-scroll');
            $("body").addClass('no-scroll');
        } else {
            $(this).data('hamburger', 'close');
            $(this).removeClass('open');
            $(".t-header").removeClass('open');
            $("html").removeClass('no-scroll');
            $("body").removeClass('no-scroll');
        }
    });

    $( ".js_m-nav-main__link" ).click(function() {
        $( ".js_m-hamburger" ).data('hamburger', 'close');
        $( ".js_m-hamburger" ).removeClass('open');
        $(".t-header").removeClass('open');
        $("html").removeClass('no-scroll');
        $("body").removeClass('no-scroll');
    });
});