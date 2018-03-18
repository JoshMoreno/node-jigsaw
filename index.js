const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const argv = require('yargs').argv;
const Watcher = require('./src/Watcher');

const env = argv.e || argv.env || 'local';
const port = argv.p || argv.port || 3000;
const buildPath = 'build_' + env;

module.exports = {
    watch: function (paths) {
        return new Watcher(paths);
    },

    /**
     * Builds the browser-sync webpack plugin instance
     *
     * @param browserSyncOptions
     * @param pluginOptions
     * @returns {BrowserSyncPlugin}
     */
    browserSync: function (browserSyncOptions = {}, pluginOptions = {}) {
        const mergedOptions = Object.assign({
            port: port,
            server: {baseDir: buildPath},
            serveStatic: ['./source'],
            files: [
                buildPath + '/**/*.html',
                '**/*.css',
                '**/*.js',
            ],
        }, browserSyncOptions);

        const mergedPluginOptions = Object.assign({
            injectCss: true,
            reload: false,
        }, pluginOptions);

        return new BrowserSyncPlugin(mergedOptions, mergedPluginOptions);
    }
};