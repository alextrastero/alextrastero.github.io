const { parallel, src, dest } = require('gulp');

const hello = () => {
  return src('src/**/*.md')
    .pipe(dest('./'));
};

exports.default = parallel(hello);
