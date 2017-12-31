const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const proxy = require('http-proxy-middleware');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const gulpif = require('gulp-if');
const scp = require('gulp-scp2');
const eslint = require('gulp-eslint');
const autoprefixer = require('gulp-autoprefixer');
const config = require('./configuration');
const appName = config.appName;

const shouldUglify = process.env.npm_lifecycle_script === 'gulp build';

gulp.task('sass', () => {
  /* eslint-disable no-useless-escape */
  return gulp.src(['./public/stylesheets/**/*.sass', '!./public/stylesheets/**/\_*.sass'])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 20 versions'],
      cascade: false
    }))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./public/stylesheets'))
    .pipe(browserSync.stream());
});

gulp.task('js:not-utils', () => {
  return gulp.src(['./public/javascripts/**/*.js', '!./public/javascripts/utils/**/*.js', '!./public/javascripts/**/*.min.js'])
    .pipe(babel({
      presets: ['env'],
      plugins: ['transform-es2015-modules-umd']
    }))
    .pipe(gulpif(shouldUglify, uglify()))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./public/javascripts'))
    .pipe(browserSync.stream());
});

gulp.task('js:utils', () => {
  return gulp.src(['./public/javascripts/utils/*.js'])
    .pipe(babel({
      presets: ['env'],
      plugins: ['transform-es2015-modules-umd']
    }))
    .pipe(gulpif(shouldUglify, uglify()))
    .pipe(concat('utils.js'))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./public/javascripts'))
    .pipe(browserSync.stream());
});

gulp.task('js', ['js:not-utils', 'js:utils'], () => {});

gulp.task('lint:not-utils', () => {
  return gulp.src(['./public/javascripts/**/*.js', '!./public/javascripts/utils/**/*.js', '!./public/javascripts/**/*.min.js'])
    .pipe(eslint())
    .pipe(eslint.format());
  // .pipe(eslint.failAfterError());
});

gulp.task('lint:utils', () => {
  return gulp.src(['./public/javascripts/utils/**/*.js', '!./public/javascripts/utils/**/*.min.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('reload', () => {
  browserSync.reload();
});

gulp.task('dev', ['sass', 'js'], () => {
  console.log(`[${new Date()}]: ready to develop!`);
  browserSync.init({
    server: {
      baseDir: './public',
      directory: true,
      routes: {
        [`/${appName}`]: 'dist'
      }
    },
    port: '15050',
    startPath: '/',
    middleware: [
      proxy('/', { target: 'http://localhost:17070', changeOrigin: true })
    ]
  });

  gulp.watch(['./public/stylesheets/**/*.sass'], ['sass']);
  gulp.watch(['./public/javascripts/utils/**/*.js', './public/javascripts/utils/**/*.min.js'], ['js:utils', 'lint:utils']);
  gulp.watch(['./public/javascripts/**/*.js', '!./public/javascripts/utils/**/*.js', '!./public/javascripts/**/*.min.js'], ['js:not-utils', 'lint:not-utils']);
  gulp.watch(['./views/**/*.pug'], ['reload']);
});

gulp.task('build', ['sass', 'js'], () => {
  console.log(`[${new Date()}]: Finish building!`);
});

gulp.task('deploy:assets', () => {
  return gulp.src(['./public/assets/**/*.*'])
    .pipe(scp({
      host: config.deploy.hostname,
      username: config.deploy.username,
      password: config.deploy.password,
      dest: `${config.deploy.dest}/public/assets/`
    }));
});

gulp.task('deploy:images', () => {
  return gulp.src(['./public/images/**/*.*'])
    .pipe(scp({
      host: config.deploy.hostname,
      username: config.deploy.username,
      password: config.deploy.password,
      dest: `${config.deploy.dest}/public/images/`
    }));
});

gulp.task('deploy:js', () => {
  return gulp.src(['./public/javascripts/**/*.min.js'])
    .pipe(scp({
      host: config.deploy.hostname,
      username: config.deploy.username,
      password: config.deploy.password,
      dest: `${config.deploy.dest}/public/javascripts/`
    }));
});

gulp.task('deploy:css', () => {
  return gulp.src(['./public/stylesheets/**/*.min.css'])
    .pipe(scp({
      host: config.deploy.hostname,
      username: config.deploy.username,
      password: config.deploy.password,
      dest: `${config.deploy.dest}/public/stylesheets/`
    }));
});

gulp.task('deploy:view', () => {
  return gulp.src(['./views/**/*.pug'])
    .pipe(scp({
      host: config.deploy.hostname,
      username: config.deploy.username,
      password: config.deploy.password,
      dest: `${config.deploy.dest}/views/`
    }));
});

gulp.task('deploy', ['deploy:assets', 'deploy:images', 'deploy:js', 'deploy:css', 'deploy:view'], () => {
  console.log('发布完毕！');
});
