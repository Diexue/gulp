"# gulp" 
新建一个gulp文件夹，并在该目录下执行 npm init 命令以创建一个package.json文件。
npm i gulp -s 命令作为项目的开发依赖（devDependencies）
根目录下创建gulpfile.js
以下代码中定义了一个简单的默认任务
var gulp = require('gulp');
gulp.task('default',function(){
    console.log('hello world');
});
运行gulp任务，只需切换到存放gulpfile.js文件的目录执行gulp，gulp 后面加上任务名执行指定任务，否则执行默认任务。
gulp.task方法用来定义任务
gulp.src()输出符合所提供的匹配模式或者匹配模式的数组的文件(gulp.src('js/*.js'),gulp.src(['js/*.js','js/js/*.js']))
gulp.dest()方法是用来写文件的
gulp.watch()用来监视文件的变化
gulp.task('mini-js',function () {
  gulp.src('js/*.js')    //该任务针对的文件
      .pipe(plugins.uglify()) //该任务调用的模块
      .pipe(plugins.concat('index.min.js')) 
      .pipe(gulp.dest('dist/js')) //写入dist/js文件夹中
});
常用gulp插件
1.gulp-load-plugins自动加载插件
  通常要使用gulp的插件，首先得用require来把插件加载进来，如果我们要使用的插件非常多，会使我们的gulpfile.js文件变得很冗长，如下
  var gulp = require('gulp'),
    //一些gulp插件,abcd这些命名只是用来举个例子
    a = require('gulp-a'), 
    b = require('gulp-b'),
    c = require('gulp-c'),
     //更多的插件...
    z = require('gulp-z'); 
  而 gulp-load-plugins 这个插件能自动帮你加载package.json文件里的gulp插件  
  （gulp-load-plugins并不会一开始就加载所有package.json里的gulp插件，而是在我们需要用到某个插件的时候，才去加载那个插件）使用方法如下：
  在gulpfile.js中
    var gulp = require('gulp');
    //加载gulp-load-plugins插件，并马上运行它
    var plugins = require('gulp-load-plugins')();
    在使用gulp-rename插件时，用plugins.rename代替（也就是原始插件名去掉gulp-前缀，之后再转换为驼峰命名）
2.gulp-rename 重命名
  .pipe(rename('jquery.min.js')) //会将jquery.js重命名为jquery.min.js
3.gulp-uglify js文件压缩
    gulp.task('minify-js', function () {//minify-js自定义任务名
      gulp.src('js/*.js') // 要压缩的js文件
      .pipe(plugins.uglify())  //使用uglify进行压缩,更多配置请参考：
      .pipe(gulp.dest('dist/js')); //压缩后的路径
    });
4.gulp-minify-css css文件压缩 
5.gulp-minify-html html文件压缩
6.gulp-jshint js代码检查
7.gulp-concat 文件合并
8.gulp-less less文件编译
9.gulp-imagemin 图片压缩
10.Browsersync + Gulp.js
  npm i browser-sync gulp -s
  在gulpfile.js 文件中
  var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// 启动静态服务器
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});
相应的task任务中重载浏览器
   .pipe(browserSync.reload({
        stream:true
      }))
