/*list js class for cookies dialog*/
//js_cookies-edit
//js_o-cookies-dialog
//js_o-cookies-dialog__button--setting
//js_o-cookies-dialog__button--all
//js_o-cookies-dialog__button--technical
//js_o-cookies-dialog__button--select
//js_o-cookies-dialog__setting--user
//js_o-cookies-dialog__setting--statistic
//js_o-cookies-dialog__setting--marketing
//js_o-cookies-dialog__page--welcome
//js_o-cookies-dialog__page--setting

$( document ).ready(function() {

    //--------------
    //FUNCTIONS

    //Cookies create
    function cookiesCreate(){
        var now = new Date();
        now.setMonth( now.getMonth() + 1 );
        let expires = "expires="+ now;
        
        document.cookie = "FNCcookiesDialog=1;" + expires;
    }

    //Cookies create type
    function cookiesCreateType(type){
        var now = new Date();
        now.setMonth( now.getMonth() + 1 );
        let expires = "expires="+ now;

        document.cookie = "FNCcookies" + type +"=1;" + expires;
    }

    //Cookies delete type
    function cookiesDeleteType(type){        
        document.cookie = "FNCcookies" + type +"=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    //show cookies dialog
    function cookiesDialog(){
        if (document.cookie.indexOf("FNCcookiesDialog=1") == -1) {
            $(".js_o-cookies-dialog").addClass('open'); 
        }
    }

    //Control custom cookies
    function cookiesCustom(){
        var $number = 0;
        $status1 = $(".js_o-cookies-dialog__setting--user").data( "c-user" );
        if ($status1 == "on"){
            $number++;
        }

        $status2 = $(".js_o-cookies-dialog__setting--statistic").data( "c-statistic" );
        if ($status2 == "on"){
            $number++;
        }

        $status3 = $(".js_o-cookies-dialog__setting--marketing").data( "c-marketing" );
        if ($status3 == "on"){
            $number++;
        }

        if ($number == 0) {
            $(".js_o-cookies-dialog__button--select").removeClass('show');
            $(".js_o-cookies-dialog__button--technical").addClass('show');
        } else {
            $(".js_o-cookies-dialog__button--technical").removeClass('show');
            $(".js_o-cookies-dialog__button--select").addClass('show'); 
        }
    }


    //--------------
    //INITIALIZATION

    //Initialization
    if (document.cookie.indexOf("FNCcookiespersonalization_storage=1") == -1) {
        $( ".js_o-cookies-dialog__setting--user" ).data('c-user', 'off');
        $( ".js_o-cookies-dialog__setting--user" ).addClass('off');
    } else {
        $( ".js_o-cookies-dialog__setting--user" ).data('c-user', 'on');
        $( ".js_o-cookies-dialog__setting--user" ).addClass('on');
    }

    if (document.cookie.indexOf("FNCcookiesanalytics_storage=1") == -1) {
        $( ".js_o-cookies-dialog__setting--statistic" ).data('c-statistic', 'off');
        $( ".js_o-cookies-dialog__setting--statistic" ).addClass('off');
    } else {
        $( ".js_o-cookies-dialog__setting--statistic" ).data('c-statistic', 'on');
        $( ".js_o-cookies-dialog__setting--statistic" ).addClass('on'); 
    }

    if (document.cookie.indexOf("FNCcookiesad_storage=1") == -1) {
        $( ".js_o-cookies-dialog__setting--marketing" ).data('c-marketing', 'off');
        $( ".js_o-cookies-dialog__setting--marketing" ).addClass('off');
    } else {
        $( ".js_o-cookies-dialog__setting--marketing" ).data('c-marketing', 'on');
        $( ".js_o-cookies-dialog__setting--marketing" ).addClass('on');
    }
    cookiesDialog();
    cookiesCustom();


    //--------------
    //ACTIONS

    //Přijmám vše
    $( ".js_o-cookies-dialog__button--all" ).click(function() {
        $(".js_o-cookies-dialog").removeClass('open');
        $("html").removeClass('no-scroll-bg');
        $("body").removeClass('no-scroll-bg');
        $(".js_o-cookies-dialog__page--setting").removeClass('open');
        $(".js_o-cookies-dialog__page--welcome").addClass('open');

        gtag('consent', 'update', {
            'functionality_storage': 'granted',
            'security_storage': 'granted',
            'personalization_storage': 'granted',
            'analytics_storage': 'granted',
            'ad_storage': 'granted'
        });
        cookiesCreateType("personalization_storage");
        cookiesCreateType("analytics_storage");
        cookiesCreateType("ad_storage");

        cookiesCreate();
    });

    //Upravit preference
        $( ".js_o-cookies-dialog__button--setting" ).click(function() {
        $(".js_o-cookies-dialog__page--welcome").removeClass('open');
        $(".js_o-cookies-dialog__page--setting").addClass('open');
        $(this).data('data-cookies-setting', 'visible');
        $("html").addClass('no-scroll-bg');
        $("body").addClass('no-scroll-bg');
    });

    //Povolit pouze nezbytné
    $( ".js_o-cookies-dialog__button--technical" ).click(function() {
        $(".js_o-cookies-dialog").removeClass('open');
        $("html").removeClass('no-scroll-bg');
        $("body").removeClass('no-scroll-bg');
        $(".js_o-cookies-dialog__page--setting").removeClass('open');
        $(".js_o-cookies-dialog__page--welcome").addClass('open');

        gtag('consent', 'update', {
            'functionality_storage': 'granted',
            'security_storage': 'granted',
            'personalization_storage': 'denied',
            'analytics_storage': 'denied',
            'ad_storage': 'denied'
        });

        cookiesCreate();
    });

    //Povolit vybrané
    $( ".js_o-cookies-dialog__button--select" ).click(function() {
        $(".js_o-cookies-dialog").removeClass('open');
        $("html").removeClass('no-scroll-bg');
        $("body").removeClass('no-scroll-bg');
        $(".js_o-cookies-dialog__page--setting").removeClass('open');
        $(".js_o-cookies-dialog__page--welcome").addClass('open');
    });

    //Form - Preferenční
    $( ".js_o-cookies-dialog__setting--user" ).click(function() {
        $status = $(this).data( "c-user" );
        
        if ($status == "off") {
            $(this).data('c-user', 'on');
            $(this).addClass('on');
            gtag('consent', 'update', {
                'personalization_storage': 'granted'
            });
            cookiesCreateType("personalization_storage");
        } else {
            $(this).data('c-user', 'off');
            $(this).removeClass('on');
            gtag('consent', 'update', {
                'personalization_storage': 'denied'
            });
            cookiesDeleteType("personalization_storage");
        }

        cookiesCustom();
        cookiesCreate();
    });

    //Form - Statistické
    $( ".js_o-cookies-dialog__setting--statistic" ).click(function() {
        $status = $(this).data( "c-statistic" );

        if ($status == "off") {
            $(this).data('c-statistic', 'on');
            $(this).addClass('on');
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
            cookiesCreateType("analytics_storage");
        } else {
            $(this).data('c-statistic', 'off');
            $(this).removeClass('on');
            gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
            cookiesDeleteType("analytics_storage");
        }

        cookiesCustom();
        cookiesCreate();
    });

    //Form - Marketingové
    $( ".js_o-cookies-dialog__setting--marketing" ).click(function() {
        $status = $(this).data( "c-marketing" );

        if ($status == "off") {
            $(this).data('c-marketing', 'on');
            $(this).addClass('on');
            gtag('consent', 'update', {
                'ad_storage': 'granted'
            });
            cookiesCreateType("ad_storage");
        } else {
            $(this).data('c-marketing', 'off');
            $(this).removeClass('on');
            gtag('consent', 'update', {
                'ad_storage': 'denied'
            });
            cookiesDeleteType("ad_storage");
        }

        cookiesCustom();
        cookiesCreate();
    });

    //Cookies edit
    $( ".js_cookies-edit" ).click(function() {
        $(".js_o-cookies-dialog").addClass('open');
    });
});