import gulp from 'gulp';
import gPostcsss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

const postcssPlugins = [cssnano(), autoprefixer()];
gulp.task('css', () => gulp.src('./src/css/styles.css').pipe(gPostcsss(postcssPlugins)).pipe(gulp.dest('./public')));

gulp.task('default', () => gulp.watch('./src/css/styles.css', gulp.series('css')));
