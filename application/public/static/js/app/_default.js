/**
 * Modern Arnis Langenselbold
 * Handling staff
 * Author: Jochen Califice
 * Copyright: 2014 and forthcoming... Jochen Califice
 */
createNamespace('App.Default');
createNamespace('App.Default.TopLink');
App.Default.TopLink = (function() {

    function init()
    {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 400) {

                if ($('#to-top').length <= 0) {
                    $('body').append('<div id="to-top"><img src="/static/gfx/to-top.png" alt="totop" /></div>');
                    $('#to-top').click(function () {
                        $('html, body').animate(
                            {
                                scrollTop: 0
                            }, 'slow');
                    });
                    $('#to-top').fadeIn(200);
                }
            } else {
                if ($('#to-top').length >= 1) {
                    $('#to-top').fadeOut(function () {
                        $('#to-top').remove();
                    });
                }
            }
        });
    }

    return {
        init: init
    };
}());

$(document).ready(function()
{
    var DefaultTopLink = App.Default.TopLink;
    DefaultTopLink.init();

    if ($('.js-unitegallery').length) {
        $('.js-unitegallery').unitegallery({
            tiles_min_columns: 6
        });
    }
});