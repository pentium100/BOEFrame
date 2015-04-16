var gulp = require('gulp');
var rev = require('gulp-rev');
var clean = require('gulp-clean');

var yeoman = {


	app: 'src/main/webapp',
	dist: 'src/main/webapp/dist'
}
gulp.task('clean-script', function(){

	return gulp.src(yeoman.dist, {read:false})
	            .pipe(clean());
})
gulp.task('rev', function () {
    return gulp.src(yeoman.app+'/js/**/*.*' )
    	.pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest(yeoman.dist+'/js'));
});