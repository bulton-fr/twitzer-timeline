// Requires
const gulp = require('gulp');

// Include plugins
const sass         = require('gulp-sass');
const concat       = require('gulp-concat');
const rename       = require('gulp-rename');
const cleanCSS     = require('gulp-clean-css');
const minifyJs     = require('gulp-minify');
//const sourcemaps   = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const babel        = require('gulp-babel');

function css() {
    return gulp.src('./src/view/sass/global.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(autoprefixer())
        .pipe(rename('twitzer-unminified.css'))
        .pipe(gulp.dest('./web/assets/css/'))
        .pipe(rename('twitzer.css'))
        //.pipe(sourcemaps.init())
        .pipe(cleanCSS())
        //.pipe(sourcemaps.write('.', {includeContent: false}))
        .pipe(gulp.dest('./web/assets/css/'))
    ;
}

function js() {
    return gulp.src([
        'src/view/js/ajax.js',
        'src/view/js/authForm.js',
        'src/view/js/auth.js',
        'src/view/js/tweets.js',
        'src/view/js/home.js',
        'src/view/js/app.js',
        'src/view/js/global.js',
    ])
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(concat('twitzer.js'))
        .pipe(gulp.dest('web/assets/js'))
        .pipe(minifyJs({
            ext: {
                min: '.min.js'
            }
        }))
        .pipe(gulp.dest('web/assets/js'))
    ;
}

function watch() {
    gulp.watch(['src/view/sass/**/*.scss'], gulp.series('css'));
    gulp.watch(['src/view/js/**/*.js'], gulp.series('js'));
}

exports.css     = css;
exports.js      = js;
exports.watch   = watch;
exports.default = gulp.series(css, js);
