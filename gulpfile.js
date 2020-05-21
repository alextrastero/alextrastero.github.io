const { series, src, dest } = require('gulp');
const compileHandlebars = require('gulp-compile-handlebars');
const path = require('path');
const markdown = require('gulp-markdown');
const frontMatter = require('gulp-front-matter');
const del = require('del');
const browserSync = require('browser-sync');
const rename = require('gulp-rename');
const layout = require('gulp-layout');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const data = require('gulp-data');

sass.compiler = require('node-sass');

const styles = () => {
  return src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./build/css'));
}

const parseLayout = file => {
  const layout = file.frontMatter.layout || 'article.hbs';

  return {
    ...file.frontMatter,
    articles: articlesData,
    engine: 'handlebars',
    layout: `${__dirname}/layouts/${layout}`
  }
};

const parseRename = path => {
  if (path.basename !== 'index') {
    return {
      ...path,
      dirname: `${path.dirname}/${path.basename}`,
      basename: 'index',
    }
  }

  return path;
};

const articlesData = [];
const collection = () => {
  return src('src/**/*.md')
    .pipe(frontMatter())
    .pipe(data(file => {
      // only if file has title
      if (file.frontMatter.title) {
        articlesData.push({
          path: `articles/${path.basename(file.path, '.md')}`,
          ...file.frontMatter,
        })
      }
    }))
};

const templates = () => {
  return src('src/**/*.md')
    .pipe(plumber())
    .pipe(frontMatter())
    .pipe(markdown())
    .pipe(layout(parseLayout))
    .pipe(compileHandlebars({}, {
      batch: './layouts/partials/',
    }))
    .pipe(rename(parseRename))
    .pipe(dest('./build'))
};

const clean = () => {
  return del('./build');
};

const serve = () => {
  browserSync({
    server: './build',
    open: false,
  });
};

const run = series(styles, collection, templates);
exports.build = series(clean, run);
exports.default = series(run, serve);
