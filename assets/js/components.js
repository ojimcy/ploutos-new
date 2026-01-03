// Shared header HTML
const headerHTML = `
    <!--==================================================-->
    <!--Start Header Section-->
    <!--===================================================-->
    <div class="header-area" id="sticky-header">
        <div class="container">
            <div class="row align-items-center d-flex">
                <div class="col-lg-3">
                    <div class="header-logo">
                        <a class="main-logo" href="/"><img src="/assets/images/logo-new.png" alt="PloutosLabs" /></a>
                        <a class="stiky-logo" href="/"><img src="/assets/images/logo-new.png" alt="PloutosLabs" /></a>
                    </div>
                </div>
                <div class="col-lg-9">
                    <nav class="cryptozen_menu">
                        <div class="header-menu">
                            <ul class="nav_scroll">
                                <li><a href="/" data-translate="home">Home</a></li>
                                <li><a href="/about.html" data-translate="about">About</a></li>
                                <li>
                                    <a href="#" data-translate="products">Products <i class="fas fa-angle-down"></i></a>
                                    <div class="sub-menu">
                                        <ul>
                                            <li>
                                                <a href="/products/skydda-wallet.html" data-translate="skyddaWallet">Skydda Wallet</a>
                                            </li>
                                            <li>
                                                <a href="/products/kavipay.html" data-translate="kavipay">KaviPay</a>
                                            </li>
                                            <li>
                                                <a href="/products/virtual-card.html" data-translate="virtualCard">Virtual Card</a>
                                            </li>
                                            <li>
                                                <a href="/products/coming-soon.html" data-translate="comingSoon">Coming Soon</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li><a href="/faq.html" data-translate="faq">FAQ</a></li>
                            </ul>
                            <div class="header-btn">
                                <a href="#" onclick="openWhitepaper()" data-translate="whitepaper">Whitepaper</a>
                            </div>
                            <div class="language-selector">
                                <select onchange="setLanguage(this.value)">
                                    <option value="en">🇬🇧 English</option>
                                    <option value="fr">🇫🇷 Français</option>
                                </select>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </div>

    <!-- mobile menu section -->
    <div class="mobile-menu-area d-sm-block d-md-block d-lg-none">
        <div class="mobile-menu">
            <nav class="itsoft_menu">
                <ul class="nav_scroll">
                    <li><a href="/" data-translate="home">Home</a></li>
                    <li><a href="/about.html" data-translate="about">About</a></li>
                    <li>
                        <a href="#" data-translate="products">Products <i class="fas fa-angle-down"></i></a>
                        <div class="sub-menu">
                            <ul>
                                <li>
                                    <a href="/products/skydda-wallet.html" data-translate="skyddaWallet">Skydda Wallet</a>
                                </li>
                                <li>
                                    <a href="/products/kavipay.html" data-translate="kavipay">KaviPay</a>
                                </li>
                                <li>
                                    <a href="/products/virtual-card.html" data-translate="virtualCard">Virtual Card</a>
                                </li>
                                <li>
                                    <a href="/products/coming-soon.html" data-translate="comingSoon">Coming Soon</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li><a href="/faq.html" data-translate="faq">FAQ</a></li>
                    <li>
                        <a href="#" onclick="openWhitepaper()" data-translate="whitepaper">Whitepaper</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
`;

