var fs = require('fs');
var inherits = require('util').inherits;
var path = require('path');

var Task = require('../../core/task').Task;
var util = require('../../core/util');


/**
 * @param {string} builderPath
 * @param {Array.<string>} roots
 * @param {string} basePath
 * @param {string} outputFile
 * @constructor
 * @extends {Task}
 */
var ClosureDepswriterDeps = function(builderPath, roots, basePath, outputFile) {
  /**
   * @type {string}
   */
  this.builderPath = builderPath;

  /**
   * @type {Array.<string>}
   */
  this.roots = roots;

  /**
   * @type {string}
   */
  this.basePath = basePath;

  /**
   * @type {string}
   */
  this.outputFile = outputFile;
};
inherits(ClosureDepswriterDeps, Task);


/**
 * @param {string} builderPath
 * @param {Array.<string>} roots
 * @param {string} basePath
 * @param {string} outputFile
 * @return {!ClosureDepswriterDeps}
 */
ClosureDepswriterDeps.create = function(builderPath, roots, basePath,
    outputFile) {
  return new ClosureDepswriterDeps(builderPath, roots, basePath, outputFile);
};

/** @inheritDoc */
ClosureDepswriterDeps.prototype.startInternal = function() {
  var commandParts = [this.builderPath];

  for (var i = 0; i < this.roots.length; i++) {
    var relativePath = getRelativePath(this.basePath, this.roots[i]);
    commandParts.push(
      '--root_with_prefix="' + this.roots[i] + ' ' + relativePath + '"');
  }

  commandParts.push('>' + this.outputFile);

  var command = commandParts.join(' ');
  console.log(command);
  util.buildCommand(command, this.onEnd.bind(this));
};

/**
 * Возвращает относительный путь между двумя директориями.
 * @param {string} fromPath
 * @param {string} toPath
 * @return {string}
 */
function getRelativePath(fromPath, toPath) {
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
  ClosureDepswriterDepsTask: ClosureDepswriterDeps
};
