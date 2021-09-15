const { src, dest, series, watch, parallel } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));;
const autoprefixer = require('gulp-autoprefixer');

function styles(cb) {
  src('./styles/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 version'],
      cascade: false
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./'));

  cb();
}

function watching(cb) {
  watch('src/**/*.scss', styles);

  cb();
}

exports.build = series(styles);
exports.default = series(
  styles,
  parallel(watching)
);
