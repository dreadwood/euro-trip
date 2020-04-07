'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const server = require('browser-sync');

gulp.task('css', () => {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('source/'))
    .pipe(server.stream()); // узнать подробнее о методе
});

gulp.task('server', () => {
  server.init({
    server: 'source/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  })

  gulp.watch('source/sass/**/*scss', gulp.series('css'));

});

gulp.task('start', gulp.series('css', 'server'));
