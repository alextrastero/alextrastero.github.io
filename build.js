const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const collections = require('metalsmith-collections');
const permalinks = require('metalsmith-permalinks');
const handlebars = require('handlebars');
const fs = require('fs');

handlebars.registerPartial(
  'navigation',
  fs.readFileSync(__dirname + '/layouts/partials/navigation.hbt').toString()
);

Metalsmith(__dirname)
  .source('src')
  .destination('./')
  .clean(false)
  .use(collections({
    articles: 'articles/*.md',
  }))
  .use(markdown())
  .use(permalinks({
    relative: false,
  }))
  .use(layouts({
    engine: 'handlebars',
    directory: './layouts',
    default: 'article.html',
    pattern: ['*/*/*html', '*/*html', '*html'],
    partials: {
      navigation: 'partials/navigation',
    }
  }))
  .build(err => {
    if (err) {
      console.error(err);
    } else {
      console.log('build complete');
    }
  });
