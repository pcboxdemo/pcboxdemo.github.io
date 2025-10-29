/**
 * Shared Connection Status Functionality
 * Provides connection status button and modal for all pages
 */

// Connection status functions
let isUpdatingConnectionStatus = false;
let isTestingToken = false;
let tokenTestCompleted = false;
let tokenTestResult = null; // 'valid', 'invalid', or null

function updateConnectionStatus() {
    // Prevent multiple simultaneous calls
    if (isUpdatingConnectionStatus) {
        console.log("⏭️ Update in progress, skipping...");
        return;
    }
    
    isUpdatingConnectionStatus = true;
    
    // Use TokenManager to get current status
    let tokenStatus = null;
    
    if (window.TokenManager && typeof window.TokenManager.getTokenValidationStatus === 'function') {
        tokenStatus = window.TokenManager.getTokenValidationStatus();
        console.log("🔍 Connection Status Check (TokenManager):", tokenStatus);
    } else {
        console.log("⚠️ TokenManager not available yet, using fallback logic");
    }
    
    let statusIcon = '🔴';
    let statusText = 'Not Connected';
    let statusClass = 'status-none';

    if (tokenStatus) {
        switch (tokenStatus.status) {
            case 'valid':
                statusIcon = '🟢';
                statusText = 'Connected (Live)';
                statusClass = 'status-connected';
                break;
            case 'refreshing':
                statusIcon = '🟡';
                statusText = 'Refreshing Token...';
                statusClass = 'status-connected';
                break;
            case 'pending':
                statusIcon = '🟡';
                statusText = 'Validating Token...';
                statusClass = 'status-connected';
                break;
            case 'invalid':
            default:
                statusIcon = '🔴';
                statusText = 'Not Connected';
                statusClass = 'status-none';
                break;
        }
    } else {
        // Fallback to old logic if TokenManager not available
        const token = sessionStorage.getItem("token");
        const tokenHash = localStorage.getItem("tokenHash");
        const lastAuthTime = localStorage.getItem("lastAuthTime");
        
        console.log("🔍 Fallback status check:", {
            hasToken: !!token,
            hasTokenHash: !!tokenHash,
            hasLastAuthTime: !!lastAuthTime
        });
        
        if (token && token !== 'null') {
            // Only test the token once per page load
            if (!isTestingToken && !tokenTestCompleted) {
                isTestingToken = true;
                console.log("🧪 Testing token (one-time test)...");
                
                testTokenQuickly(token).then(isValid => {
                    console.log("🧪 Token test result:", isValid ? "VALID" : "INVALID");
                    tokenTestResult = isValid ? 'valid' : 'invalid';
                    
                    if (isValid) {
                        updateStatusDisplay('🟢', 'Connected (Live)', 'status-connected');
                        updateConnectionButton('status-connected');
                        updateTileStates('status-connected');
                    } else {
                        updateStatusDisplay('🔴', 'Token Expired', 'status-expired');
                        updateConnectionButton('status-expired');
                        updateTileStates('status-expired');
                    }
                    isTestingToken = false;
                    tokenTestCompleted = true;
                }).catch(error => {
                    console.error("🧪 Token test failed:", error);
                    tokenTestResult = 'invalid';
                    updateStatusDisplay('🔴', 'Token Expired', 'status-expired');
                    updateConnectionButton('status-expired');
                    updateTileStates('status-expired');
                    isTestingToken = false;
                    tokenTestCompleted = true;
                });
            } else if (isTestingToken) {
                console.log("⏭️ Token test already in progress, skipping...");
            } else if (tokenTestCompleted) {
                console.log("⏭️ Token test already completed, using result:", tokenTestResult);
                // Use the stored test result
                if (tokenTestResult === 'valid') {
                    statusIcon = '🟢';
                    statusText = 'Connected (Live)';
                    statusClass = 'status-connected';
                } else {
                    statusIcon = '🔴';
                    statusText = 'Token Expired';
                    statusClass = 'status-expired';
                }
            }
            
            // Show validating status while testing (only if not completed)
            if (!tokenTestCompleted) {
                statusIcon = '🟡';
                statusText = 'Validating Token...';
                statusClass = 'status-connected';
            }
        } else if (tokenHash && lastAuthTime) {
            const timeSinceAuth = Date.now() - parseInt(lastAuthTime);
            const daysOld = timeSinceAuth / (24 * 60 * 60 * 1000);
            
            if (daysOld < 7) {
                statusIcon = '🟡';
                statusText = 'Token Stored (Validating...)';
                statusClass = 'status-connected';
            } else {
                statusIcon = '🔴';
                statusText = 'Token Expired';
                statusClass = 'status-expired';
            }
        } else {
            statusIcon = '🔴';
            statusText = 'Not Connected';
            statusClass = 'status-none';
        }
    }

    console.log("🔄 Updating status: " + statusClass + " (" + statusText + ")");
    
    // Update modal status (if modal exists)
    updateStatusDisplay(statusIcon, statusText, statusClass);
    console.log("✅ Status elements updated - Icon:" + $('#connectionStatusIcon').length + " Text:" + $('#connectionStatusText').length);
    
    // Update connection button color and tile states
    updateConnectionButton(statusClass);
    updateTileStates(statusClass);

    // Update detailed info (if modal exists)
    if ($('#sessionToken').length) {
        const currentToken = window.TokenManager ? window.TokenManager.getCurrentValidToken() : sessionStorage.getItem("token");
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
    
    // Reset the flag to allow future updates
    isUpdatingConnectionStatus = false;
}

// Update connection button color based on status
function updateConnectionButton(statusClass) {
    const button = $('.connection-status-btn');
    console.log("🎨 Updating button color: " + statusClass + " (found:" + button.length + ")");
    
    button.removeClass('connected disconnected');
    
    if (statusClass === 'status-connected') {
        button.addClass('connected');
        console.log("Button set to GREEN (connected)");
    } else {
        button.addClass('disconnected');
        console.log("Button set to RED (disconnected)");
    }
    
    console.log("🎨 Button classes: " + button.attr('class'));
}

// Update tile states based on connection status
function updateTileStates(statusClass) {
    const tiles = $('.box');
    
    if (statusClass === 'status-connected') {
        // Connected - enable all tiles and remove login message
        tiles.removeClass('disabled');
        $('#loginMessage').remove();
    } else {
        // Not connected or expired - disable tiles and show login message
        tiles.addClass('disabled');
        showLoginMessage();
    }
}

// Show login message when not connected
function showLoginMessage() {
    // Check if login message already exists in DOM
    if ($('#loginMessage').length > 0) {
        console.log("Login message already exists, skipping...");
        return;
    }
    
    console.log("Creating login message...");
    
    // Create login message with direct link for all pages
    const loginMessage = $(`
        <div id="loginMessage" class="login-message">
            <strong>Authentication Required</strong><br>
            Please <a href="index_oauth.html">login to Box</a> to access the metadata tools.
        </div>
    `);
    
    console.log("Prepending login message to first container...");
    $('.container').first().prepend(loginMessage);
    console.log("Login message created, count:", $('#loginMessage').length);
}

// Helper function to update status display
function updateStatusDisplay(icon, text, statusClass) {
    if ($('#connectionStatusIcon').length) {
        $('#connectionStatusIcon').html(icon);
    }
    if ($('#connectionStatusText').length) {
        $('#connectionStatusText').text(text);
        $('#connectionStatusText').removeClass('status-connected status-expired status-none').addClass(statusClass);
    }
}

// Quick token validation for fallback logic
async function testTokenQuickly(token) {
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
        console.error("❌ Quick token test failed:", error);
        return false;
    }
}

