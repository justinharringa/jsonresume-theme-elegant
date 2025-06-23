# Elegant Theme [![npm version](https://badge.fury.io/js/jsonresume-theme-elegant.svg)](http://badge.fury.io/js/jsonresume-theme-elegant)

Responsive theme for [JsonResume](https://jsonresume.org/) inspired by card layouts.

[Theme Preview](http://themes.jsonresume.org/elegant)

## CLONE!
Clone of https://github.com/mudassir0909/jsonresume-theme-elegant with my customizations.

## Development Setup

### Quick Start (Recommended)
1. Update `jsonresume-theme-elegant/node_modules/resume-schema/resume.json` with your resume data
2. Run the development server with LiveReload:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:8888](http://localhost:8888) in your browser
4. Make changes to your resume data - the browser will automatically refresh!

### Clone usage
1. Update `jsonresume-theme-elegant/node_modules/resume-schema/resume.json` with resume json
2. Use `grunt exec:run_server` to view rendered resume

### Development Commands

#### Modern Development (with LiveReload)
```bash
npm run dev          # Start development server with automatic browser refresh
npm run serve        # Start basic server without LiveReload
npm run build        # Build the theme for production
```

#### Legacy Development (Grunt-based)
```bash
grunt watch          # watches for less file changes
grunt exec:run_server # Run node server (requires separate terminal)
```

### LiveReload Features
- **Automatic browser refresh** when resume data changes
- **Symlink support** - works with symlinked `resume.json` files
- **File watching** for resume data, templates, and styles
- **Real-time updates** - no manual refresh needed

### Social Profiles
The profiles are shown in the order in which they are specified in the `basics.profiles` array. By default, only 5 profiles are shown & others are revealed on demand.

![Profile Section](https://raw.githubusercontent.com/mudassir0909/jsonresume-theme-elegant/master/screenshots/profile.png)

#### Supported Profiles
* angellist
* behance
* bitbucket
* codepen
* dribbble
* dribble
* exercism
* facebook
* foursquare
* instagram
* github
* googleplus
* gratipay
* hackernews
* lastfm
* linkedin
* pinterest
* reddit
* skype
* soundcloud
* spotify
* stackexchange
* stackoverflow
* tumblr
* twitter
* vimeo
* youtube

### Credits
* Thank you [contributors](https://github.com/mudassir0909/jsonresume-theme-elegant/graphs/contributors) for your pull requests
* Floating Menu: inspired by [Smart Fixed Navigation](http://codyhouse.co/demo/smart-fixed-navigation/index.html)

### Contributing
```bash
$ git clone https://github.com/mudassir0909/jsonresume-theme-elegant.git
$ cd jsonresume-theme-elegant
$ npm install
$ npm run dev  # Start development server with LiveReload
```

Visit [http://localhost:8888](http://localhost:8888) to see the theme in action.

[![Throughput Graph](https://graphs.waffle.io/mudassir0909/jsonresume-theme-elegant/throughput.svg)](https://waffle.io/mudassir0909/jsonresume-theme-elegant/metrics)

##### Testing JSON changes
You can test your changes by updating `resume.json` file inside `node_modules/resume-schema/` folder. With the new development server, changes are automatically detected and the browser refreshes automatically.

**Note:** The development server reads the latest resume data from disk on every request, so changes are reflected immediately without restarting the server.

##### Updating Styles
All the LESS files are organized under the folder `assets/less/`. Please go through the comments inside `theme.less` to find out which file to put your LESS changes. Grunt compiles `assets/less/theme.less` to `assets/css/theme.css` which is used eventually in the theme.

**_Please Do not make any changes inside `assets/css/theme.css`_**

##### Updating Javascript
All the javascript changes go into `index.js` which is responsible for rendering the theme.

### Roadmap

[https://github.com/mudassir0909/jsonresume-theme-elegant/labels/enhancement](https://github.com/mudassir0909/jsonresume-theme-elegant/labels/enhancement)
