// Function to enable right-click and text selection
function enableRightClickAndSelection() {
    // Remove existing event listeners
    document.addEventListener('contextmenu', function(e) {
        e.stopPropagation();
        return true;
    }, true);

    document.addEventListener('selectstart', function(e) {
        e.stopPropagation();
        return true;
    }, true);

    document.addEventListener('mousedown', function(e) {
        e.stopPropagation();
        return true;
    }, true);

    // Override common methods used to disable right-click and selection
    document.onselectstart = null;
    document.oncontextmenu = null;
    document.onmousedown = null;

    // Remove 'user-select: none' styles
    const style = document.createElement('style');
    style.textContent = `
        * {
            -webkit-user-select: auto !important;
            -moz-user-select: auto !important;
            -ms-user-select: auto !important;
            user-select: auto !important;
        }
    `;
    document.head.appendChild(style);

    // Periodically check and remove event listeners that might be added dynamically
    setInterval(() => {
        document.oncontextmenu = null;
        document.onselectstart = null;
        document.onmousedown = null;
    }, 100);
}

// Run the function when the content script loads
enableRightClickAndSelection();

// Also run it when DOM is ready to ensure it works on all pages
document.addEventListener('DOMContentLoaded', enableRightClickAndSelection);
