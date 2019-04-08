var gulp = require("gulp");
var webserver = require("gulp-webserver");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");
var cssclean = require("gulp-clean-css");
// var babel = require("gulp-babel");

gulp.task('webserver', function() {
    return gulp.src('./src/')
        .pipe(webserver({
            port: 8888,
            livereload: true,
            proxies: [
				{source:"/api/getData",target:"http://localhost:3000/api/getData"},
				{source:"/api/removeData",target:"http://localhost:3000/api/removeData"},
				{source:"/api/newData",target:"http://localhost:3000/api/newData"},
				{source:"/api/updateData",target:"http://localhost:3000/api/updateData"},
				{source:"/api/findData",target:"http://localhost:3000/api/findData"}
            ]
        }))
})

gulp.task('scss', function() {
    return gulp.src("./src/css/scss/*.scss")
        .pipe(sass()) //编译
        .pipe(cssclean()) //压缩
        .pipe(gulp.dest("./src/css/"))
})

gulp.task('js', function() {
    return gulp.src('./src/js/style/*.js')
//         .pipe(babel({
//             presets: 'es2015'
//         })) //编译es6 -es5
        .pipe(concat("all.js")) //合并
        .pipe(uglify()) //压缩
        .pipe(gulp.dest('./src/js/'))
})

gulp.task('html', function() {
    return gulp.src("./src/*.html")
        // .pipe(htmlmin()) //压缩
        .pipe(gulp.dest("./dist/"))
});

//压缩图片
//  gulp.task('img',function(){
//     return gulp.src("./src/")
//     // .pipe(imgmin()) //压缩
//     .pipe(gulp.dest("./dist/img/"))
// })

//压缩css
gulp.task('css', function() {
    return gulp.src("./src/css/*.css")
        .pipe(cssclean()) //压缩
        .pipe(gulp.dest("./dist/css/"))
})

//压缩js
gulp.task('distJs', function() {
    return gulp.src("./src/js/*.js")
        .pipe(gulp.dest("./dist/js/"))
})

//进行css文件监听，自动执行对应的任务
gulp.task('watch', function() {
    gulp.watch(['./src/css/scss/*.scss', './src/js/style/*.js'], gulp.series('scss', 'js'));
})


//默认执行webserver服务，js，css，watch任务
gulp.task('default', gulp.series('webserver', 'js', 'scss', 'watch'));

// //启动开发环境
gulp.task('dev', gulp.series('webserver', 'scss', 'watch'));

///实现打包，生成打包文件夹
gulp.task('build', gulp.parallel('html', 'distJs', 'css'));