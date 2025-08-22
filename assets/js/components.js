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
                        <a class="main-logo" href="/"><img src="assets/images/logo.png" alt="Ploutos" /></a>
                        <a class="stiky-logo" href="/"><img src="assets/images/logo.png" alt="Ploutos" /></a>
                    </div>
                </div>
                <div class="col-lg-9">
                    <nav class="cryptozen_menu">
                        <div class="header-menu">
                            <ul class="nav_scroll">
                                <li><a href="/#home" data-translate="home">Home</a></li>
                                <li><a href="/#about" data-translate="about">About</a></li>
                                <li><a href="/#virtual-cards" data-translate="virtualCards">Virtual Cards</a></li>
                                <li><a href="/#faq" data-translate="faq">FAQ</a></li>
                                <li>
                                    <a href="https://app.ploutoslabs.io" data-translate="airdrop">Airdrop</a>
                                </li>
                                <li>
                                    <a href="#" data-translate="trade">Trade <i class="fas fa-angle-down"></i></a>
                                    <div class="sub-menu">
                                        <ul>
                                            <li>
                                                <a href="trade/mainnet.html" target="_blank">Mainnet
                                                </a>
                                            </li>
                                            <li>
                                                <a href="trade/testnet.html" target="_blank">Testnet</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
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

    <!-- mobile menu seection -->
    <div class="mobile-menu-area d-sm-block d-md-block d-lg-none">
        <div class="mobile-menu">
            <nav class="itsoft_menu">
                <ul class="nav_scroll">
                    <li><a href="/#home" data-translate="home">Home</a></li>
                    <li><a href="/#about" data-translate="about">About</a></li>
                    <li><a href="/#virtual-cards" data-translate="virtualCards">Virtual Cards</a></li>
                    <li><a href="/#faq" data-translate="faq">FAQ</a></li>
                    <li>
                        <a href="https://app.ploutoslabs.io" data-translate="airdrop">Airdrop</a>
                    </li>
                    <li>
                        <a href="#" data-translate="trade">Trade <i class="fas fa-angle-down"></i></a>
                        <div class="sub-menu">
                            <ul>
                                <li>
                                    <a href="/trade/mainnet.html" data-translate="mainnet">Mainnet
                                    </a>
                                </li>
                                <li>
                                    <a href="/trade/testnet.html" data-translate="testnet">Testnet</a>
                                </li>
                            </ul>
                        </div>
                    </li>
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
                <div class="col-lg-4 col-md-6" data-cue="zoomIn">
                    <div class="footer-location-box">
                        <div class="footer-logo">
                            <img width="150" src="assets/images/logo.png" alt="Footer-logo" />
                        </div>
                        <div class="footer-content">
                            <p data-translate="footerContent">
                                Ploutos Labs is dedicated to providing innovative blockchain
                                solutions with a focus on security, usability, and community
                                engagement. Join us on this revolutionary journey.
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
                <div class="col-lg-2 col-md-6" data-cue="zoomIn">
                    <div class="widget">
                        <div class="footer-quick-link">
                            <div class="footer-widget-title">
                                <h3 data-translate="marketplace">Marketplace</h3>
                            </div>
                            <div class="footer-quick-link-list">
                                <ul>
                                    <li>
                                        <a href="/#tokenomics" data-translate="tokenomics">Tokenomics</a>
                                    </li>
                                    <li>
                                        <a href="#" onclick="openWhitepaper()" data-translate="whitepaper">Whitepaper</a>
                                    </li>
                                    <li>
                                        <a href="https://app.ploutoslabs.io" target="_blank" data-translate="airdrop">Airdrop</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6" data-cue="zoomIn">
                    <div class="widget">
                        <div class="footer-quick-link-list">
                            <div class="footer-widget-title">
                                <h3 data-translate="company">Company</h3>
                            </div>
                            <div class="footer-quick-link-list">
                                <ul>
                                    <li><a href="#/" data-translate="home">Home</a></li>
                                    <li><a href="/#About" data-translate="about">About</a></li>
                                    <li>
                                        <a href="https://drive.google.com/drive/folders/1cEZl7OjrG9BPjpRJVII2FUq2b3kxqDuJ"
                                            data-translate="mediaKit">Media Kit</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 p-0" data-cue="zoomIn">
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
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row upper11 mt-50 align-items-center">
                    <div class="col-lg-6 col-md-6" data-cue="zoomIn">
                        <div class="footer-copyright-text">
                            <p class="text-white" data-translate="copyright">
                                Copyright © Ploutoslabs all rights reserved.
                            </p>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6" data-cue="zoomIn">
                        <div class="footer-copyright-content">
                            <div class="footer-sicial-address-link">
                                <ul>
                                    <li>
                                        <a href="terms.html" data-translate="termsCondition">Terms Condition</a>
                                    </li>
                                    <li>
                                        <a href="privacy.html" data-translate="privacyPolicy">Privacy Policy</a>
                                    </li>
                                    <li>
                                        <a href="eula.html" data-translate="eula">EULA</a>
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

// Function to update navigation links based on current page
function updateNavigationLinks() {
    const currentPath = window.location.pathname;
    const isHomePage = currentPath === '/' || currentPath.endsWith('/index.html');

    // Update logo links
    const logoLinks = document.querySelectorAll('.header-logo a');
    logoLinks.forEach(link => {
        link.href = isHomePage ? '#home' : './index.html';
    });

    // Update navigation links
    const homeLink = document.querySelector('a[href="/#home"]');
    if (homeLink) {
        homeLink.href = isHomePage ? '#home' : './index.html';
    }

    const aboutLink = document.querySelector('a[href="/#about"]');
    if (aboutLink) {
        aboutLink.href = isHomePage ? '#about' : './index.html#about';
    }

    const faqLink = document.querySelector('a[href="/#faq"]');
    if (faqLink) {
        faqLink.href = isHomePage ? '#faq' : './index.html#faq';
    }

    // Update mobile menu links as well
    const mobileHomeLink = document.querySelector('.mobile-menu a[href="/#home"]');
    if (mobileHomeLink) {
        mobileHomeLink.href = isHomePage ? '#home' : './index.html';
    }

    const mobileAboutLink = document.querySelector('.mobile-menu a[href="/#about"]');
    if (mobileAboutLink) {
        mobileAboutLink.href = isHomePage ? '#about' : './index.html#about';
    }

    const mobileFaqLink = document.querySelector('.mobile-menu a[href="/#faq"]');
    if (mobileFaqLink) {
        mobileFaqLink.href = isHomePage ? '#faq' : './index.html#faq';
    }
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

// Initialize components when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    loadHeader();
    loadFooter();
});