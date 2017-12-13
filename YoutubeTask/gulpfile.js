var gulp=require('gulp');
var Server = require('karma').Server;
var jshint=require('gulp-jshint');
var concat=require('gulp-concat');
var uglify=require('gulp-uglify');
var rename=require('gulp-rename');

// // Lint
// gulp.task('lint',function(){
// return gulp.src("js/*.js")
// .pipe(jshint())
// .pipe(jshint.reporter('default'));
// });

// uglify
gulp.task('scripts',function(){
return gulp.src('js/*.js')
.pipe(concat('all.js'))
.pipe(gulp.dest("dest"))
.pipe(rename('all.min.js'))
.pipe(uglify())
.pipe(gulp.dest('dest/js'));
});

//watch
gulp.task('watch',function(){
gulp.watch('js/*.js',['lint','scripts']);
});


gulp.task('test', function (done) {
  new Server({
    configFile:  __dirname+ '/karma.conf.js'
   // singleRun: true
  }, done).start();
});


//default
gulp.task('default',['scripts','test']);




