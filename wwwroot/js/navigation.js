async function updateAccountDropdownFromDBOnLoad() {
    try {

        const localUser = JSON.parse(localStorage.getItem("currentUser"));
        const username = localUser?.username || "TestUser";

        const userRes = await fetch(`/Agile-Project-1.6/backend/user.php?action=getUser&username=${encodeURIComponent(username)}`);
        const dbUser = await userRes.json();
        console.log('[NAV] getUser response:', dbUser);
        if (dbUser && dbUser.totalPoints !== undefined) {
            const nameEl = document.getElementById('navUserName');
            const pointsEl = document.getElementById('navUserPoints');
            if (nameEl) nameEl.textContent = dbUser.username;
            if (pointsEl) pointsEl.textContent = dbUser.totalPoints;
            localStorage.setItem('currentUser', JSON.stringify(dbUser));
        }

        const achRes = await fetch(`/Agile-Project-1.6/backend/user.php?action=getUserAchievements&username=${encodeURIComponent(username)}`);
        const achievements = await achRes.json();
        console.log('[NAV] getUserAchievements response:', achievements);
        const achEl = document.getElementById('navUserAchievements');
        if (achEl && Array.isArray(achievements)) {
            achEl.textContent = achievements.length;
            console.log('[NAV] Set navUserAchievements:', achievements.length);
        }
    } catch (err) {
        console.error('❌ Error fetching user from database:', err);
    }
}


// ===================================
// REUSABLE NAVIGATION COMPONENTS
// ===================================

function getTopNavigation(activePage = 'home') {
    return `
    <nav class="top-nav">
        <div class="top-nav-container">
            <!-- Left side - Menu button -->
            <div class="top-nav-left">
                <div class="menu-wrapper">
                    <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Open menu" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path fill="currentColor" fill-rule="evenodd" d="M2 2h4v4H2zm0 8h4v4H2zm4 8H2v4h4zm4-16h4v4h-4zm4 8h-4v4h4zm-4 8h4v4h-4zM22 2h-4v4h4zm-4 8h4v4h-4zm4 8h-4v4h4z" clip-rule="evenodd"></path>
                        </svg>
                        <span>LTFC++</span>
                        <svg class="dropdown-arrow-menu" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                        </svg>
                    </button>

                    <!-- Menu Dropdown Panel -->
                    <div class="menu-dropdown" id="menuDropdown">
                        <div class="menu-dropdown-content">
                            <ul class="menu-dropdown-list">
                                <li>
                                    <a href="index.html" class="menu-dropdown-link ${activePage === 'home' ? 'active' : ''}">
                                        <svg class="menu-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        <span>LTFC++</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Center - Navigation Links (desktop) -->
            <ul class="top-nav-links">
                <li><a href="index.html" class="nav-link ${activePage === 'home' ? 'active' : ''}">LTFC++</a></li>
            </ul>

            <!-- Right side - User Account -->
            <div class="top-nav-right">
                <div class="account-wrapper">
                    <button class="account-btn" id="accountBtn" aria-label="My Account" aria-expanded="false">
                        <div class="account-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M18.433 13.773a8 8 0 0 0-3.31-2.583 5.1 5.1 0 0 0 2.056-4.076C17.18 4.294 14.856 2 11.998 2S6.817 4.294 6.817 7.114c0 1.61.773 3.115 2.055 4.076a8 8 0 0 0-3.31 2.583A7.75 7.75 0 0 0 4 18.457v2.707c0 .46.38.836.847.836h14.318a.844.844 0 0 0 .835-.836v-2.707a7.76 7.76 0 0 0-1.567-4.684m-6.437-1.549c3.48 0 6.31 2.794 6.31 6.229v1.875H5.686v-1.875c0-3.435 2.83-6.229 6.31-6.229M8.504 7.112c0-1.9 1.567-3.446 3.492-3.446s3.492 1.546 3.492 3.446-1.567 3.446-3.492 3.446-3.492-1.546-3.492-3.446"></path>
                            </svg>
                        </div>
                        <div class="account-text">
                            <span>MY ACCOUNT</span>
                            <svg class="dropdown-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                            </svg>
                        </div>
                    </button>

                    <!-- Account Dropdown Panel -->
                    <div class="account-dropdown" id="accountDropdown">
                        <div class="account-dropdown-content">
                            <div class="profile-details">
                                <div class="profile-info">
                                    <div class="user-name" id="navUserName">TestUser</div>
                                    <a href="#edit" class="edit-link">Edit Details</a>
                                </div>
                            </div>
                            <div class="profile-stats-grid">
                                <div class="stat-card">
                                    <svg class="stat-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#FFD700"/>
                                        <path d="M2 7L12 22L22 7" fill="#FFA500"/>
                                    </svg>
                                    <div class="stat-info">
                                        <span class="stat-value" id="navUserPoints">0</span>
                                        <span class="stat-label">Total Points</span>
                                    </div>
                                </div>
                                <div class="stat-card">
                                    <svg class="stat-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFD700" stroke="#FFA500" stroke-width="2"/>
                                    </svg>
                                    <div class="stat-info">
                                        <span class="stat-value" id="navUserAchievements">0</span>
                                        <span class="stat-label">Achievements</span>
                                    </div>
                                </div>
                            </div>
                            <div class="account-actions">
                                <button class="btn-signout">Sign Out</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    `;
}


