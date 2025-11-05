/**
 * Centralized Token Management System
 * Handles token validation, refresh, and authentication across all pages
 */

// Global token state
let tokenValidationPromise = null;
let validatedToken = null;
let tokenValidationStatus = 'pending'; // 'pending', 'valid', 'invalid', 'refreshing'

// Configuration
const CLIENT_ID = "nsjffk9hhb01flji3cg21qucbe65efoj";
const BACKEND_URL = "https://dik4ogwqph.execute-api.eu-west-2.amazonaws.com/default/box-node-token-generator";

/**
 * Reset token validation state (useful after OAuth callback)
 */
function resetTokenValidation() {
    tokenValidationPromise = null;
    validatedToken = null;
    tokenValidationStatus = 'pending';
}

/**
 * Initialize token validation on page load
 */
async function initializeTokenValidation(forceReset = false) {
    if (forceReset) {
        resetTokenValidation();
    }
    
    if (tokenValidationPromise) {
        return tokenValidationPromise;
    }
    
    tokenValidationStatus = 'pending';
    tokenValidationPromise = getValidToken();
    
    try {
        validatedToken = await tokenValidationPromise;
        tokenValidationStatus = validatedToken ? 'valid' : 'invalid';
        return validatedToken;
    } catch (error) {
        console.error("Token validation failed:", error);
        tokenValidationStatus = 'invalid';
        validatedToken = null;
        return null;
    } finally {
        tokenValidationPromise = null;
    }
}

/**
 * Main function to get a valid token
 * 1) Test session token, 2) Check tokenHash, 3) Refresh or relogin
 */
async function getValidToken() {
    const sessionToken = sessionStorage.getItem("token");
    
    // Step 1: Test if current session token is valid
    if (sessionToken && sessionToken !== 'null') {
        if (await validateToken(sessionToken)) {
            return sessionToken;
        }
    }
    
    // Step 2: Check if tokenHash exists and is valid
    const tokenHash = localStorage.getItem("tokenHash");
    const lastAuthTime = localStorage.getItem("lastAuthTime");
    
    if (!tokenHash || !lastAuthTime) {
        showReloginMessage();
        return null;
    }
    
    // Check if tokenHash is too old (7 days)
    const timeSinceAuth = Date.now() - parseInt(lastAuthTime);
    const daysOld = timeSinceAuth / (24 * 60 * 60 * 1000);
    
    if (daysOld >= 7) {
        clearStoredTokens();
        showReloginMessage();
        return null;
    }
    
    // Step 3: Refresh token using tokenHash
    tokenValidationStatus = 'refreshing';
    
    try {
        const newTokens = await refreshTokenFromHash(tokenHash);
        if (newTokens && newTokens.token) {
            // Store new tokens
            sessionStorage.setItem("token", newTokens.token);
            if (newTokens.refreshToken) {
                sessionStorage.setItem("refreshToken", newTokens.refreshToken);
            }
            if (newTokens.tokenHash) {
                localStorage.setItem("tokenHash", newTokens.tokenHash);
                localStorage.setItem("lastAuthTime", Date.now());
            }
            if (newTokens.userEmail) {
                localStorage.setItem("userEmail", newTokens.userEmail);
            }
            return newTokens.token;
        } else {
            clearStoredTokens();
            showReloginMessage();
            return null;
        }
    } catch (error) {
        console.error("Token refresh failed:", error);
        clearStoredTokens();
        showReloginMessage();
        return null;
    }
}

/**
 * Test if a token is valid by making a test API call
 */
async function validateToken(token) {
    if (!token || token === 'null') {
        return false;
    }
    
    try {
        const response = await fetch('https://api.box.com/2.0/users/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        return response.ok;
    } catch (error) {
        console.error("Token validation error:", error);
        return false;
    }
}

/**
 * Refresh token using tokenHash via backend API
 */
async function refreshTokenFromHash(tokenHash) {
    const response = await fetch(`${BACKEND_URL}?action=validate&tokenHash=${encodeURIComponent(tokenHash)}&clientId=${CLIENT_ID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    if (!response.ok) {
        throw new Error(`Backend refresh failed: ${response.status}`);
    }
    
    return await response.json();
}

/**
 * Show relogin message to user
 */
function showReloginMessage() {
    $('#loginMessage').remove();
    
    const loginMessage = $(`
        <div id="loginMessage" class="login-message">
            <strong>Authentication Required</strong><br>
            Your session has expired. Please <a href="index_oauth.html">login to Box</a> to continue.
        </div>
    `);
    
    $('.container').first().prepend(loginMessage);
    $('.box').addClass('disabled');
    $('.main-action-buttons').hide();
    $('.action').attr('disabled', true);
}

/**
 * Clear all stored tokens
 */
function clearStoredTokens() {
    localStorage.removeItem("tokenHash");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("lastAuthTime");
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("refreshToken");
}

/**
 * Get the current validated token (for API calls)
 */
function getCurrentValidToken() {
    return validatedToken;
}

/**
 * Get current token validation status
 */
function getTokenValidationStatus() {
    return {
        status: tokenValidationStatus,
        hasToken: !!validatedToken,
        token: validatedToken ? validatedToken.substring(0, 20) + '...' : null
    };
}

/**
 * Make an authenticated API request using the validated token
 */
async function makeAuthenticatedRequest(url, options = {}) {
    if (!validatedToken) {
        showReloginMessage();
        return Promise.reject('No valid token available');
    }
    
    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${validatedToken}`,
            'Content-Type': 'application/json'
        }
    });
}

/**
 * Initialize token validation when DOM is ready
 */
$(document).ready(function() {
    // Check if we're in the middle of an OAuth callback (code parameter present)
    const params = new URLSearchParams(window.location.search);
    const oauthCode = params.get('code');
    
    if (oauthCode) {
        // Don't validate yet - wait for OAuth callback to complete
        return;
    }
    
    // Initialize token validation
    initializeTokenValidation().then(token => {
        if (token) {
            $(document).trigger('tokenValidated', [token]);
        } else {
            $(document).trigger('tokenValidationFailed');
        }
    });
});

// Export functions for use in other scripts
window.TokenManager = {
    initializeTokenValidation,
    getCurrentValidToken,
    getTokenValidationStatus,
    makeAuthenticatedRequest,
    showReloginMessage,
    clearStoredTokens
};
