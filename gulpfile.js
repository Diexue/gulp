var gulp = require('gulp');
var browserSync=require('browser-sync').create();
var plugins = require('gulp-load-plugins')();
// var minifyHtml=require('gulp-minify-html');
gulp.task('browser-sync',function () {
  browserSync.init({
    server:{
      baseDir:"./dist"
    }
  })
});
gulp.task('minifyHtml',function () {
  gulp.src('index.html')
      .pipe(plugins.minifyHtml())
      .pipe(gulp.dest('dist'))
      .pipe(browserSync.reload({
        stream:true
      }))
});
gulp.task('mini-js',function () {
  gulp.src('js/*.js')
      .pipe(plugins.uglify())
      .pipe(plugins.concat('index.min.js'))
      .pipe(gulp.dest('dist/js'))
});
gulp.task('mini-css',function () {
  gulp.src('css/*.css')
    .pipe(plugins.minifyCss())
    .pipe(plugins.rename('index.min.css'))
    .pipe(gulp.dest('dist/css'))
});
gulp.task('image',function () {
  gulp.src('images/*.jpg')
    .pipe(plugins.imagemin({
      progressive:true,
    }))
    .pipe(plugins.rename('index.jpg'))
    .pipe(gulp.dest('dist/images'))
});
gulp.task("default",['minifyHtml','browser-sync','mini-js','mini-css','image'],function () {
  gulp.watch('index.html',['minifyHtml','browser-sync','mini-js','mini-css','image'])
});