function getSecondaryNavigation() {
    return `
    <section class="secondary-nav">
        <div class="secondary-nav-container">
            <!-- Logo po lewej -->
            <div class="secondary-nav-left">
                <a href="index.html" class="secondary-nav-logo">
                    <img src="background-image/102-lutontown-crest.webp" alt="Luton Town FC" class="logo-image">
                </a>
            </div>

            <!-- Middle navigation -->
            <nav class="secondary-nav-center">
                <ul class="secondary-nav-list">
                    <li>
                        <a href="#news" class="secondary-nav-link">
                            <span class="nav-text">News</span>
                        </a>
                    </li>
                    <li>
                        <a href="#matches" class="secondary-nav-link">
                            <span class="nav-text">Matches</span>
                        </a>
                    </li>
                    <li>
                        <a href="#players" class="secondary-nav-link">
                            <span class="nav-text">Players</span>
                        </a>
                    </li>
                    <li>
                        <a href="#ltfc-plus" class="secondary-nav-link">
                            <span class="nav-text">LTFC+</span>
                        </a>
                    </li>
                    <li>
                        <a href="#tickets" class="secondary-nav-link">
                            <span class="nav-text">Tickets & Hospitality</span>
                        </a>
                    </li>
                    <li>
                        <a href="#club" class="secondary-nav-link">
                            <span class="nav-text">Club</span>
                        </a>
                    </li>
                    <li>
                        <a href="#supporters" class="secondary-nav-link">
                            <span class="nav-text">Supporters</span>
                        </a>
                    </li>
                </ul>
            </nav>

            <!-- Przyciski po prawej -->
            <div class="secondary-nav-right">
                <button class="search-btn" aria-label="Search" title="Search">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"></path>
                    </svg>
                </button>
                <button class="menu-btn" aria-label="Menu" title="Menu">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"></path>
                    </svg>
                </button>
            </div>
        </div>
    </section>
    `;
}


function loadNavigation(activePage = 'home') {

    const topNavContainer = document.getElementById('top-nav-container');
    if (topNavContainer) {
        topNavContainer.innerHTML = getTopNavigation(activePage);
    }


    const secondaryNavContainer = document.getElementById('secondary-nav-container');
    if (secondaryNavContainer) {
        secondaryNavContainer.innerHTML = getSecondaryNavigation();
    }


    setTimeout(() => {
        updateAccountDropdownFromDBOnLoad();
        const accountBtn = document.getElementById('accountBtn');
        if (accountBtn) {
            accountBtn.addEventListener('click', async function() {
                console.log('🔍 Clicked MY ACCOUNT - loading data...');
                await updateAccountDropdownFromDBOnLoad();
            });
        }
    }, 100);
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
        const pageName = document.body.getAttribute('data-page') || 'home';
        loadNavigation(pageName);

        await updateAccountDropdownFromDBOnLoad();
    });
} else {
    const pageName = document.body.getAttribute('data-page') || 'home';
    loadNavigation(pageName);
    updateAccountDropdownFromDBOnLoad();
}