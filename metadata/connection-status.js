/**
 * Shared Connection Status Functionality
 * Provides connection status button and modal for all pages
 * Relies on TokenManager for all token validation logic
 */

let isUpdatingConnectionStatus = false;
let tokenValidationCheck = null;

/**
 * Quick validation check for session token
 */
async function validateSessionToken(token) {
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
        return false;
    }
}

/**
 * Update connection status display based on TokenManager state
 */
function updateConnectionStatus() {
    // Prevent multiple simultaneous calls
    if (isUpdatingConnectionStatus) {
        return;
    }
    
    isUpdatingConnectionStatus = true;
    
    // Get status from TokenManager (single source of truth)
    let tokenStatus = null;
    if (window.TokenManager && typeof window.TokenManager.getTokenValidationStatus === 'function') {
        tokenStatus = window.TokenManager.getTokenValidationStatus();
    }
    
    // Determine status display
    let statusIcon = '🔴';
    let statusText = 'Not Connected';
    let statusClass = 'status-none';
    
    const token = sessionStorage.getItem("token");
    const hasToken = token && token !== 'null';
    
    if (tokenStatus && tokenStatus.status === 'valid') {
        // TokenManager says valid - trust it
        statusIcon = '🟢';
        statusText = 'Connected (Live)';
        statusClass = 'status-connected';
    } else if (tokenStatus && tokenStatus.status === 'refreshing') {
        // TokenManager is refreshing
        statusIcon = '🟡';
        statusText = 'Refreshing Token...';
        statusClass = 'status-connected';
    } else if (hasToken) {
        // We have a token - validate it directly
        if (!tokenValidationCheck) {
            tokenValidationCheck = validateSessionToken(token).then(isValid => {
                tokenValidationCheck = null;
                // Update UI based on validation result
                if (isValid) {
                    updateStatusDisplay('🟢', 'Connected (Live)', 'status-connected');
                    updateConnectionButton('status-connected');
                    updateTileStates('status-connected');
                } else {
                    updateStatusDisplay('🔴', 'Not Connected', 'status-none');
                    updateConnectionButton('status-none');
                    updateTileStates('status-none');
                }
                return isValid;
            });
        }
        // Show validating while checking
        statusIcon = '🟡';
        statusText = 'Validating Token...';
        statusClass = 'status-connected';
    }
    
    // Update UI elements
    updateStatusDisplay(statusIcon, statusText, statusClass);
    updateConnectionButton(statusClass);
    updateTileStates(statusClass);
    updateModalDetails();
    
    isUpdatingConnectionStatus = false;
}

/**
 * Update connection button color based on status
 */
function updateConnectionButton(statusClass) {
    const button = $('.connection-status-btn');
    if (button.length === 0) return;
    
    button.removeClass('connected disconnected');
    
    if (statusClass === 'status-connected') {
        button.addClass('connected');
    } else {
        button.addClass('disconnected');
    }
}

/**
 * Update tile states based on connection status
 */
function updateTileStates(statusClass) {
    const tiles = $('.box');
    
    if (statusClass === 'status-connected') {
        tiles.removeClass('disabled');
        $('#loginMessage').remove();
    } else {
        tiles.addClass('disabled');
        if (window.TokenManager) {
            window.TokenManager.showReloginMessage();
        }
    }
}

/**
 * Show login message when not connected
 */
function showLoginMessage() {
    if ($('#loginMessage').length > 0) {
        return;
    }
    
    const loginMessage = $(`
        <div id="loginMessage" class="login-message">
            <strong>Authentication Required</strong><br>
            Please <a href="index_oauth.html">login to Box</a> to access the metadata tools.
        </div>
    `);
    
    $('.container').first().prepend(loginMessage);
}

/**
 * Update status display in modal
 */
function updateStatusDisplay(icon, text, statusClass) {
    if ($('#connectionStatusIcon').length) {
        $('#connectionStatusIcon').html(icon);
    }
    if ($('#connectionStatusText').length) {
        $('#connectionStatusText').text(text);
        $('#connectionStatusText').removeClass('status-connected status-expired status-none').addClass(statusClass);
    }
}

