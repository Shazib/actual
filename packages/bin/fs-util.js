const Path = require('path');

const fg = require('fast-glob');
var fs = require('fs-extra');

// deprecated in favour of rm but its cleaner to not need caller
// to pass the force & recursive params each time
delete fs['rmdir'];

fs.rmdir = async dir => {
  await fs.rm(dir, { recursive: true, force: true });
};

fs.copyFileToFolder = async (file, dest) => {
  await fs.copyFile(file, Path.join(dest, Path.parse(file).base));
};

fs.findFiles = async (directory, pattern, relativePath = false) => {
  if (relativePath) {
    return fg(pattern, { cwd: directory, absolute: false });
  }
  return fg(pattern, { cwd: directory, absolute: true });
};

fs.removeFiles = async pattern => {
  let files = await fg(pattern);
  await Promise.all(files.map(file => fs.unlink(files)));
};

fs.getVersion = async packageJsonPath => {
  const data = await fs.readFile(packageJsonPath);
  const json = JSON.parse(data);
  return json.version;
};

module.exports = fs;
