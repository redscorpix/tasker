var inherits = require('util').inherits;

var Task = require('../../core/task').Task;
var util = require('../../core/util');


/**
 * @param {string} builderPath
 * @param {string} compilerPath
 * @param {string} outputFile
 * @param {Object.<string>=} opt_options
 * @constructor
 * @extends {Task}
 */
var ClosureBuilderCompile = function(builderPath, compilerPath, outputFile,
    opt_options) {
  /**
   * @type {string}
   */
  this.builderPath = builderPath;

  /**
   * @type {string}
   */
  this.compilerPath = compilerPath;

  /**
   * @type {string}
   */
  this.outputFile = outputFile;

  /**
   * @type {Object.<string>}
   */
  this.options = opt_options || {};
};
inherits(ClosureBuilderCompile, Task);


/**
 * @param {string} builderPath
 * @param {string} compilerPath
 * @param {string} outputFile
 * @param {Object.<string>=} opt_options
 * @return {!ClosureBuilderCompile}
 */
ClosureBuilderCompile.create = function(builderPath, compilerPath, outputFile,
    opt_options) {
  return new ClosureBuilderCompile(
    builderPath, compilerPath, outputFile, opt_options);
};

/** @inheritDoc */
ClosureBuilderCompile.prototype.startInternal = function() {
  /** @type {!Array.<string>} */
  var inputs = this.options.inputs || [];
  /** @type {!Array.<string>} */
  var namespaces = this.options.namespaces || [];
  /** @type {!Array.<string>} */
  var roots = this.options.roots || [];
  /** @type {string} */
  var outputMode = this.options.outputMode || 'compiled';
  /** @type {!Array.<string>} */
  var compilerFlags = this.options.compilerFlags || [];

  var commandParts = [
    this.builderPath,
    '--compiler_jar="' + this.compilerPath + '"',
    '--output_file="' + this.outputFile + '"',
    '--output_mode=' + outputMode
  ];
  var i;

  for (i = 0; i < inputs.length; i++) {
    commandParts.push('--input="' + inputs[i] + '"');
  }

  for (i = 0; i < namespaces.length; i++) {
    commandParts.push('--namespace="' + namespaces[i] + '"');
  }

  for (i = 0; i < roots.length; i++) {
    commandParts.push('--root="' + roots[i] + '"');
  }

  for (i = 0; i < compilerFlags.length; i++) {
    commandParts.push('--compiler_flags="' + compilerFlags[i] + '"');
  }

  var command = commandParts.join(' ');
  console.log(command);
  util.buildCommand(command, this.onEnd.bind(this));
};


module.exports = {
  ClosureBuilderCompileTask: ClosureBuilderCompile
};