// Shared footer HTML
const footerHTML = `
    <!--==================================================-->
    <!--START FOOTER SECTION-->
    <!--===================================================-->
    <div class="footer pt-100">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 col-md-6">
                    <div class="footer-location-box">
                        <div class="footer-logo">
                            <img width="180" src="/assets/images/logo-new.png" alt="PloutosLabs" />
                        </div>
                        <div class="footer-content">
                            <p data-translate="footerContent">
                                PloutosLabs is a comprehensive fintech ecosystem designed to revolutionize
                                digital finance. Built on the BASE Network, we combine blockchain innovation
                                with practical financial services.
                            </p>
                        </div>
                    </div>
                    <div class="footer-social-box">
                        <div class="social-content">
                            <h3 data-translate="followUs">Follow Us</h3>
                        </div>
                        <div class="footer-about-social-icon pt-20">
                            <ul>
                                <li>
                                    <a href="https://twitter.com/ploutoslabs" target="_blank"><i class="fa-brands fa-x-twitter"></i></a>
                                </li>
                                <li>
                                    <a href="https://t.me/ploutoslab" target="_blank"><i class="fab fa-telegram"></i></a>
                                </li>
                                <li>
                                    <a href="#"><i class="fab fa-linkedin-in"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6">
                    <div class="widget">
                        <div class="footer-quick-link">
                            <div class="footer-widget-title">
                                <h3 data-translate="products">Products</h3>
                            </div>
                            <div class="footer-quick-link-list">
                                <ul>
                                    <li>
                                        <a href="/products/skydda-wallet.html" data-translate="skyddaWallet">Skydda Wallet</a>
                                    </li>
                                    <li>
                                        <a href="/products/kavipay.html" data-translate="kavipay">KaviPay</a>
                                    </li>
                                    <li>
                                        <a href="/products/virtual-card.html" data-translate="virtualCard">Virtual Card</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6">
                    <div class="widget">
                        <div class="footer-quick-link-list">
                            <div class="footer-widget-title">
                                <h3 data-translate="company">Company</h3>
                            </div>
                            <div class="footer-quick-link-list">
                                <ul>
                                    <li><a href="/" data-translate="home">Home</a></li>
                                    <li><a href="/about.html" data-translate="about">About</a></li>
                                    <li><a href="/faq.html" data-translate="faq">FAQ</a></li>
                                    <li>
                                        <a href="#" onclick="openWhitepaper()" data-translate="whitepaper">Whitepaper</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 p-0">
                    <div class="widget">
                        <div class="footer-quick-link-list">
                            <div class="footer-widget-title">
                                <h3 data-translate="support">Support</h3>
                            </div>
                            <div class="footer-quick-link-list">
                                <ul>
                                    <li>
                                        <a href="mailto:support@ploutoslabs.io">Support</a>
                                    </li>
                                    <li>
                                        <a href="https://t.me/ploutoslabannouncement" data-translate="announcement">Announcement</a>
                                    </li>
                                    <li>
                                        <a href="https://drive.google.com/drive/folders/1cEZl7OjrG9BPjpRJVII2FUq2b3kxqDuJ" target="_blank" data-translate="mediaKit">Media Kit</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row upper11 mt-50 align-items-center">
                    <div class="col-lg-6 col-md-6">
                        <div class="footer-copyright-text">
                            <p class="text-white" data-translate="copyright">
                                Copyright © PloutosLabs. All rights reserved.
                            </p>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6">
                        <div class="footer-copyright-content">
                            <div class="footer-sicial-address-link">
                                <ul>
                                    <li>
                                        <a href="/terms.html" data-translate="termsCondition">Terms & Conditions</a>
                                    </li>
                                    <li>
                                        <a href="/privacy.html" data-translate="privacyPolicy">Privacy Policy</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--==================================================-->
    <!-- Start Search Popup Area -->
    <!--==================================================-->
    <div class="search-popup">
        <button class="close-search style-two">
            <i class="fas fa-times"></i>
        </button>
        <button class="close-search"><i class="fas fa-arrow-up"></i></button>
        <form method="post" action="#">
            <div class="form-group">
                <input type="search" name="search-field" value="" placeholder="Search Here" required="" />
                <button type="submit"><i class="fas fa-search"></i></button>
            </div>
        </form>
    </div>

    <!--==================================================-->
    <!--start fTo Top-->
    <!--===================================================-->
    <div class="scroll-area">
        <div class="top-wrap">
            <div class="go-top-btn-wraper">
                <div class="go-top go-top-button">
                    <i class="fas fa-arrow-up"></i>
                    <i class="fas fa-arrow-up"></i>
                </div>
            </div>
        </div>
    </div>
`;

