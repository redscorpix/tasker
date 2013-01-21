var inherits = require('util').inherits;

var Task = require('../../core/task').Task;
var util = require('../../core/util');


/**
 * @param {string} plovrPath
 * @param {string} configPath
 * @constructor
 * @extends {Task}
 */
var PlovrBuild = function(plovrPath, configPath) {
  /**
   * @type {string}
   */
  this.plovrPath = plovrPath;

  /**
   * @type {string}
   */
  this.configPath = configPath;
};
inherits(PlovrBuild, Task);


/**
 * @param {string} plovrPath
 * @param {string} configPath
 * @return {!PlovrBuild}
 */
PlovrBuild.create = function(plovrPath, configPath) {
  return new PlovrBuild(plovrPath, configPath);
};

/** @inheritDoc */
PlovrBuild.prototype.startInternal = function() {
  var command =
    ['java -jar', this.plovrPath, 'build', this.configPath].join(' ');
  util.buildCommand(command, this.onEnd.bind(this));
};


module.exports = {
  PlovrBuildTask: PlovrBuild
};
