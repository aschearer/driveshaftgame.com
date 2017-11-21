var gulp = require("gulp");
var gutil = require('gulp-util'); 
var exec = require('gulp-exec');

// Compile the site using jekyll
gulp.task("default", function() {
    return gulp.src('_config.yml')
        .pipe(exec('jekyll build --config "<%= file.path %>"'))
        .pipe(exec.reporter());
});

gulp.task("deploy", function() {
    if (!process.env.AWS_KEY)
    {
        console.error("AWS_KEY not defined.");
    }
    else if (!process.env.AWS_SECRET)
    {
        console.error("AWS_SECRET not defined");
    }
    else
    {
        return gulp.src('deploy.yaml')
            .pipe(exec('"tools/stout/stout-windows.exe" deploy --key ' + process.env.AWS_KEY + ' --secret ' + process.env.AWS_SECRET))
            .pipe(exec.reporter());
    }
});