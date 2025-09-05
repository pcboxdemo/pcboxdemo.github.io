/**
 * Shared Connection Status Functionality
 * Provides connection status button and modal for all pages
 */

// Connection status functions
let isUpdatingConnectionStatus = false;

function updateConnectionStatus() {
    // Prevent multiple simultaneous calls
    if (isUpdatingConnectionStatus) {
        console.log("⏭️ Update in progress, skipping...");
        return;
    }
    
    isUpdatingConnectionStatus = true;
    
    const token = sessionStorage.getItem("token");
    const refreshToken = sessionStorage.getItem("refreshToken");
    const tokenHash = localStorage.getItem("tokenHash");
    const userEmail = localStorage.getItem("userEmail");
    const lastAuthTime = localStorage.getItem("lastAuthTime");
    
    // Debug: Check for old token entries
    const oldToken = localStorage.getItem("token");
    console.log("🔍 Status: Token=" + (token ? "✓" : "✗") + " Refresh=" + (refreshToken ? "✓" : "✗") + " Hash=" + (tokenHash ? "✓" : "✗") + " User=" + (userEmail || "None"));
    
    console.log("📦 SessionStorage: " + Object.keys(sessionStorage).join(", ") || "Empty");

    let statusIcon = '🔴';
    let statusText = 'Not Connected';
    let statusClass = 'status-none';

    if (token && token !== 'null') {
        // We have a session token, let's get user details
        statusIcon = '🟢';
        statusText = 'Connected';
        statusClass = 'status-connected';
        
        // Fetch user details from Box API
        fetchUserDetails(token);
    } else if (tokenHash && lastAuthTime) {
        const timeSinceAuth = Date.now() - parseInt(lastAuthTime);
        const daysOld = timeSinceAuth / (24 * 60 * 60 * 1000);

        if (daysOld < 7) {
            statusIcon = '🟡';
            statusText = 'Token Stored';
            statusClass = 'status-connected';
        } else {
            statusIcon = '🔴';
            statusText = 'Token Expired';
            statusClass = 'status-expired';
        }
    }

    console.log("🔄 Updating status: " + statusClass + " (" + statusText + ")");
    
    // Update modal status (if modal exists)
    if ($('#connectionStatusIcon').length) {
        $('#connectionStatusIcon').html(statusIcon);
        $('#connectionStatusText').text(statusText);
        $('#connectionStatusText').removeClass('status-connected status-expired status-none').addClass(statusClass);
    }
    
    console.log("✅ Status elements updated - Icon:" + $('#connectionStatusIcon').length + " Text:" + $('#connectionStatusText').length);
    
    // Update connection button color
    updateConnectionButton(statusClass);
    
    // Update tile states
    updateTileStates(statusClass);

    // Update detailed info (if modal exists)
    if ($('#sessionToken').length) {
        $('#sessionToken').text(token ? token.substring(0, 20) + '...' : 'None');
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
    const loginMessage = $('#loginMessage');
    
    if (statusClass === 'status-connected') {
        // Connected - enable all tiles
        tiles.removeClass('disabled');
        if (loginMessage.length) {
            loginMessage.remove();
        }
    } else {
        // Not connected - disable tiles and show login message
        tiles.addClass('disabled');
        // Only show login message if it doesn't already exist
        if (loginMessage.length === 0) {
            showLoginMessage();
        }
    }
}

// Show login message when not connected
function showLoginMessage() {
    // Check if page already has login links in header
    const hasHeaderLogin = $('header a[href*="index_oauth.html"]').length > 0;
    
    // For pages with header login links, don't show any additional login message
    if (hasHeaderLogin) {
        console.log("🔗 Header login exists, skipping message");
        return;
    }
    
    // Remove any existing login messages first to prevent duplicates
    $('#loginMessage').remove();
    
    // Only create login message for pages without header login links
    const loginMessage = $(`
        <div id="loginMessage" class="login-message">
            <strong>Authentication Required</strong><br>
            Please <a href="index_oauth.html">login to Box</a> to access the metadata tools.
        </div>
    `);
    $('.container').prepend(loginMessage);
}

// Fetch user details from Box API using the session token
function fetchUserDetails(accessToken) {
    console.log("🔍 Fetching user details from Box API...");
    
    $.ajax({
        url: 'https://api.box.com/2.0/users/me',
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        success: function(userData) {
            console.log("✅ User details: " + (userData.name || 'Unknown') + " (" + (userData.login || 'Unknown') + ")");
            
            // Update the user email in the modal with live data
            if ($('#userEmail').length) {
                $('#userEmail').text(userData.login || 'Unknown');
            }
            
            // Update the status to show we have live connection
            if ($('#connectionStatusText').length) {
                $('#connectionStatusText').text('Connected (Live)');
            }
            
            // Store the user email if we don't have it
            if (!localStorage.getItem("userEmail") && userData.login) {
                localStorage.setItem("userEmail", userData.login);
            }
        },
        error: function(xhr, status, error) {
            console.log("❌ User fetch failed: " + xhr.status + " " + xhr.statusText);
            
            // Token might be expired, update status
            if (xhr.status === 401 && $('#connectionStatusText').length) {
                $('#connectionStatusText').text('Token Expired');
                $('#connectionStatusText').removeClass('status-connected').addClass('status-expired');
            }
        }
    });
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
    
    // Check connection status on page load with a small delay to ensure button is loaded
    setTimeout(updateConnectionStatus, 500);
    
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
    const maxAttempts = 10;
    const updateInterval = setInterval(function() {
        updateAttempts++;
        if ($('.connection-status-btn').length > 0) {
            console.log("🔘 Button found, updating...");
            updateConnectionStatus();
            clearInterval(updateInterval);
        } else if (updateAttempts >= maxAttempts) {
            console.log("⏹️ Max attempts reached, stopping...");
            clearInterval(updateInterval);
        }
    }, 500);
});
