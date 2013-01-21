var inherits = require('util').inherits;

var Task = require('../../core/task').Task;
var util = require('../../core/util');


/**
 * @param {string} plovrPath
 * @param {string} configPath
 * @constructor
 * @extends {Task}
 */
var PlovrJsdoc = function(plovrPath, configPath) {
  /**
   * @type {string}
   */
  this.plovrPath = plovrPath;

  /**
   * @type {string}
   */
  this.configPath = configPath;
};
inherits(PlovrJsdoc, Task);


/**
 * @param {string} plovrPath
 * @param {string} configPath
 * @return {!PlovrJsdoc}
 */
PlovrJsdoc.create = function(plovrPath, configPath) {
  return new PlovrJsdoc(plovrPath, configPath);
};

/** @inheritDoc */
PlovrJsdoc.prototype.startInternal = function() {
  var command =
    ['java -jar', this.plovrPath, 'jsdoc', this.configPath].join(' ');
  util.buildCommand(command, this.onEnd.bind(this));
};


module.exports = {
  PlovrJsdocTask: PlovrJsdoc
};
