#!/usr/bin/env node

//
// Development server with LiveReload support
// This script will run a local development server with automatic browser refresh
// when resume.json or other files change.
//
// Usage:
// `node dev-server.js`
//

var http = require("http");
var theme = require("./index.js");
var path = require("path");
var fs = require("fs");
var chokidar = require("chokidar");
var { exec } = require("child_process");

var port = 8888;
var livereloadPort = 35729;

// LiveReload WebSocket server
var WebSocket = require('ws');
var wss = new WebSocket.Server({ 
    port: livereloadPort,
    path: '/'
});

console.log("LiveReload server started on port " + livereloadPort);

// Function to notify all connected clients to reload
function notifyReload() {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                command: 'reload',
                path: '/'
            }));
        }
    });
}

// Watch for file changes (for browser reload only)
var watcher = chokidar.watch([
    'resume.json',
    'node_modules/resume-schema/resume.json',
    'serve.js',
    'index.js',
    'render.js',
    'jade/**/*.jade',
    'assets/less/**/*.less'
], {
    persistent: true,
    followSymlinks: true,
    ignoreInitial: true
});

watcher.on('change', function(path) {
    console.log('File changed:', path);

    if (path.endsWith('.less')) {
        console.log('Compiling LESS to CSS...');
        exec('grunt less', (err, stdout, stderr) => {
            if (err) {
                console.error(`Error compiling LESS: ${stderr}`);
                return;
            }
            console.log('LESS compiled successfully.');
            notifyReload();
        });
    } else {
        // Only notify browser to reload for other files
        notifyReload();
    }
});

// LiveReload script injection
function injectLiveReload(html) {
    var livereloadScript = '<script src="/livereload.js"></script>';
    return html.replace('</head>', livereloadScript + '</head>');
}

// Main HTTP server
http.createServer(function(req, res) {
    // Serve the custom LiveReload client script
    if (req.url === '/livereload.js' || req.url === '/livereload.js?snipver=1') {
        var livereloadClient = fs.readFileSync(path.join(__dirname, 'livereload-client.js'), 'utf8');
        res.writeHead(200, {
            'Content-Type': 'application/javascript',
            'Cache-Control': 'no-cache'
        });
        res.end(livereloadClient);
        return;
    }
    // Always read the latest resume data from disk
    var resumePath = path.join(__dirname, 'node_modules', 'resume-schema', 'resume.json');
    var resume;
    try {
        var resumeRaw = fs.readFileSync(resumePath, 'utf8');
        resume = JSON.parse(resumeRaw);
    } catch (e) {
        console.error('Error reading resume.json:', e.message);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error reading resume.json');
        return;
    }
    var picture = resume.basics && resume.basics.picture ? resume.basics.picture.replace(/^\//, "") : "";
    if (picture && req.url.replace(/^\//, "") === picture.replace(/^.\//, "")) {
        var format = path.extname(picture);
        try {
            var image = fs.readFileSync(picture);
            res.writeHead(200, {
                "Content-Type": "image/" + format
            });
            res.end(image, "binary");
        } catch (error) {
            if (error.code === "ENOENT") {
                console.log("Picture not found !");
                res.end();
            } else {
                throw error;
            }
        }
    } else {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        var html = render(resume);
        // Inject LiveReload script for development
        html = injectLiveReload(html);
        res.end(html);
    }
}).listen(port);

console.log("Preview: http://localhost:" + port + "/");
console.log("Watching for changes...");

function render(resume) {
    try {
        return theme.render(JSON.parse(JSON.stringify(resume)));
    } catch (e) {
        console.log(e.message);
        return "";
    }
}

// Handle graceful shutdown
process.on('SIGINT', function() {
    console.log('\nShutting down...');
    watcher.close();
    wss.close();
    process.exit(0);
});

wss.on('connection', function(ws) {
    console.log('LiveReload client connected');
    ws.on('close', function() {
        console.log('LiveReload client disconnected');
    });
    ws.on('error', function(err) {
        console.error('WebSocket error:', err);
    });
}); 