// Clean up old token format on page load
function cleanupOldTokens() {
    const oldToken = localStorage.getItem("token");
    if (oldToken && !localStorage.getItem("tokenHash")) {
        console.log("Found old token format, removing:", oldToken);
        localStorage.removeItem("token");
    }
}

// Logout function
function logout() {
    if (typeof window.boxLogout === 'function') {
        window.boxLogout();
    } else {
        // Fallback logout - clear both old and new formats
        localStorage.removeItem("tokenHash");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("lastAuthTime");
        localStorage.removeItem("token"); // Remove old format token
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refreshToken");
        window.location.href = "/metadata/index_oauth.html";
    }
}

// Debug function - call from browser console: debugConnectionStatus()
window.debugConnectionStatus = function() {
    console.log("🔍 DEBUG: Token=" + (sessionStorage.getItem("token") ? "✓" : "✗") + " Refresh=" + (sessionStorage.getItem("refreshToken") ? "✓" : "✗") + " Hash=" + (localStorage.getItem("tokenHash") ? "✓" : "✗") + " User=" + (localStorage.getItem("userEmail") || "None"));
    console.log("🔍 DEBUG: Modal elements - Icon:" + $('#connectionStatusIcon').length + " Text:" + $('#connectionStatusText').length + " Content:" + $('#connectionStatusText').text());
    console.log("🔍 DEBUG: TokenManager available:", !!window.TokenManager);
    if (window.TokenManager) {
        console.log("🔍 DEBUG: TokenManager status:", window.TokenManager.getTokenValidationStatus());
    }
};

