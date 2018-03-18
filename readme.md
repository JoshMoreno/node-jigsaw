# Introduction
A helper module for the static site generator [Jigsaw](https://github.com/tightenco/jigsaw). This module does three things.
1. Configures the Browsersync webpack plugin for use with Jigsaw.
2. Provides an optimized watcher for rebuilding your Jigsaw site and reloading the browser as files change.
3. Exposes the `Jigsaw` composer command to node for a more fluid build experience. 

## Quick Start
```bash
# npm
npm install @joshmoreno/jigsaw

# yarn
yarn add @joshmoreno/jigsaw 
```

Add the following script to your `package.json`
```json
"scripts": {
	"jigsaw": "jigsaw build production && npm run production"
}
```

Use the sample `webpack.mix.js` below.

**webpack.mix.js**
 ```js
 const mix = require('laravel-mix');
 const jigsaw = require('@joshmoreno/jigsaw');
 
 mix.disableSuccessNotifications();
 
 if (mix.inProduction()) {
     mix.setPublicPath('build_production/assets/');
 } else {
     mix.setPublicPath('source/assets/');
 }
 
 mix.webpackConfig(webpack => {
     return {
         plugins: [jigsaw.browserSync()]
     }
 });
 
 mix.js('source/_assets/js/main.js', 'js/')
     .sass('source/_assets/sass/main.scss', 'css/');
 
 jigsaw.watch();
 ```
 
 ## Api
 ### Browsersync
 ```js
jigsaw.browserSync(browserSyncOptions = {}, pluginOptions = {});
 ```
 
`browserSyncOptions` (object) [Browsersync options](https://browsersync.io/docs/options) to be merged with defaults.

**Defaults**
```js
// const env = argv.e || argv.env || 'local';
// const port = argv.p || argv.port || 3000;
// const buildPath = 'build_' + env;

{
	port: port,
	server: {
	    baseDir: buildPath
	},
	serveStatic: ['./source'],
	files: [
		buildPath + '/**/*.html',
		'**/*.css',
		'**/*.js',
	],
} 
```

`pluginOptions` (object)[browser-sync-webpack-plugin options](https://github.com/Va1/browser-sync-webpack-plugin) to be merged with defaults.

**Defaults**

```js
{
	injectCss: true,
	reload: false,
}
```
#### Return
Returns new `browser-sync-webpack-plugin` instance.

#### Example Usage
See quick start for example usage.

## Jigsaw Build Watcher
```js
jigsaw.watch(paths = ['source/**/*.md', 'source/**/*.php'])
```

`paths` (string | array of strings) Paths to files, dirs to be watched recursively, or glob patterns. See [chokidar.watch docs](https://github.com/paulmillr/chokidar#api) for more info.

#### Example Usage
See quick start for example usage.

## Node Usage
The `jigsaw` command will be available in node just as it is in the command line. It will first look for it locally in your `vendor` directory, then globally in your `PATH`.

All args get passed unmodified so it's really just an alias. You can see an example of it in the quick start section above.