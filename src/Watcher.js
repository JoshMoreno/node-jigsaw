const argv = require('yargs').argv;
const browserSync = require('browser-sync');
const chokidar = require('chokidar');
const spawn = require('cross-spawn');
const path = require('./helpers').path();
let env = argv.e || argv.env || 'local';

class Jigsaw {
    constructor(paths) {
        // only run this if we're running under --watch
        if (!argv.watch) {
            return;
        }

        if (!paths) {
            paths = ['source/**/*.md', 'source/**/*.php'];
        }

        this.paths = paths;
        this.watcher = this.initWatcher();
        this.initEventListeners();
        this.build();
    }

    initWatcher() {
        return chokidar.watch(this.paths, {ignoreInitial: true});
    }

    initEventListeners() {
        this.watcher
            .on('add', path => this.build())
            .on('change', path => this.build())
            .on('unlink', path => this.build());
    }

    build() {
        const response = spawn.sync(path, ['build', env]);
        const output = response.error ? response.stderr : response.stdout;
        console.log(output.toString());
        this.reloadBrowserSync();
    }

    reloadBrowserSync() {
        try {
            browserSync.get('bs-webpack-plugin').reload();
        } catch (error) {
            // no need to throw an error here
        }
    }
}

module.exports = Jigsaw;