/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
//

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Background image blur-up preloader
    var bgImages = [
        { selector: '.masthead', src: 'assets/img/header-bg.jpg' },
        { selector: '#game', src: 'assets/img/div_bg/game.jpg' },
        { selector: '#team', src: 'assets/img/div_bg/team.jpg' },
        { selector: '#about', src: 'assets/img/div_bg/about.jpg' }
    ];
    bgImages.forEach(function (item) {
        var el = document.querySelector(item.selector);
        if (!el) return;
        var img = new Image();
        img.onload = function () {
            el.classList.add('bg-loaded');
        };
        img.src = item.src;
    });

    // Lazy load carousel images on slide change
    function lazyLoadImg(img) {
        var dataSrc = img.getAttribute('data-src');
        if (dataSrc) {
            img.setAttribute('src', dataSrc);
            img.removeAttribute('data-src');
            img.addEventListener('load', function () {
                img.classList.add('loaded');
            });
        } else if (!img.classList.contains('loaded')) {
            img.classList.add('loaded');
        }
    }

    // Pre-load first slide immediately
    var firstSlideImg = document.querySelector('.carousel-item.active .game-screenshot');
    if (firstSlideImg) {
        firstSlideImg.addEventListener('load', function () {
            firstSlideImg.classList.add('loaded');
        });
        if (firstSlideImg.complete) firstSlideImg.classList.add('loaded');
    }

    var gameCarousel = document.getElementById('gameCarousel');
    if (gameCarousel) {
        gameCarousel.addEventListener('slide.bs.carousel', function (e) {
            var nextImg = e.relatedTarget.querySelector('.game-screenshot');
            if (nextImg) lazyLoadImg(nextImg);
        });
    }

    // Lightbox for game screenshots
    const gameScreenshots = document.querySelectorAll('.game-screenshot');
    const lightboxImage = document.getElementById('lightboxImage');
    gameScreenshots.forEach(function (screenshot) {
        screenshot.addEventListener('click', function () {
            var imgSrc = this.getAttribute('data-img');
            if (lightboxImage) {
                lightboxImage.setAttribute('src', imgSrc);
            }
        });
    });

});
