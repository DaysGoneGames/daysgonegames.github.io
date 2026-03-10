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

    // Subscribe form handling
    var subscribeForm = document.getElementById('subscribeForm');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var emailInput = document.getElementById('subscribeEmail');
            var email = emailInput.value.trim();
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                showSubscribeModal(
                    'error',
                    'Invalid Email',
                    'Please enter a valid email address to subscribe.'
                );
                return;
            }

            // Disable button during submission
            var submitBtn = subscribeForm.querySelector('.subscribe-btn');
            var originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Send to Google Sheets
            fetch('https://script.google.com/macros/s/AKfycbzdL9XLn2rARJjJMFfTgMqVckXVU_87lNecWFhrpO1hK1rNWVPX5ik3lOOIGl_KPbbB1A/exec', {
                method: 'POST',
                mode: 'no-cors',
                body: new URLSearchParams({ email: email })
            }).then(function () {
                showSubscribeModal(
                    'success',
                    'Thank You for Subscribing!',
                    'We have received your email. You will be the first to know about the latest updates and playtests for Underveil.<br><br><strong>' + escapeHtml(email) + '</strong>'
                );
                emailInput.value = '';
            }).catch(function () {
                showSubscribeModal(
                    'error',
                    'Oops!',
                    'Something went wrong. Please try again later.'
                );
            }).finally(function () {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            });
        });
    }

    function escapeHtml(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    function showSubscribeModal(type, title, msg) {
        var modal = document.getElementById('subscribeModal');
        var icon = document.getElementById('subscribeModalIcon');
        var titleEl = document.getElementById('subscribeModalTitle');
        var msgEl = document.getElementById('subscribeModalMsg');

        if (type === 'success') {
            icon.innerHTML = '<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>';
            titleEl.style.color = '#28a745';
        } else {
            icon.innerHTML = '<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#dc3545" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
            titleEl.style.color = '#dc3545';
        }

        titleEl.textContent = title;
        msgEl.innerHTML = msg;
        new bootstrap.Modal(modal).show();
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
