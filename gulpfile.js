const gulp = require('gulp');
const minifyJs = require('gulp-minify');
const minifyCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const shell = require('gulp-shell');
const imagemin = require('gulp-imagemin');
const gulpPngquant = require('gulp-pngquant');

gulp.task('minify-js', function (done) {
  gulp.src('./scripts/portfolio.js', {
      allowEmpty: true
    })
    .pipe(minifyJs({
      noSource: true
    }))
    .pipe(rename('portfolio.min.js'))
    .pipe(gulp.dest('./scripts/'));

    done();
});

gulp.task('minify-main-css', function (done) {
  gulp.src('./styles/styles.css', {
      allowEmpty: true
    })
    .pipe(minifyCss({
      noSource: true
    }))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('./styles/'));

    done();
});

gulp.task('minify-game-css', function (done) {
  gulp.src('./styles/game.css', {
      allowEmpty: true
    })
    .pipe(minifyCss({
      noSource: true
    }))
    .pipe(rename('game.min.css'))
    .pipe(gulp.dest('./styles/'));
    
    done();
});

gulp.task('minify-portfolio-css', function (done) {
  gulp.src('./styles/portfolio_styles.css', {
      allowEmpty: true
    })
    .pipe(minifyCss({
      noSource: true
    }))
    .pipe(rename('portfolio_styles.min.css'))
    .pipe(gulp.dest('./styles/'));
    
    done();
});

gulp.task('minify', gulp.series('minify-js', 'minify-main-css', 'minify-game-css', 'minify-portfolio-css'));

gulp.task('generate-game-pages', gulp.series(shell.task("node games_generator.js")));

gulp.task('generate-posts', gulp.series(shell.task("node app.js")));

gulp.task('generate-content', gulp.series('generate-posts', 'generate-game-pages'));

gulp.task('compress-pngs', function (done) {
  gulp.src('./diary/**/*.png')
    .pipe(gulpPngquant({
      quality: '65-80'
    }))
    .pipe(gulp.dest('./diary/'));

  done();
});

gulp.task('compress-jpgs', function (done) {
  gulp.src('./diary/**/*.jpg')
    .pipe(imagemin({
      quality: 90
    }))
    .pipe(gulp.dest('./diary/'));

  done();
});

gulp.task('compress-images', gulp.series('compress-pngs', 'compress-jpgs'));

gulp.task('watch', function (done) {
  gulp.watch([
    './styles/styles.css',
    './styles/portfolio_styles.css',
    './styles/game.css',
    './scripts/portfolio.js'
  ], gulp.series('minify'));

  gulp.watch([
    './diary/**/*.md'
  ], gulp.series('generate-posts'))
  done();
});

gulp.task('default', gulp.series('minify', 'generate-content', 'compress-images'));