// Test function - call from browser console: testConnectionStatus()
window.testConnectionStatus = function() {
    console.log("🧪 Testing connection status...");
    updateConnectionStatus();
};

// Initialize connection status when DOM is ready
$(document).ready(function() {
    // Clean up old token format
    cleanupOldTokens();
    
    // Listen for TokenManager events
    $(document).on('tokenValidated', function(event, token) {
        console.log("🎉 Token validated event received");
        updateConnectionStatus();
    });
    
    $(document).on('tokenValidationFailed', function() {
        console.log("❌ Token validation failed event received");
        updateConnectionStatus();
    });
    
    // Check connection status on page load with a small delay to ensure button is loaded
    setTimeout(updateConnectionStatus, 500);
    
    // Also check again after a longer delay to ensure TokenManager is loaded
    setTimeout(function() {
        if (!window.TokenManager && !isTestingToken && !tokenTestCompleted) {
            console.log("🔄 TokenManager still not loaded, retrying connection status...");
            updateConnectionStatus();
        }
    }, 2000);
    
    // Set up modal event handlers (if modal exists)
    if ($('#connectionModal').length) {
        // Method 1: Standard Bootstrap modal event
        $('#connectionModal').on('show.bs.modal', function () {
            console.log("📱 Modal opening...");
            updateConnectionStatus();
        });
        
        // Method 2: Alternative event binding
        $('#connectionModal').on('shown.bs.modal', function () {
            console.log("📱 Modal shown...");
            updateConnectionStatus();
        });
    }
    
    // Method 3: Direct button click handler
    $('.connection-status-btn').on('click', function() {
        console.log("🔘 Button clicked...");
        setTimeout(updateConnectionStatus, 100); // Small delay to ensure modal is ready
    });
    
    // Update connection status after HTML is loaded (using a more reliable method)
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.target.id === 'connectionStatusContainer') {
                console.log("👁️ HTML loaded via observer...");
                setTimeout(updateConnectionStatus, 100);
            }
        });
    });
    
    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Also try to update periodically in case the HTML loads but observer misses it
    let updateAttempts = 0;
    const maxAttempts = 5; // Reduced from 10
    const updateInterval = setInterval(function() {
        updateAttempts++;
        if ($('.connection-status-btn').length > 0 && !isTestingToken && !tokenTestCompleted) {
            console.log("🔘 Button found, updating...");
            updateConnectionStatus();
            clearInterval(updateInterval);
        } else if (updateAttempts >= maxAttempts) {
            console.log("⏹️ Max attempts reached, stopping...");
            clearInterval(updateInterval);
        }
    }, 1000); // Increased from 500ms to 1000ms
});
