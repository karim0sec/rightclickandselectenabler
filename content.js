// Function to bypass DevTools detection
function bypassDevToolsDetection() {
    // Override common detection methods
    Object.defineProperty(window, 'devtools', {
        get: function() {
            return undefined;
        }
    });

    // Prevent detection via window.outerWidth and window.outerHeight
    const originalOuterWidth = Object.getOwnPropertyDescriptor(Window.prototype, 'outerWidth');
    const originalOuterHeight = Object.getOwnPropertyDescriptor(Window.prototype, 'outerHeight');
    
    Object.defineProperty(Window.prototype, 'outerWidth', {
        get: function() {
            return window.innerWidth;
        }
    });
    
    Object.defineProperty(Window.prototype, 'outerHeight', {
        get: function() {
            return window.innerHeight;
        }
    });

    // Override console.clear to prevent forced console clearing
    const originalClear = console.clear;
    console.clear = function() {
        return undefined;
    };

    // Prevent debugger statements
    const originalDebugger = window.debugger;
    Object.defineProperty(window, 'debugger', {
        get: function() {
            return function() {};
        }
    });

    // Override common detection functions
    const disableDetection = function() {
        return false;
    };

    window.isDevToolsOpened = disableDetection;
    window.isDevToolsOpening = disableDetection;
}

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

// Function to prevent console.log clearing and debugger statements
function preventConsoleManipulation() {
    const originalLog = console.log;
    const originalClear = console.clear;
    const originalDebug = console.debug;
    const originalInfo = console.info;
    const originalWarn = console.warn;
    const originalError = console.error;

    // Override console methods
    console.log = function() { originalLog.apply(console, arguments); };
    console.clear = function() { originalLog('Console clear prevented'); };
    console.debug = function() { originalDebug.apply(console, arguments); };
    console.info = function() { originalInfo.apply(console, arguments); };
    console.warn = function() { originalWarn.apply(console, arguments); };
    console.error = function() { originalError.apply(console, arguments); };
}

// Run all protection functions
function initializeProtection() {
    bypassDevToolsDetection();
    enableRightClickAndSelection();
    preventConsoleManipulation();

    // Override common anti-debugging functions
    const noop = function() { return false; };
    window.alert = noop;
    window.confirm = noop;
    window.prompt = noop;
}

// Run protection immediately
initializeProtection();

// Also run when DOM is ready to ensure it works on all pages
document.addEventListener('DOMContentLoaded', initializeProtection);

// Run periodically to catch any dynamic changes
setInterval(initializeProtection, 1000);
