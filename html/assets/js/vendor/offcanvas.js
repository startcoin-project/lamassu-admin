(function(window, document, undefined)
{

    // helper functions

    var trim = function(str)
    {
        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g,'');
    };

    var hasClass = function(el, cn)
    {
        return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
    };

    var addClass = function(el, cn)
    {
        if (!hasClass(el, cn)) {
            el.className = (el.className === '') ? cn : el.className + ' ' + cn;
        }
    };

    var removeClass = function(el, cn)
    {
        el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
    };

    var hasParent = function(el, id)
    {
        if (el) {
            do {
                if (el.id === id) {
                    return true;
                }
                if (el.nodeType === 9) {
                    break;
                }
            }
            while((el = el.parentNode));
        }
        return false;
    };

    // normalize vendor prefixes

    var doc = document.documentElement;

    var transform_prop = window.Modernizr.prefixed('transform'),
        transition_prop = window.Modernizr.prefixed('transition'),
        transition_end = (function() {
            var props = {
                'WebkitTransition' : 'webkitTransitionEnd',
                'MozTransition'    : 'transitionend',
                'OTransition'      : 'oTransitionEnd otransitionend',
                'msTransition'     : 'MSTransitionEnd',
                'transition'       : 'transitionend'
            };
            return props.hasOwnProperty(transition_prop) ? props[transition_prop] : false;
        })();

    window.App = (function()
    {

        var _init = false, app = { };

        var inner = document.getElementById('js-inner-wrap'),

            nav_open = false,
            nav_class = 'js-global-nav-active',
            nav_static_class = 'js-global-nav-static',
            nav_opening_class = 'js-global-nav-opening',
            nav_closing_class = 'js-global-nav-closing';

        if (_init) {
            return;
        }
        _init = true;

        app.openNav = function()
        {
            if (!nav_open) {
                // Close navigation after transition, or immediately
                var duration = (transition_end && transition_prop) ? parseFloat(window.getComputedStyle(inner, '')[transition_prop + 'Duration']) : 0;
                if (duration > 0) {
                    document.addEventListener(transition_end, openNavEnd, false);
                } else {
                    openNavEnd(null);
                }
                addClass(doc, nav_opening_class);
                openNavEnd(null);
            } else {
              return;  
            }
            addClass(doc, nav_class);
        };

        var openNavEnd = function(e)
        {
            if (e && e.target === inner) {
                document.removeEventListener(transition_end, openNavEnd, false);
                addClass(doc, nav_static_class);
                removeClass(doc, nav_opening_class);
                // Failsafe, we definitely aren't closing!
                removeClass(doc, nav_closing_class);
            }
            nav_open = true;
        };

        app.closeNav = function()
        { 

            if (nav_open) {
                // Nav isn't static, it's closing
                removeClass(doc, nav_static_class);
                // Close navigation after transition, or immediately
                var duration = (transition_end && transition_prop) ? parseFloat(window.getComputedStyle(inner, '')[transition_prop + 'Duration']) : 0;
                if (duration > 0) {
                    document.addEventListener(transition_end, closeNavEnd, false);
                } else {
                    closeNavEnd(null);
                }        
                addClass(doc, nav_closing_class);
            }
            removeClass(doc, nav_class);
        };

        var closeNavEnd = function(e)
        {
            if (e && e.target === inner) {
                document.removeEventListener(transition_end, closeNavEnd, false);
            }
            nav_open = false;
            removeClass(doc, nav_closing_class);
            // Failsafe, we definitely aren't opening or static!
            removeClass(doc, nav_static_class);
            removeClass(doc, nav_opening_class);
        };

        app.toggleNav = function(e)
        {
            if (nav_open && hasClass(doc, nav_class)) {
                app.closeNav();
            } else {
                app.openNav();
            }
            if (e) {
                e.preventDefault();
            }
        };

        // set default interaction events
        var toggle_event = 'click',
            autoclose_event = 'mousedown';
        // test for touch
        if ('ontouchstart' in document.documentElement) {
            // use touchstart as more tactile
            toggle_event = 'touchstart',
            autoclose_event = 'touchstart';
        }

        if (document.contains(document.getElementById('js-global-nav-open'))) {
            // open nav with main "nav" button
            document.getElementById('js-global-nav-open').addEventListener(toggle_event, app.toggleNav, false);
            // close nav with main "close" button
            //document.getElementById('js-global-nav-close').addEventListener(toggle_event, app.toggleNav, false);

            // auto-close nav by touching the partial off-screen content
            document.addEventListener(autoclose_event, function(e)
            {
                if (nav_open && !hasParent(e.target, 'js-global-nav__content')) {
                    e.preventDefault();
                    app.closeNav();
                }
            },
            true);
        }

        addClass(doc, 'js-ready');

    })();

    if (window.addEventListener) {
        window.addEventListener('DOMContentLoaded', window.App, false);
    }

})(window, window.document);
