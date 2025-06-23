// Simple LiveReload client
(function() {
    var ws = new WebSocket('ws://localhost:35729/');
    
    ws.onopen = function() {
        console.log('LiveReload connected');
    };
    
    ws.onmessage = function(event) {
        console.log('LiveReload message:', event.data);
        var data = JSON.parse(event.data);
        if (data.command === 'reload') {
            console.log('LiveReload: Reloading page...');
            location.reload();
        }
    };
    
    ws.onerror = function(error) {
        console.log('LiveReload connection error:', error);
    };
    
    ws.onclose = function() {
        console.log('LiveReload disconnected');
        // Try to reconnect after 1 second
        setTimeout(function() {
            location.reload();
        }, 1000);
    };
})(); 