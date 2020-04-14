'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync');
const del = require('del');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const minify = require('gulp-minify');
const svgstore = require('gulp-svgstore');
const posthtml = require('gulp-posthtml');
const include = require('posthtml-include');

gulp.task('clean', function () {
  return del('build');
});

gulp.task('copy', function () {
  return gulp.src([
      'source/fonts/**/*.{woff,woff2}',
    ], {
      base: 'source'
    })
    .pipe(gulp.dest('build'));
});

gulp.task('html', () => {
  return gulp.src('source/*.html')
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest('build'));
});

gulp.task('css', () => {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('images', function () {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo({plugins: [{removeViewBox: false}]})
    ]))
    .pipe(gulp.dest('build/img'));
});

gulp.task('webp', function () {
  return gulp.src('build/img/**/*.{png,jpg}')
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('build/img'));
});

gulp.task('sprite', function () {
  return gulp.src('build/img/sprite-*.svg')
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('js', function () {
  return gulp.src('source/js/*.js')
    .pipe(minify({
      ext: {
          src:'.js',
          min:'.min.js'
      }}))
    .pipe(gulp.dest('build/js'))
});

gulp.task('server', () => {
  server.init({
    server: 'build',
    notify: false,
    open: false,
    cors: true,
    ui: false
  })

  gulp.watch('source/sass/**/*scss', gulp.series('css'))
  gulp.watch('source/*html', gulp.series('html', 'refresh'));
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

gulp.task('build', gulp.series(
  'clean',
  'copy',
  'css',
  'images',
  'webp',
  'sprite',
  'html',
  'js'
));

gulp.task('start', gulp.series('build', 'server'));
