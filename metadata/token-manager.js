/**
 * Centralized Token Management System
 * Handles token validation, refresh, and authentication across all pages
 * Single validation check per page load for optimal performance
 */

// Global token state - single validation per page load
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
    console.log("🔄 Resetting token validation state...");
    tokenValidationPromise = null;
    validatedToken = null;
    tokenValidationStatus = 'pending';
}

/**
 * Initialize token validation on page load
 * This is the ONLY place where we validate tokens - called once per page
 */
async function initializeTokenValidation(forceReset = false) {
    // If force reset is requested (e.g., after OAuth callback), reset state first
    if (forceReset) {
        resetTokenValidation();
    }
    
    if (tokenValidationPromise) {
        console.log("🔄 Token validation already in progress, waiting...");
        return tokenValidationPromise;
    }
    
    console.log("🚀 Starting token validation...");
    tokenValidationStatus = 'pending';
    
    tokenValidationPromise = getValidToken();
    
    try {
        validatedToken = await tokenValidationPromise;
        tokenValidationStatus = validatedToken ? 'valid' : 'invalid';
        console.log("✅ Token validation complete:", tokenValidationStatus);
        return validatedToken;
    } catch (error) {
        console.error("❌ Token validation failed:", error);
        tokenValidationStatus = 'invalid';
        validatedToken = null;
        return null;
    } finally {
        // Reset promise after completion to allow future re-validation
        tokenValidationPromise = null;
    }
}

/**
 * Main function to get a valid token
 * Implements the 3-step flow: 1) Test token, 2) Check tokenHash, 3) Refresh or relogin
 */
async function getValidToken() {
    const sessionToken = sessionStorage.getItem("token");
    
    // Step 1: Test if current session token is valid
    if (sessionToken && sessionToken !== 'null') {
        console.log("🔍 Testing current session token...");
        if (await validateToken(sessionToken)) {
            console.log("✅ Session token is valid");
            return sessionToken;
        }
        console.log("❌ Session token is invalid/expired");
    }
    
    // Step 2: Check if tokenHash exists
    const tokenHash = localStorage.getItem("tokenHash");
    const lastAuthTime = localStorage.getItem("lastAuthTime");
    
    if (!tokenHash || !lastAuthTime) {
        console.log("❌ No tokenHash found, user needs to relogin");
        showReloginMessage();
        return null;
    }
    
    // Check if tokenHash is too old (7 days)
    const timeSinceAuth = Date.now() - parseInt(lastAuthTime);
    const daysOld = timeSinceAuth / (24 * 60 * 60 * 1000);
    
    if (daysOld >= 7) {
        console.log("⏰ TokenHash too old:", daysOld.toFixed(2), "days");
        clearStoredTokens();
        showReloginMessage();
        return null;
    }
    
    // Step 3: Refresh token using tokenHash
    console.log("🔄 Attempting token refresh with tokenHash...");
    tokenValidationStatus = 'refreshing';
    
    try {
        const newTokens = await refreshTokenFromHash(tokenHash);
        if (newTokens && newTokens.token) {
            console.log("✅ Token refresh successful");
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
            console.log("❌ Token refresh failed - no token in response");
            clearStoredTokens();
            showReloginMessage();
            return null;
        }
    } catch (error) {
        console.error("❌ Token refresh failed:", error);
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
        
        if (response.ok) {
            const userData = await response.json();
            console.log("✅ Token validation successful for user:", userData.login);
            return true;
        } else if (response.status === 401) {
            console.log("❌ Token validation failed - 401 Unauthorized");
            return false;
        } else {
            console.log("⚠️ Token validation failed - unexpected status:", response.status);
            return false;
        }
    } catch (error) {
        console.error("❌ Token validation error:", error);
        return false;
    }
}

/**
 * Refresh token using tokenHash via backend API
 */
async function refreshTokenFromHash(tokenHash) {
    console.log("🔄 Refreshing token via backend...");
    
    const response = await fetch(`${BACKEND_URL}?action=validate&tokenHash=${encodeURIComponent(tokenHash)}&clientId=${CLIENT_ID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Backend refresh failed:", response.status, errorText);
        throw new Error(`Backend refresh failed: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("✅ Backend refresh response received");
    return data;
}

/**
 * Show relogin message to user
 */
function showReloginMessage() {
    console.log("🔐 Showing relogin message...");
    
    // Remove any existing login message
    $('#loginMessage').remove();
    
    // Create login message
    const loginMessage = $(`
        <div id="loginMessage" class="login-message">
            <strong>Authentication Required</strong><br>
            Your session has expired. Please <a href="index_oauth.html">login to Box</a> to continue.
        </div>
    `);
    
    // Add to first container
    $('.container').first().prepend(loginMessage);
    
    // Disable all tiles/actions
    $('.box').addClass('disabled');
    $('.main-action-buttons').hide();
    $('.action').attr('disabled', true);
}

/**
 * Clear all stored tokens
 */
function clearStoredTokens() {
    console.log("🧹 Clearing all stored tokens...");
    
    localStorage.removeItem("tokenHash");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("lastAuthTime");
    localStorage.removeItem("token"); // Remove old format token
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("refreshToken");
}

/**
 * Get the current validated token (for API calls)
 * Returns null if no valid token available
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
        console.error("❌ No valid token available for API request");
        showReloginMessage();
        return Promise.reject('No valid token available');
    }
    
    const requestOptions = {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${validatedToken}`,
            'Content-Type': 'application/json'
        }
    };
    
    console.log("📡 Making authenticated request to:", url);
    return fetch(url, requestOptions);
}

/**
 * Initialize token validation when DOM is ready
 * This should be called once per page load
 */
$(document).ready(function() {
    console.log("📄 Page loaded, initializing token validation...");
    
    // Check if we're in the middle of an OAuth callback (code parameter present)
    const params = new URLSearchParams(window.location.search);
    const oauthCode = params.get('code');
    
    if (oauthCode) {
        console.log("🔄 OAuth callback detected, deferring token validation until OAuth completes...");
        // Don't validate yet - wait for OAuth callback to complete
        // The OAuth callback handler will trigger validation after storing tokens
        return;
    }
    
    // Initialize token validation
    initializeTokenValidation().then(token => {
        if (token) {
            console.log("✅ Page ready with valid token");
            // Trigger any page-specific initialization
            $(document).trigger('tokenValidated', [token]);
        } else {
            console.log("❌ Page ready but no valid token");
            // Trigger any page-specific error handling
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
