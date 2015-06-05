/// <binding BeforeBuild='compile-ts' Clean='clean-ts' ProjectOpened='gen-ts-refs, tsd' />
'use strict';

var
    gulp = require('gulp'),
    debug = require('gulp-debug'),
    inject = require('gulp-inject'),
    tslint = require('gulp-tslint'),
    del = require('del'),
    tsproject = require('tsproject'),
    tsd = require('gulp-tsd');

var 
    source = './wwwroot/',
    sourceApp = './wwwroot/app',
    allTypeScript = './wwwroot/app/**/*.ts',
    typings = './tools/typings/',

    appTypeScriptReferences = './tools/typings/typescriptApp.d.ts';

;


//load all .d.ts files from https://github.com/borisyankov/DefinitelyTyped branch tsc-1.5.0-alpha
// see tsd.json
gulp.task('tsd', function (callback) {
    tsd({
        command: 'reinstall',
        config: './tsd.json'
    }, callback);
});

// compile all .ts using TypeScript 1.5-beta with tsconfig.json
gulp.task('compile-ts', function () {
    return tsproject.src(sourceApp, { logLevel: 0 })
      .pipe(debug({ title: 'compile-ts:' }))
      .pipe(gulp.dest('./'));
});


// Generates the app.d.ts references file dynamically from all application *.ts files.
gulp.task('gen-ts-refs', function () {
    var target = gulp.src(appTypeScriptReferences);
    var sources = gulp.src([allTypeScript], {read: false});
    return target.pipe(inject(sources, {
        starttag: '//{',
        endtag: '//}',
        transform: function (filepath) {
            return '/// <reference path="../..' + filepath + '" />';
        }
    })).pipe(gulp.dest(typings));
});

// Lint all custom TypeScript files.
gulp.task('ts-lint', function () {
    return gulp.src(allTypeScript)
      .pipe(debug({ title: 'lint:' }))
      .pipe(tslint()).pipe(tslint.report('prose'));
});



/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean-ts', function (cb) {
  var typeScriptGenFiles = [sourceApp +'/**/*.js',    // path to all JS files auto gen'd by editor
                            sourceApp +'/**/*.js.map' // path to all sourcemap files auto gen'd by editor
                           ];

  // delete the files
  del(typeScriptGenFiles, cb);
});

gulp.task('watch', function() {
    gulp.watch([allTypeScript], ['compile-ts']);
});

gulp.task('default', ['tsd', 'compile-ts', 'gen-ts-refs', 'watch']);
