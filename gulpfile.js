const gulp = require('gulp')
const $ = require('gulp-load-plugins')()

const pump = require('pump-promise')

$.sass.compiler = require('node-sass')

let srcDir = 'depic-src'
let bldDir = 'depic-build'

// #region Code
gulp.task('scss', () => {
  return new Promise((resolve, reject) => {
    pump([gulp.src(`${srcDir}/**/*.scss`), $.newer(bldDir), $.sass.sync({ outputStyle: 'compressed' }).on('error', $.sass.logError), $.concat('styles.css'), gulp.dest(bldDir)])
      .then(resolve)
      .catch(reject)
  })
})

gulp.task('html', () => {
  return new Promise((resolve, reject) => {
    pump([
      gulp.src(`${srcDir}/**/*.html`),
      $.newer(bldDir),
      $.htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        sortAttributes: true,
        sortClassName: true
      }),
      gulp.dest(bldDir)
    ])
      .then(resolve)
      .catch(reject)
  })
})

gulp.task('php', () => {
  return new Promise((resolve, reject) => {
    pump([gulp.src(`${srcDir}/**/*.php`), $.newer(bldDir), gulp.dest(bldDir)])
      .then(resolve)
      .catch(reject)
  })
})

gulp.task('ts', () => {
  return new Promise((resolve, reject) => {
    pump([gulp.src(`${srcDir}/**/*.ts`), $.newer(bldDir), $.typescript({ lib: ['dom', 'esnext'], declaration: false }), $.concat('scripts.js'), $.uglify(), gulp.dest(bldDir)])
      .then(resolve)
      .catch(reject)
  })
})

gulp.task('code', gulp.parallel('scss', 'html', 'php', 'ts'))
// #endregion

// #region Static
gulp.task('assets', () => {
  return new Promise((resolve, reject) => {
    pump([gulp.src(`${srcDir}/assets/**/*`), gulp.dest(`${bldDir}/assets/`)])
      .then(resolve)
      .catch(reject)
  })
})

gulp.task('root', () => {
  return new Promise((resolve, reject) => {
    pump([gulp.src([`${srcDir}/apple-touch-icon.png`, `${srcDir}/CydiaIcon.png`]), gulp.dest(`${bldDir}/`)])
      .then(resolve)
      .catch(reject)
  })
})

gulp.task('deb', () => {
  return new Promise((resolve, reject) => {
    pump([gulp.src('deb/**/*'), gulp.dest(`${bldDir}/deb/`)])
      .then(resolve)
      .catch(reject)
  })
})

gulp.task('packages', () => {
  return new Promise((resolve, reject) => {
    pump([gulp.src('Packages*'), gulp.dest(`${bldDir}/`)])
      .then(resolve)
      .catch(reject)
  })
})

gulp.task('release', () => {
  return new Promise((resolve, reject) => {
    pump([gulp.src('Release'), gulp.dest(`${bldDir}/`)])
      .then(resolve)
      .catch(reject)
  })
})

gulp.task('repo', gulp.parallel('deb', 'packages', 'release'))
gulp.task('static', gulp.parallel('assets', 'root', 'repo'))
// #endreion

gulp.task('all', gulp.parallel('code', 'static'))
gulp.task('default', gulp.parallel('code'))
