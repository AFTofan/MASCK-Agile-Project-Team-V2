// ===================================
// REUSABLE FOOTER COMPONENT
// ===================================

function getFooter() {
    return `
    
    <footer class="footer">
        <!-- Address Panel -->
        <section class="footer-address-panel">
            <h3 class="address-panel-title">Find Us</h3>
            <div class="address-blocks">
                <address class="contact-details">
                    <h4 class="contact-details-title">Luton Town Football Club</h4>
                    <div class="contact-item">
                        <svg class="contact-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#6b7280">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        <div>
                            <p>Kenilworth Road Stadium<br>
                            1 Maple Road<br>ss
                            Luton<br>
                            LU4 8AW</p>
                        </div>
                    </div>
                    <div class="contact-item">
                        <svg class="contact-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#6b7280">
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                        <div>
                            <a href="tel:01582411622" class="contact-link">01582 411622</a>
                        </div>
                    </div>
                    <div class="contact-item">
                        <svg class="contact-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#6b7280">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                        <div>
                            <a href="mailto:info@lutontown.co.uk" class="contact-link">info@lutontown.co.uk</a>
                        </div>
                    </div>
                </address>

                <address class="contact-details">
                    <h4 class="contact-details-title">Luton Town Club Shop</h4>
                    <div class="contact-item">
                        <svg class="contact-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#6b7280">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        <div>
                            <p>Unit 55<br>
                            The Point<br>
                            Luton Bedfordshire<br>
                            LU1 2TL</p>
                        </div>
                    </div>
                    <div class="contact-item">
                        <svg class="contact-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#6b7280">
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                        <div>
                            <a href="tel:01582411622" class="contact-link">01582 411622</a>
                        </div>
                    </div>
                    <div class="contact-item">
                        <svg class="contact-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#6b7280">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                        <div>
                            <a href="mailto:clubshop@lutontown.co.uk" class="contact-link">clubshop@lutontown.co.uk</a>
                        </div>
                    </div>
                </address>

                <div class="social-links">
                    <h2 class="social-title">Follow Us</h2>
                    <ul class="social-links-list">
                        <li>
                            <a href="https://twitter.com/LutonTown" class="social-link" target="_blank" rel="noopener" title="Twitter">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                                <span class="visually-hidden">Twitter</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com/LutonTown" class="social-link" target="_blank" rel="noopener" title="Facebook">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 3.667h-3.533v7.98H9.101z"/>
                                </svg>
                                <span class="visually-hidden">Facebook</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/lutontown" class="social-link" target="_blank" rel="noopener" title="Instagram">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                                </svg>
                                <span class="visually-hidden">Instagram</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.youtube.com/user/OfficialLutonTown" class="social-link" target="_blank" rel="noopener" title="YouTube">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
                                </svg>
                                <span class="visually-hidden">YouTube</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/company/luton-town-football-club" class="social-link" target="_blank" rel="noopener" title="LinkedIn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                                </svg>
                                <span class="visually-hidden">LinkedIn</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.tiktok.com/@ltfcofficial" class="social-link" target="_blank" rel="noopener" title="TikTok">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"/>
                                </svg>
                                <span class="visually-hidden">TikTok</span>
                            </a>
                        </li>
                    </ul>
                    
                    <div class="app-promo">
                        <h3 class="app-promo-title">Official App</h3>
                        <p class="app-promo-summary">Get the app in the app stores</p>
                        <div class="app-badges">
                            <a href="https://apps.apple.com" target="_blank" rel="noopener" class="app-badge">
                                <svg width="120" height="40" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="120" height="40" rx="5" fill="#000"></rect>
                                    <text x="35" y="13" font-family="Arial" font-size="8" fill="#fff">Download on the</text>
                                    <text x="35" y="28" font-family="Arial" font-size="14" font-weight="bold" fill="#fff">App Store</text>
                                    <path d="M24 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 10c-2.7 0-5.8 1.3-6 2h12c-.2-.7-3.3-2-6-2z" fill="#fff"></path>
                                </svg>
                            </a>
                            <a href="https://play.google.com" target="_blank" rel="noopener" class="app-badge">
                                <svg width="135" height="40" viewBox="0 0 135 40" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="135" height="40" rx="5" fill="#000"></rect>
                                    <text x="45" y="13" font-family="Arial" font-size="8" fill="#fff">GET IT ON</text>
                                    <text x="45" y="28" font-family="Arial" font-size="14" font-weight="bold" fill="#fff">Google Play</text>
                                    <path d="M15 10l8 8-8 8V10z" fill="#fff"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Useful Links -->
        <section class="useful-links-block">
            <div class="useful-links-container">
                <h3 class="useful-links-title">Useful Links</h3>
                <div class="link-groups">
                    <div class="link-group">
                        <h4 class="link-group-title">Policies</h4>
                        <ul class="link-list">
                            <li class="link-list-item">
                                <a href="#" class="link-list-link">Terms of Use</a>
                            </li>
                            <li class="link-list-item">
                                <a href="#" class="link-list-link">Privacy Policy</a>
                            </li>
                            <li class="link-list-item">
                                <a href="#" class="link-list-link">Cookie Policy</a>
                            </li>
                            <li class="link-list-item">
                                <a href="#" class="link-list-link">Consent Preferences</a>
                            </li>
                            <li class="link-list-item">
                                <a href="#" class="link-list-link">Company Information</a>
                            </li>
                        </ul>
                    </div>

                    <div class="link-group">
                        <h4 class="link-group-title">Information</h4>
                        <ul class="link-list">
                            <li class="link-list-item">
                                <a href="#" class="link-list-link">Club</a>
                            </li>
                            <li class="link-list-item">
                                <a href="#" class="link-list-link">Contact Us</a>
                            </li>
                            <li class="link-list-item">
                                <a href="#" class="link-list-link">Careers</a>
                            </li>
                            <li class="link-list-item">
                                <a href="#" class="link-list-link">Accessibility</a>
                            </li>
                            <li class="link-list-item">
                                <a href="#" class="link-list-link">FAQs</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- Legal Links and Language Picker -->
        <div class="legal-links-section">
            <div class="legal-container">
                <div class="copyright-statement">
                    © Copyright of Luton Town Football Club
                </div>
                <div class="language-dropdown">
                    <button class="locale-button" aria-label="Change Language">
                        <svg class="flag-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20">
                            <rect width="30" height="20" fill="#012169"/>
                            <path d="M0 0l30 20M30 0L0 20" stroke="#fff" stroke-width="4"/>
                            <path d="M0 0l30 20M30 0L0 20" stroke="#C8102E" stroke-width="2"/>
                            <path d="M15 0v20M0 10h30" stroke="#fff" stroke-width="6"/>
                            <path d="M15 0v20M0 10h30" stroke="#C8102E" stroke-width="4"/>
                        </svg>
                        <span>EN</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7 10l5 5 5-5z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Back to Top -->
        <div class="back-to-top">
            <div class="back-to-top-container">
                <button class="back-to-top-button" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
                    <span>Back To Top</span>
                    <svg class="button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8z"/>
                    </svg>
                </button>
            </div>
        </div>
    </footer>
    `;
}


function loadFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = getFooter();
    }
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFooter);
} else {
    loadFooter();
}