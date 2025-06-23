//
// This script will run a local development server. This is useful when
// developing the theme.
//
// Usage:
// `node serve`
//

var http = require("http");
var resume = require("resume-schema").resumeJson;
var theme = require("./index.js");
var path = require("path");
var fs = require("fs");

var port = 8888;
var livereloadPort = 35729;

// LiveReload script injection
function injectLiveReload(html) {
    var livereloadScript = '<script>document.write(\'<script src="http://\' + (location.host || \'localhost\').split(\':\')[0] + \':' + livereloadPort + '/livereload.js?snipver=1"></\' + \'script>\')</script>';
    return html.replace('</head>', livereloadScript + '</head>');
}

http.createServer(function(req, res) {
    var picture = resume.basics.picture.replace(/^\//, "");
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
        var html = render();
        // Inject LiveReload script for development
        if (process.env.NODE_ENV !== 'production') {
            html = injectLiveReload(html);
        }
        res.end(html);
    }
}).listen(port);

console.log("Preview: http://localhost:" + port + "/");
console.log("LiveReload: http://localhost:" + livereloadPort + "/");
console.log("Serving..");

function render() {
    try {
        return theme.render(JSON.parse(JSON.stringify(resume)));
    } catch (e) {
        console.log(e.message);
        return "";
    }
}
