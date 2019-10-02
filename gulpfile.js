const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const cp = require('child_process');
const jsonModify = require('gulp-json-modify');

function serve() {
  const child = cp.spawn(
    'ng',
    ['build', 'ushio', '--watch'],
    {stdio: 'pipe'}
    );
  let child2;
  let watchingDemo = false;
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
  child.stdout.setEncoding('utf8');
  child.stdout.on('data', function(data) {
    if (data.match(/Compilation complete./) && !watchingDemo) {
      child2 = cp.spawn(
        'ng',
        ['serve', 'ushio-demo'],
        { stdio: 'inherit' }
      );
      watchingDemo = true;
    }
  });
  return child;
}

function buildLibrary() {
  return cp.spawn(
    'ng',
    ['build', 'ushio'],
    { stdio: 'inherit' }
    );
}

function buildApp() {
  return cp.spawn(
    'ng',
    ['build', 'ushio-app', '--prod'],
    { stdio: 'inherit' }
    );
}

function buildDemo() {
  return cp.spawn(
    'ng',
    ['build', 'ushio-demo', '--prod'],
    { stdio: 'inherit' }
  );
}

function concatES2015() {
  return (gulp.src([
    './dist/ushio-app/runtime-es2015.js',
    './dist/ushio-app/polyfills-es2015.js',
    './dist/ushio-app/main-es2015.js',
  ])
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(concat('ushio.min.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/ushio/bundles')));
}

function concatES5() {
  return (gulp.src([
    './dist/ushio-app/runtime-es5.js',
    './dist/ushio-app/polyfills-es5.js',
    './dist/ushio-app/main-es5.js',
  ])
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(concat('ushio-es5.min.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/ushio/bundles')));
}

function packageJson() {
  return (gulp.src('./dist/ushio/package.json')
    .pipe(jsonModify({
      key: 'unpkg',
      value: 'bundles/ushio.min.js'
    }))
    .pipe(jsonModify({
      key: 'jsdelivr',
      value: 'bundles/ushio.min.js'
    }))
    .pipe(gulp.dest('./dist/ushio')));
}

exports.serve = serve;

exports.build = gulp.series(
  buildLibrary,
  buildApp,
  concatES2015,
  concatES5,
  packageJson
);

exports.buildDemo = buildDemo;
