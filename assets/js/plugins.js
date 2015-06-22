// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

/*!
 * jQuery viewportOffset - v0.3 - 2/3/2010
 * http://benalman.com/projects/jquery-misc-plugins/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Like the built-in jQuery .offset() method, but calculates left and top from
// the element's position relative to the viewport, not the document.

(function($){
  var win = $(window);
  
    $.fn.viewportOffset = function() {
        var self   = $(this),
            offset = self.offset(),
            height = self.outerHeight(),
            width  = self.outerWidth();

        return {
            top: offset.top - win.scrollTop(),
            right: (offset.left + width) - win.scrollLeft(),
            bottom: (offset.top + height) - win.scrollTop(),
            left: offset.left - win.scrollLeft()
        };
    };

})(jQuery);

// Detect if element is within viewport
$.fn.extend({
    inSight: function (senstitivity) {          
        var w = $(window),
        s = senstitivity || 0,
        viewportTop = w.scrollTop() - s,
        viewportBottom = (w.height() + w.scrollTop() + s),
        viewportLeft = w.scrollLeft() - s,
        viewportRight = (w.width() + w.scrollLeft() + s),               
        i = 0,
        l = this.length;
        for ( ; i < l; i++ ) {
            var e = $(this[i]);
            if ( (e.offset().top <  viewportBottom) && (e.offset().top + e.height() > viewportTop) && (e.offset().left <  viewportRight) && (e.offset().left + e.width() > viewportLeft) && (e.css('display') != 'none')  && (e.css('visibility') != 'hidden') && (e.css('opacity') != '0') ) {
                return true; 
            }
        }
        return false;
    }
});

// equal heights on columns in a row
$.fn.eqHeights = function(options) {
    var defaults = {  
        child: false 
    };  
    var options = $.extend(defaults, options); 
    var el = $(this);

    if( options.child && options.child.length > 0 ){
        var elmtns = $(options.child, this);
    } else {
        var elmtns = $(this).children();
    }

    var prevTop = 0;
    var max_height = 0;
    var elements = [];
    elmtns.height('auto').each(function() {
        var thisTop = this.offsetTop;

        if (prevTop > 0 && prevTop != thisTop) {
            $(elements).height(max_height);
            max_height = $(this).height();
            elements = [];
        }
        max_height = Math.max(max_height, $(this).height());

        prevTop = this.offsetTop;
        elements.push(this);
    });

    $(elements).height(max_height);
};