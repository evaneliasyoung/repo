const gulp = require('gulp')
const $ = require('gulp-load-plugins')()

const pump = require('pump-promise')

$.sass.compiler = require('node-sass')

let srcDir = 'depic-src'
let bldDir = 'depic-build'

// #region Code
gulp.task('css', () => {
  return new Promise((resolve, reject) => {
    pump([gulp.src(`${srcDir}/**/*.scss`), $.newer(bldDir), $.sass.sync({ outputStyle: 'compressed' }).on('error', $.sass.logError), gulp.dest(bldDir)])
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

gulp.task('ts', () => {
  return new Promise((resolve, reject) => {
    pump([gulp.src(`${srcDir}/**/*.ts`), $.newer(bldDir), $.typescript({ declaration: true }), gulp.dest(bldDir)])
      .then(resolve)
      .catch(reject)
  })
})

gulp.task('code', gulp.parallel('css', 'html', 'ts'))
// #endregion

// #region Static
gulp.task('fonts', () => {
  return new Promise((resolve, reject) => {
    pump([gulp.src(`${srcDir}/fonts/*`), gulp.dest(`${bldDir}/fonts/`)])
      .then(resolve)
      .catch(reject)
  })
})

gulp.task('data', () => {
  return new Promise((resolve, reject) => {
    pump([gulp.src(`${srcDir}/data/*`), gulp.dest(`${bldDir}/data/`)])
      .then(resolve)
      .catch(reject)
  })
})

gulp.task('tweaks', () => {
  return new Promise((resolve, reject) => {
    pump([gulp.src(`${srcDir}/tweaks/**/*`), gulp.dest(`${bldDir}/tweaks/`)])
      .then(resolve)
      .catch(reject)
  })
})

gulp.task('static', gulp.parallel('fonts', 'data', 'tweaks'))
// #endreion

gulp.task('all', gulp.parallel('code', 'static'))
gulp.task('default', gulp.parallel('code'))
