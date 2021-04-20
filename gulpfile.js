const { src, dest, watch, series} = require('gulp');
var gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const inject = require('gulp-inject');
const browsersync = require('browser-sync').create();

function scssTask(){
    return src('front-end/scss/style.scss',{ sourcemaps: '.' })
      .pipe(sass())
      .pipe(dest('css', { sourcemaps: '.' }));
  }
  function cssminifyTask(){
    return src('front-end/scss/style.scss', { sourcemaps: '.' })
    .pipe(sass())
    .pipe(postcss([cssnano()]))
    .pipe(dest('min', { sourcemaps: '.' }));
  }
  function jsTask(){
    return src('front-end/js/*.js', { sourcemaps: '.' })
      .pipe(terser())
      .pipe(dest('min', { sourcemaps: '.' }));
  }
  function svgSpriteTask(){
    return src('front-end/img/svg/*',{ sourcemaps: '.' })
    .pipe(svgmin({
        plugins: [{
            removeViewBox: false
        }]
    }))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(dest('sprites',{ sourcemaps: '.' }))
    
  }
  function svgInject(){
    return src('./index.html')
    .pipe(inject(src(['sprites/*.svg']), {
      starttag: '<!-- inject:body -->',
      transform: function (filePath, file) {
        return file.contents.toString('utf8')
      }
    }))
    .pipe(dest('./'));
    
  }
  function browsersyncServe(cb){
    browsersync.init({
      server: {
        baseDir: '.'
      }
    });
    cb();
  }
  
  function browsersyncReload(cb){
    browsersync.reload();
    cb();
  }
  
  
  function watchTask(){
    watch('*.html', browsersyncReload);
    watch(['front-end/scss/**/*.scss', 'front-end/js/**/*.js','front-end/img/svg/*.svg'], series(scssTask,cssminifyTask, jsTask,svgSpriteTask,svgInject, browsersyncReload));
  }
  
  
  exports.default = series(
    scssTask,
    cssminifyTask,
    jsTask,
    svgSpriteTask,
    svgInject,
    browsersyncServe,
    watchTask
  );