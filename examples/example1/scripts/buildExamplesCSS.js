const CleanCSS = require('clean-css');
const fs = require('fs');

const basePath = __dirname.replace('/scripts', '');
const inputPath = basePath + '/src/example.css';
const outputPath = basePath + '/_gh-pages/example.css';

fs.readFile(inputPath, 'utf8', function(err, CSS) {
  if (err) console.log(err);
  const format = new CleanCSS({ level: 2 });
  const { styles } = format.minify(CSS);
  if (styles) {
    fs.writeFile(outputPath, styles, 'utf8', function(err) {
      if (err) console.log(err);
    });
  }
});
