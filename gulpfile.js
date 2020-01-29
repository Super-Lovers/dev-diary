const gulp = require('gulp');
const minifyJs = require('gulp-minify');
const minifyCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const shell = require('gulp-shell');

gulp.task('minify-js', () => {
  return gulp.src('./scripts/portfolio.js', { allowEmpty: true }) 
    .pipe(minifyJs({noSource: true}))
    .pipe(rename('portfolio.min.js'))
    .pipe(gulp.dest('./scripts/'))
});

gulp.task('minify-main-css', () => {
  return gulp.src('./styles/styles.css', { allowEmpty: true }) 
    .pipe(minifyCss({noSource: true}))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('./styles/'))
});

gulp.task('minify-game-css', () => {
  return gulp.src('./styles/game.css', { allowEmpty: true }) 
    .pipe(minifyCss({noSource: true}))
    .pipe(rename('game.min.css'))
    .pipe(gulp.dest('./styles/'))
});

gulp.task('minify-portfolio-css', () => {
  return gulp.src('./styles/portfolio_styles.css', { allowEmpty: true }) 
    .pipe(minifyCss({noSource: true}))
    .pipe(rename('portfolio_styles.min.css'))
    .pipe(gulp.dest('./styles/'))
});

gulp.task('minify', gulp.series('minify-js', 'minify-main-css', 'minify-game-css', 'minify-portfolio-css'));

gulp.task('generate-game-pages', gulp.series(shell.task("node games_generator.js")));

gulp.task('generate-dev-posts', gulp.series(shell.task("node app.js")));

gulp.task('generate-content', gulp.series('generate-dev-posts', 'generate-game-pages'));

gulp.task('default', gulp.series('minify', 'generate-content'));
