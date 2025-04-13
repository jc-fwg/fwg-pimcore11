/**
 * Author: Jochen Califice
 * Copyright: 2017 and forthcoming... Jochen Califice
 */
createNamespace('App.List');

createNamespace('App.List.Categories');
App.List.Categories = (function() {

    var isOpen = false;

    function init() {

        if ($('#categories-trigger').length) {
            $('#categories-trigger').click(function()
            {
                switch(isOpen) {

                    case false:
                        $('#categories li').show();
                        isOpen = true;
                    break;

                    case true:
                        $('#categories li').hide();
                        $('#categories li:first-child').show();
                        isOpen = false;
                        break;
                }
            });
        }
    }

    return {
        init: init
    };
}());

createNamespace('App.List.Items');
App.List.Items = (function() {

    function init() {

        // Bind lazy loading
        $('.lazy').Lazy({
            scrollDirection: 'vertical',
            effect: 'fadeIn',
            visibleOnly: true
        });
    }

    return {
        init: init
    };
}());

$(document).ready(function()
{
    App.List.Categories.init();
    App.List.Items.init();
});