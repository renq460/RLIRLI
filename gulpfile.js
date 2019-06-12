var renq_gulp = require('gulp')

//1.测试
function test() {
    console.log('gulp环境配置测试');
    return Promise.resolve();
}
renq_gulp.task('test', test)

//2.复制index.html
function copyIndex() {
    return renq_gulp.src('./src/index.html').pipe(renq_gulp.dest('./build'))
}

renq_gulp.task('copy-index', copyIndex)

//3.复制html
function copyHtml() {
    return renq_gulp.src('./src/html/*.html')
        .pipe(renq_gulp.dest('./build/html'))
}

renq_gulp.task('copy-html', copyHtml)

//4.拷贝images
function copyImg() {
    return renq_gulp.src('./src/assets/images/**/*.{jpg,gif,jpeg,png,webp}')
        .pipe(renq_gulp.dest('./build/assets/images'))
}

renq_gulp.task('copy-img', copyImg)

//copy 合并
const copy = renq_gulp.parallel(copyIndex,copyHtml,copyImg)
renq_gulp.task('copy', copy)
//编译sass

const renq_sass = require('gulp-sass')

function sass() {
    return renq_gulp.src("./src/style/**/*.scss")
    .pipe(renq_sass())
    .pipe(renq_gulp.dest('./build/style'))
}

renq_gulp.task('sass',sass)
//gulp 文件的连接和压缩，需要插件 gulp-concat,gulp-uglify

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

function js() {
    return renq_gulp.src('./src/script/*.js')
    .pipe(concat('output.js'))
    .pipe(uglify())
    .pipe(renq_gulp.dest('./build/script'))
}

renq_gulp.task('js',js)

//生成精灵图，插件gulp.spritesmith
const spriteSmith = require('gulp.spritesmith')
function sprite() {
    return renq_gulp.src('./src/assets/icons/**/*.png')
    .pipe(spriteSmith({
        imgName: "icons.png",
        cssName: "icons.css"
    }))
    .pipe(renq_gulp.dest('./build/assets/icons'))
}

renq_gulp.task('sprite',sprite)