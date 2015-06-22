
var $viewport = $('html, body');
delayTimers = [];

// Mobile detection
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};       

testMobile = isMobile.any();

var detectmob = false;
if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)) {
    detectmob = true;
}

// Get current viewport width ...
screenWidth = (function() {
    f = document,
    a = window

    if (a.innerWidth === undefined) {
        return f.documentElement.clientWidth;
    } else if (f.all) {
        return a.innerWidth;
    } else {
        return window.innerWidth;
    }
});


function scrollevents() {
    if(screenWidth() > 641 && !testMobile){
        // Sticky navigation
        var scrollTop = $(window).scrollTop(),
        screenHeight = $(window).outerHeight();
        if (scrollTop > screenHeight -200){    
            $('.main-nav').addClass('sticky');
            $('.logo').addClass('sticky-logo');
        } else {
            $('.main-nav').removeClass('sticky');
            $('.logo').removeClass('sticky-logo');
        }
    }
}


// Get Sections top position
function getTargetTop(elem){        
    //gets the id of the section header
    //from the navigation's href e.g. ("#html")
    var id = elem.attr("href");
    //Height of the navigation
    var offset = $('.main-nav').outerHeight();
    //Gets the distance from the top and 
    //subtracts the height of the nav.
    return $(id).offset().top - offset;
}

// Pulling sections from main nav.
var sections = $('.main-nav a[href^="#"]');

// Go through each section to see if it's at the top.
// if it is add an active class
function checkSectionSelected(scrolledTo){
    //How close the top has to be to the section.
    var threshold = 400;
    var i;

    for (i = 0; i < sections.length; i++) {            
        // get next nav item
        var section = $(sections[i]);
        // get the distance from top
        var target = getTargetTop(section);            
        // Check if section is at the top of the page.
        if (scrolledTo > target - threshold && scrolledTo < target + threshold) {
            // remove all selected elements
            sections.parent().removeClass("active");
            // add current selected element.
            section.parent().addClass("active");
        }
    };
}

$.fn.infoBox = function(){
    var close = $('.close'),
        boxes = $('.info-text');

    boxes.addClass('closed');
    close.text('>');

    close.on('click', function(e){
        e.preventDefault();

        var self = $(this),
            box = self.parent(),
            image = self.parent().prev('img');

        box.toggleClass('closed');
        image.toggleClass('faded');
        (self.text() === ">") ? self.text("X") : self.text(">");
    });
}

$.fn.triggerMenus = function(trigger){
    var self = $(this);
    self.click(function(){
        $(trigger).slideToggle();
    });
}

// simulates inherit height of child-element
// use -> $(element).mimicInherit(padding) <- padding if neccesary (sum of top/bottom)
$.fn.mimicInherit = function(padding){
    var elementHeight = $(this).parent().outerHeight();
    if(padding != ' ') {
        $(this).css('height', elementHeight-padding+'px');    
    } else {
        $(this).css('height', elementHeight+'px');
    }
}

$.fn.doSomething = function(action, value) {
    var self = $(this);

    self.css('cursor', 'pointer');
    self.click(function(){
        if (action == 'slideToggle') {
            self.slideToggle();
        }
        else if (action == 'shrink') {
            self.animate({
                opacity: 0,
                height: "toggle"
            }, 2000 );
        }
        else if (action == 'boom' && value != ' ') {
            self.animate({
                'font-size': value,
                opacity: 0
            }, 500, function() {
                self.hide();
            });
        }
        else if (action == 'disabled' && value != ' ') {
            self.css({
                'opacity': value,
                'text-decoration': 'line-through'
            });
        }
        else if (action == 'text' && value != ' ') {
            self.text(value);
        }
        else if (action == 'color' && value != ' ') {
            self.css('color', value);
        }
        else if (action == 'togglePrev') {
            self.prev().slideToggle();
            (self.text() === "Click here") ? self.text("Click again") : self.text("Click here");
        }
        else if (action == 'changeBG') {
            self.css('background-color', value);
        }
        else {
            alert('actions = slideToggle, shrink, boom(font-size), disabled(opacity), text(text), color(color), togglePrev, changeBG(color)');
        }
        self.css('cursor', 'default');
    });
}

// on dom ready
$(function(){

    $('.menu-trigger').triggerMenus('.main-nav');
    $('.sponsor-trigger').triggerMenus('.sponsors');
    $('.info-text').infoBox();
    //$('.welcome').mimicInherit(128);

    // test
    // actions = slideToggle, shrink, boom(font-size), disabled(opacity), 
    // text(text), color(color), togglePrev, changeBG(color)
    $('.test').doSomething('boom', '3em');

    // Smooth Scroll to target
    $('.nav-button').click(function(e){
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top
        }, 1200);
        return false;
    });

    // Owl Carousel
    $('#event-carousel').owlCarousel({
        nav: true, // Show next and prev buttons
        slideSpeed: 300,
        autoplay: false,
        paginationSpeed: 400,
        loop: false,
        items: 1,
        dots: true
    });

    /*$('#archive-carousel').owlCarousel({
        nav: true, // Show next and prev buttons
        slideSpeed: 300,
        autoplay: false,
        paginationSpeed: 400,
        loop: false,
        items: 1,
        dots: true
    });*/

    $('.owl-next').text('>');
    $('.owl-prev').text('<');

    // Check if page is already scrolled to a section.
    checkSectionSelected($(window).scrollTop());

});

// scroll event features
$(window).scroll(function (e) {
    checkSectionSelected($(window).scrollTop()); // Check current visible section and set navigation to .active
    //scrollevents();
});

// on load
$( window ).load(function(){
    //scrollevents();
});

// on resize
$( window ).resize(function() { 
    //$('.welcome').mimicInherit(128);
});

// stop smooth scroll on user action
$(document).on("scroll mousedown DOMMouseScroll mousewheel keyup", function(e){ // Identify user actions and immediately stop scroll animations.
    if ( e.which > 0 || e.type === "mousedown" || e.type === "mousewheel"){
        $viewport.stop().unbind('scroll mousedown DOMMouseScroll mousewheel keyup'); 
    }
});

