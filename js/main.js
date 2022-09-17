(function(html) {
    'use strict';
    const cfg = {      
      //mailChimpURL : 'https://facebook.us1.list-manage.com/subscribe/post?u=1abf75f6981256963a47d197a&amp;id=37c6d8f4d6' 
    };
    const ssPreloader = function() {
        const siteBody = document.querySelector('body');
        const preloader = document.querySelector('#preloader');
        if (!preloader) return;
        html.classList.add('ss-preload');       
        window.addEventListener('load', function() {
            html.classList.remove('ss-preload');
            html.classList.add('ss-loaded');
            preloader.addEventListener('transitionend', function afterTransition(e) {
                if (e.target.matches('#preloader'))  {
                    siteBody.classList.add('ss-show');
                    e.target.style.display = 'none';
                    preloader.removeEventListener(e.type, afterTransition);
                }
            });
        });

    }; 
    const ssMoveHeader = function () {
        const hdr = document.querySelector('.s-header');
        const hero = document.querySelector('#intro');
        let triggerHeight;
        if (!(hdr && hero)) return;
        setTimeout(function() {
            triggerHeight = hero.offsetHeight - 170;
        }, 300);
        window.addEventListener('scroll', function () {
            let loc = window.scrollY;
            if (loc > triggerHeight) {
                hdr.classList.add('sticky');
            } else {
                hdr.classList.remove('sticky');
            }
            if (loc > triggerHeight + 20) {
                hdr.classList.add('offset');
            } else {
                hdr.classList.remove('offset');
            }
            if (loc > triggerHeight + 150) {
                hdr.classList.add('scrolling');
            } else {
                hdr.classList.remove('scrolling');
            }
        });
    };
    const ssMobileMenu = function() {
        const toggleButton = document.querySelector('.s-header__menu-toggle');
        const mainNavWrap = document.querySelector('.s-header__nav');
        const siteBody = document.querySelector('body');
        if (!(toggleButton && mainNavWrap)) return;
        toggleButton.addEventListener('click', function(event) {
            event.preventDefault();
            toggleButton.classList.toggle('is-clicked');
            siteBody.classList.toggle('menu-is-open');
        });
        mainNavWrap.querySelectorAll('.s-header__nav a').forEach(function(link) {
            link.addEventListener("click", function(event) {
                if (window.matchMedia('(max-width: 800px)').matches) {
                    toggleButton.classList.toggle('is-clicked');
                    siteBody.classList.toggle('menu-is-open');
                }
            });
        });
        window.addEventListener('resize', function() {
            if (window.matchMedia('(min-width: 801px)').matches) {
                if (siteBody.classList.contains('menu-is-open')) siteBody.classList.remove('menu-is-open');
                if (toggleButton.classList.contains('is-clicked')) toggleButton.classList.remove('is-clicked');
            }
        });
    };
    const ssScrollSpy = function() {
        const sections = document.querySelectorAll('.target-section');
        window.addEventListener('scroll', navHighlight);
        function navHighlight() {           
            let scrollY = window.pageYOffset;    
            sections.forEach(function(current) {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 50;
                const sectionId = current.getAttribute('id');        
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelector('.s-header__nav a[href*=' + sectionId + ']').parentNode.classList.add('current');
                } else {
                    document.querySelector('.s-header__nav a[href*=' + sectionId + ']').parentNode.classList.remove('current');
                }
            });
        }
    }; 
     const ssMasonry = function() {
        const containerBricks = document.querySelector('.bricks-wrapper');
        if (!containerBricks) return;
        imagesLoaded(containerBricks, function() {
            const msnry = new Masonry(containerBricks, {
                itemSelector: '.entry',
                columnWidth: '.grid-sizer',
                percentPosition: true,
                resize: true
            });
        });
    }; 
    const ssLightbox = function() {
        const videoLightbox = function() {

            const videoLink = document.querySelector('.s-intro__content-video-btn');
            if (!videoLink) return;
    
            videoLink.addEventListener('click', function(event) {
    
                const vLink = this.getAttribute('href');
                const iframe = "<iframe src='" + vLink + "' frameborder='0'></iframe>"
                event.preventDefault();
                const instance = basicLightbox.create(iframe);
                instance.show()
            });
    
        };
        const folioLightbox = function() {

            const folioLinks = document.querySelectorAll('.brick .entry__link');
            const modals = [];
    
            folioLinks.forEach(function(link) {
                let modalbox = link.getAttribute('href');
                let instance = basicLightbox.create(
                    document.querySelector(modalbox),
                    {
                        onShow: function(instance) {
                            document.addEventListener("keydown", function(event) {
                                event = event || window.event;
                                if (event.key === "Escape") {
                                    instance.close();
                                }
                            });
                        }
                    }
                )
                modals.push(instance);
            });
    
            folioLinks.forEach(function(link, index) {
                link.addEventListener("click", function(event) {
                    event.preventDefault();
                    modals[index].show();
                });
            });
        };
        videoLightbox();
        folioLightbox();
    }; 
    const ssMoveTo = function(){

        const easeFunctions = {
            easeInQuad: function (t, b, c, d) {
                t /= d;
                return c * t * t + b;
            },
            easeOutQuad: function (t, b, c, d) {
                t /= d;
                return -c * t* (t - 2) + b;
            },
            easeInOutQuad: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t + b;
                t--;
                return -c/2 * (t*(t-2) - 1) + b;
            },
            easeInOutCubic: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t*t + b;
                t -= 2;
                return c/2*(t*t*t + 2) + b;
            }
        }

        const triggers = document.querySelectorAll('.smoothscroll');
        
        const moveTo = new MoveTo({
            tolerance: 0,
            duration: 1200,
            easing: 'easeInOutCubic',
            container: window
        }, easeFunctions);

        triggers.forEach(function(trigger) {
            moveTo.registerTrigger(trigger);
        });

    }; 
    (function ssInit() {

        ssPreloader();
        ssMoveHeader();
        ssMobileMenu();
        ssScrollSpy();
        ssMasonry();
        ssLightbox();
        ssMoveTo();

    })();

})(document.documentElement);