var inherits = require('util').inherits;

var Task = require('../../core/task').Task;
var util = require('../../core/util');


/**
 * Требует установленный Compass.
 * @param {string} scssPath
 * @param {string} configPath
 * @constructor
 * @extends {Task}
 */
var CompassCompile = function(scssPath, configPath) {
  /**
   * @type {string}
   */
  this.scssPath = scssPath;

  /**
   * @type {string}
   */
  this.configPath = configPath;
};
inherits(CompassCompile, Task);


/**
 * @param {string} scssPath
 * @param {string} configPath
 * @return {!CompassCompile}
 */
CompassCompile.create = function(scssPath, configPath) {
  return new CompassCompile(scssPath, configPath);
};

/** @inheritDoc */
CompassCompile.prototype.startInternal = function() {
  var command = [
    'compass compile', this.scssPath, '-c', this.configPath, '--force'
  ].join(' ');
  util.buildCommand(command, this.onEnd.bind(this));
};


module.exports = {
  CompassCompileTask: CompassCompile
};
