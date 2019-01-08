var gulp            = require('gulp');
var browserSync     = require('browser-sync').create();
var sourcemaps      = require('gulp-sourcemaps');
var sass            = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');
var concat          = require('gulp-concat');
var uglify          = require('gulp-uglify');
var jade            = require('gulp-jade');
var pump            = require('pump');
var rigger          = require('gulp-rigger');
var rename          = require('gulp-rename');

// Static Server + watching scss/html files
gulp.task('serve', ['templates', 'sass', 'js'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./scss/**/*.scss", ['sass']);
    gulp.watch("./scripts/**/*.js", ['js']);
    gulp.watch("./**/*.jade", ['templates']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("./scss/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
           browsers: ['last 12 versions','ie>11'],
        }))
        .pipe(concat('main.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
}); 


// Work with JS
gulp.task('js', function (cb) {
  pump([
        gulp.src('./scripts/**/*.js'),
        rigger(),
        sourcemaps.init(),
        uglify(),
        sourcemaps.write(),
        rename({
          suffix: ".min"
        }),
        gulp.dest('./js')
    ],
    cb  
  );
  browserSync.reload();
});

// Work with Jade files
gulp.task('templates', function() {
  return gulp.src(['./jade/**/*.jade', '!./jade/**/_*.jade'])
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
  });

gulp.task('default', ['serve']);
