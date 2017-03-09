'use strict';
const gulp = require('gulp');
const zip  = require('gulp-zip');
const fs   = require('fs');
const path = require('path');
const del  = require('del');
const rename = require('gulp-rename');
const filter = require('gulp-filter');

gulp.task('clean-dist', () => {
  del.sync('dist.zip', { force:true });
});

gulp.task('dist', ['clean-dist'], () => {
  const f = filter('package.json', {restore: true});
  return gulp.src(['build/**/*', 'package.json'])
    .pipe(f)
    .pipe(rename({
       dirname: 'app/'
    }))
    .pipe(f.restore)
    .pipe(zip('dist.zip'))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['dist']);
