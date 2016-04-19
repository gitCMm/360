
// 构建时要用到配置文件

// 所用的代码是node环境的代码

// 引入gulp包
var gulp = require('gulp');

// 自动添加CSS私有前缀的包
var autoprefixer = require('gulp-autoprefixer');

// 合并js的包
var concat = require('gulp-concat');

// 压缩js
var uglify = require('gulp-uglify');

// 引入压缩图片的包
var imagemin = require('gulp-imagemin');

// 引入压缩html的包
var htmlmin = require('gulp-htmlmin');

// 生成指纹名
var rev = require('gulp-rev');

// 引入替换资源的包
var revCollector = require('gulp-rev-collector');

// gulp下面开放出来好多的方法，利用这些方法可以帮我们实现构任务

// 自动添加css前缀
gulp.task('css', function () {
	// console.log('css构建 ');

	// 获取所有以.css结尾的资源
	return gulp.src('./css/*.css', {base: './'})

		// 通过pipe将获得的css文件传递给了gulp-autoprefixer
		.pipe(autoprefixer())

		// .pipe('压缩') 伪代码

		// 将构建好的资源存放到./dist目录下
		.pipe(gulp.dest('./dist'));
});

// 构建工具实际上将前端资源分成一个一个的小任务

// 每一个小任务分别由不同gulp插件来执行


// 1、gulp.src 用来获取需要构建的前端资源的路径
// 2、gulp.dest 构建完成后需要将构建好的资源存放起来，存到某一个目录下
// 3、gulp.pipe 将获取的资源进行传递，起到“承前启后”的工作
// 4、gulp.task 指定具体的任务

// 合并js
gulp.task('js', function () {
	// console.log('js构建 ')

	return gulp.src('./js/*.js', {base: './'})

		// .pipe(concat('all.js'))

		.pipe(uglify())

		.pipe(gulp.dest('./dist'));

});

// 压缩图片
gulp.task('image', function () {
	return gulp.src('./images/*', {base: './'})
		.pipe(imagemin())
		.pipe(gulp.dest('./dist'));
});


// 压缩html
gulp.task('html', function () {
	return gulp.src('./*.html')
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true,
			minifyJS: true
		}))
		.pipe(gulp.dest('./dist'));
});

// 专门提取指纹名称的任务
gulp.task('rev', ['html', 'css', 'js', 'image'], function () {
	return gulp.src(['./dist/css/*.css', './dist/js/*.js', './dist/images/*'], {base: './dist'})
		.pipe(rev())
		.pipe(gulp.dest('./dist'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('./rev'));
});


// 替换静态资源
gulp.task('revCollector', ['rev'], function () {
	gulp.src(['./rev/*.json', './dist/*.html'])
	.pipe(revCollector())
	.pipe(gulp.dest('./dist'));
});



// 指定一个任务
gulp.task('step1', function () {
	console.log('step1');
});

// 指定另一个任务
gulp.task('step2', function () {
	console.log('step2');
});

// 指定依赖关系调用上面两个任务
gulp.task('default', ['step1', 'step2'], function () {

});