// Common scripts initialization
const commonScriptsInit = `
    <script>
        $(window).on('scroll', function () {
            var scrolled = $(window).scrollTop();
            if (scrolled > 300) $('.go-top').addClass('active');
            if (scrolled < 300) $('.go-top').removeClass('active');
        });

        $('.go-top').on('click', function () {
            $('html, body').animate(
                {
                    scrollTop: '0',
                },
                1200
            );
        });
    </script>

    <script>
        'use strict';
        jQuery,
            jQuery(document).ready(function (o) {
                0 < o('.offset-side-bar').length &&
                    o('.offset-side-bar').on('click', function (e) {
                        e.preventDefault(),
                            e.stopPropagation(),
                            o('.cart-group').addClass('isActive');
                    }),
                    0 < o('.close').length &&
                    o('.close').on('click', function (e) {
                        e.preventDefault(), o('.cart-group').removeClass('isActive');
                    }),
                    0 < o('.navSidebar-button').length &&
                    o('.navSidebar-button').on('click', function (e) {
                        e.preventDefault(),
                            e.stopPropagation(),
                            o('.info-group').addClass('isActive');
                    }),
                    0 < o('.close').length &&
                    o('.close').on('click', function (e) {
                        e.preventDefault(), o('.info-group').removeClass('isActive');
                    }),
                    o('body').on('click', function (e) {
                        o('.info-group').removeClass('isActive'),
                            o('.cart-group').removeClass('isActive');
                    }),
                    o('.dt-sidebar-widget').on('click', function (e) {
                        e.stopPropagation();
                    }),
                    0 < o('.xs-modal-popup').length &&
                    o('.xs-modal-popup').magnificPopup({
                        type: 'inline',
                        fixedContentPos: !1,
                        fixedBgPos: !0,
                        overflowX: 'auto',
                        closeBtnInside: !1,
                        callbacks: {
                            beforeOpen: function () {
                                this.st.mainClass = 'my-mfp-slide-bottom xs-promo-popup';
                            },
                        },
                    });
            });
    </script>
`;

// Function to get the correct base path
function getBasePath() {
    const currentPath = window.location.pathname;
    return currentPath === '/' || currentPath.endsWith('/index.html') ? './' : './';
}

// Function to get the base path for assets based on current page depth
function getAssetBasePath() {
    const currentPath = window.location.pathname;
    // Check if we're in a subdirectory (like /products/)
    if (currentPath.includes('/products/')) {
        return '../';
    }
    return '';
}

// Function to update asset paths for header/footer images
function updateAssetPaths() {
    // Using absolute paths now, so this is mainly for fallback
    const headerLogos = document.querySelectorAll('.header-logo img');
    headerLogos.forEach(img => {
        if (!img.src.includes('http') && !img.src.startsWith('/')) {
            img.src = '/assets/images/logo-new.png';
        }
    });

    // Update footer logo
    const footerLogo = document.querySelector('.footer-logo img');
    if (footerLogo && !footerLogo.src.includes('http') && !footerLogo.src.startsWith('/')) {
        footerLogo.src = '/assets/images/logo-new.png';
    }
}

// Function to update navigation links based on current page
function updateNavigationLinks() {
    const currentPath = window.location.pathname;
    const isHomePage = currentPath === '/' || currentPath.endsWith('/index.html') || currentPath === '/index.html';
    const isInSubdir = currentPath.includes('/products/');
    const basePath = isInSubdir ? '..' : '';

    // Update logo links
    const logoLinks = document.querySelectorAll('.header-logo a');
    logoLinks.forEach(link => {
        link.href = basePath + '/';
    });

    // Update all navigation and footer links for subdirectory pages
    if (isInSubdir) {
        const allLinks = document.querySelectorAll('a[href^="/"]');
        allLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('/') && !href.startsWith('//')) {
                link.href = '..' + href;
            }
        });
    }

    // Update asset paths
    updateAssetPaths();
}

// Function to load header
function loadHeader() {
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        headerContainer.innerHTML = headerHTML;
        // Update navigation links after loading
        setTimeout(updateNavigationLinks, 10);
    }
}

// Function to load footer
function loadFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = footerHTML;
    }
}

// Function to initialize scroll-to-top functionality
function initScrollToTop() {
    // Show/hide button on scroll
    $(window).on('scroll', function () {
        var scrolled = $(window).scrollTop();
        if (scrolled > 300) {
            $('.go-top').addClass('active');
        } else {
            $('.go-top').removeClass('active');
        }
    });

    // Scroll to top on click
    $('.go-top').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
    });
}

// Initialize components when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    loadHeader();
    loadFooter();

    // Initialize scroll-to-top after footer is loaded
    setTimeout(initScrollToTop, 100);
});