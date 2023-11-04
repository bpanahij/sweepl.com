const fs = require('fs');
const path = './public/worker.js';

fs.readFile(path, 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }

  const versionMatch = data.match(/const version = "(.*)"/);
  const imageVersionMatch = data.match(/const imageVersion = "(.*)"/);

  if (versionMatch && imageVersionMatch) {
    let [major, minor, patch] = versionMatch[1].split('.');
    patch = parseInt(patch, 10) + 1;
    const newVersion = `${major}.${minor}.${patch}`;
    const result = data
      .replace(/const version = "(.*)"/, `const version = "${newVersion}"`)

    fs.writeFile(path, result, 'utf8', function(err) {
      if (err) return console.log(err);
    });
  }
});