/**
 * Update detailed info in modal
 */
function updateModalDetails() {
    if ($('#sessionToken').length === 0) return;
    
    // Get token from TokenManager if available, otherwise fall back to sessionStorage
    let currentToken = null;
    if (window.TokenManager && typeof window.TokenManager.getCurrentValidToken === 'function') {
        currentToken = window.TokenManager.getCurrentValidToken();
    }
    if (!currentToken) {
        currentToken = sessionStorage.getItem("token");
    }
    if (currentToken === 'null' || currentToken === null || currentToken === undefined) {
        currentToken = null;
    }
    
    const refreshToken = sessionStorage.getItem("refreshToken");
    const tokenHash = localStorage.getItem("tokenHash");
    const userEmail = localStorage.getItem("userEmail");
    const lastAuthTime = localStorage.getItem("lastAuthTime");
    
    $('#sessionToken').text(currentToken ? currentToken.substring(0, 20) + '...' : 'None');
    $('#refreshToken').text(refreshToken ? refreshToken.substring(0, 20) + '...' : 'None');
    $('#tokenHash').text(tokenHash ? tokenHash.substring(0, 20) + '...' : 'None');
    $('#userEmail').text(userEmail || 'None');
    $('#lastAuthTime').text(lastAuthTime ? new Date(parseInt(lastAuthTime)).toLocaleString() : 'None');

    if (lastAuthTime) {
        const timeSinceAuth = Date.now() - parseInt(lastAuthTime);
        const daysOld = timeSinceAuth / (24 * 60 * 60 * 1000);
        const daysRemaining = Math.max(0, 7 - daysOld);
        $('#tokenAge').text(daysOld.toFixed(1) + ' days old');
        $('#tokenExpiry').text(daysRemaining.toFixed(1) + ' days remaining');
    } else {
        $('#tokenAge').text('N/A');
        $('#tokenExpiry').text('N/A');
    }
}

/**
 * Clean up old token format on page load
 */
function cleanupOldTokens() {
    const oldToken = localStorage.getItem("token");
    if (oldToken && !localStorage.getItem("tokenHash")) {
        localStorage.removeItem("token");
    }
}

/**
 * Logout function
 */
function logout() {
    if (typeof window.boxLogout === 'function') {
        window.boxLogout();
    } else {
        if (window.TokenManager) {
            window.TokenManager.clearStoredTokens();
        }
        window.location.href = "/metadata/index_oauth.html";
    }
}

// Debug function - call from browser console: debugConnectionStatus()
window.debugConnectionStatus = function() {
    console.log("DEBUG: Token=" + (sessionStorage.getItem("token") ? "✓" : "✗") + 
                " Refresh=" + (sessionStorage.getItem("refreshToken") ? "✓" : "✗") + 
                " Hash=" + (localStorage.getItem("tokenHash") ? "✓" : "✗") + 
                " User=" + (localStorage.getItem("userEmail") || "None"));
    console.log("DEBUG: TokenManager available:", !!window.TokenManager);
    if (window.TokenManager) {
        console.log("DEBUG: TokenManager status:", window.TokenManager.getTokenValidationStatus());
    }
};

// Initialize connection status when DOM is ready
$(document).ready(function() {
    // Clean up old token format
    cleanupOldTokens();
    
    // Listen for TokenManager events (primary update mechanism)
    $(document).on('tokenValidated', function(event, token) {
        updateConnectionStatus();
    });
    
    $(document).on('tokenValidationFailed', function() {
        updateConnectionStatus();
    });
    
    // Update when modal opens (if modal exists)
    if ($('#connectionModal').length) {
        $('#connectionModal').on('show.bs.modal', function () {
            updateConnectionStatus();
        });
    }
    
    // Update when button clicked (if button exists)
    $(document).on('click', '.connection-status-btn', function() {
        updateConnectionStatus();
    });
    
    // Update when connection status HTML loads (via MutationObserver)
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.target.id === 'connectionStatusContainer') {
                updateConnectionStatus();
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});
