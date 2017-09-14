import del from "del";
import path from "path";
import gulp from "gulp";
import open from "open";
import gulpLoadPlugins from "gulp-load-plugins";
import runSequence from "run-sequence";
import shell from 'shelljs';
import webpack from "webpack";
import webpackProdConfig, {PORT as prodPort} from "./configs/webpack.config.prod.babel";
import {PORT as devPort} from "./configs/webpack.config.dev.babel";
import prodBuild from "./configs/prodBuild";
import prodServer from "./configs/prodServer";

const $ = gulpLoadPlugins({ camelize: true });
const outdir = webpackProdConfig.output.path;


// Main tasks
gulp.task('dev', () => runSequence('webpack:dev'));
gulp.task('dist', () => runSequence('clean', 'copy:assets', 'copy:manifest', 'webpack:prod', 'dist:serve', 'opendist'));
gulp.task('clean', ['dist:clean']);
gulp.task('opendist', () => {
    const url = 'http://localhost:'+prodPort;
    open(url);
});

// For dev
//// Start a livereloading development server
gulp.task('webpack:dev', (cb) => {
    // Run external tool synchronously
    let cmd = "webpack-dev-server --config ./configs/webpack.config.dev.babel.js";
    if (shell.exec(cmd).code !== 0) {
        shell.echo('webpack-dev-server start failed!');
        shell.exit(1);
    };
});


// For dist
gulp.task('dist:clean', cb => {
    //or del([outdir], { dot: true }, cb)

    let assetsPath = path.join(outdir);
    shell.rm('-rf', assetsPath);
    shell.mkdir('-p', assetsPath);

    cb();
});

gulp.task('copy:assets', () => {
    let cssdir = path.join(outdir, 'css1');
    let fontsdir = path.join(outdir, 'fonts');
    let imagesdir = path.join(outdir, 'images');

    gulp.src([
            'src/assets/**/*.css'
        ])
        .pipe($.changed(cssdir))
        .pipe(gulp.dest(cssdir))
        .pipe($.size({ title: 'copy css' }))

    gulp.src([
            'src/assets/fonts/**'
        ])
        .pipe($.changed(fontsdir))
        .pipe(gulp.dest(fontsdir))
        .pipe($.size({ title: 'copy fonts' }))

    gulp.src([
            'src/assets/images/**'
        ])
        .pipe($.changed(imagesdir))
        .pipe(gulp.dest(imagesdir))
        .pipe($.size({ title: 'copy images' }))
});


gulp.task('copy:manifest', () => {
    gulp.src([
            'src/manifest.json'
        ])
        .pipe($.changed(outdir))
        .pipe(gulp.dest(outdir))
        .pipe($.size({ title: 'manifest.json' }))
});


gulp.task('dist:serve', (cb) => {
    return prodServer(cb);
});

//// Create a distributable package
gulp.task('webpack:prod', (cb) => {
    // Run external tool synchronously
    // let cmd = "set NODE_ENV=production && webpack --config ./config/webpack.config.prod.babel.js";
    return prodBuild(cb);
});