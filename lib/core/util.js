var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');


/**
 * Выполняет системную команду.
 * @param {string} command
 * @param {function(boolean)=} opt_callback Функция, которая будет вызвана по
 *           окончании выполнения команды. Если в аргументе true, то ошибка.
 */
var buildCommand = function(command, opt_callback) {
  exec(command, function(error, stdout, stderr) {
    if (error) {
      process.stderr.write('exec error: ' + error + '\ncommand: ' + command + '\n');
    }

    if (stdout) {
      process.stdout.write(stdout + '\n');
    }

    if (stderr) {
      process.stderr.write(stderr + '\n');
    }

    if (opt_callback) {
      opt_callback(!!error);
    }
  });
};

/**
 * Возвращает относительный путь между двумя директориями.
 * @param {string} fromPath
 * @param {string} toPath
 * @return {string}
 */
var getRelativePath = function(fromPath, toPath) {
  fromPath = path.normalize(fs.realpathSync(fromPath)) + '/';
  toPath = fs.realpathSync(toPath);

  /** @type {string} */
  var relativePath = '';
  /** @type {number} */
  var index = 0;
  /** @type {number} */
  var i = 0;

  while (fromPath[i] === toPath[i] && undefined !== fromPath[i]) {
    if ('/' == fromPath[i]) {
      index = i + 1;
    }

    i++;
  }

  /** @type {!Array.<string>} */
  var tempDirs = fromPath.substr(index).split('/');

  tempDirs.forEach(function(dir) {
    if (dir) {
      relativePath += '../';
    }
  });

  return relativePath + toPath.substr(index);
}


module.exports = {
  buildCommand: buildCommand,
  getRelativePath: getRelativePath
};
