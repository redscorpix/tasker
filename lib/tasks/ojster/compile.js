var inherits = require('util').inherits;

var Task = require('../../core/task').Task;


/**
 * Требует установленный ojster.
 * @param {string} path
 * @param {string} configPath
 * @constructor
 * @extends {Task}
 */
var OjsterCompile = function(path) {
  /**
   * @type {string}
   */
  this.path = path;
};
inherits(OjsterCompile, Task);


/**
 * @param {string} path
 * @return {!OjsterCompile}
 */
OjsterCompile.create = function(path) {
  return new OjsterCompile(path);
};


/**
 * @type {boolean}
 */
OjsterCompile.prototype.silent = false;

/**
 * @type {string}
 */
OjsterCompile.prototype.generatorClass = 'goog';

/**
 * @type {string}
 */
OjsterCompile.prototype.generatorIndentStr = '  ';

/**
 * @type {number}
 */
OjsterCompile.prototype.tabSize = 2;


/** @inheritDoc */
OjsterCompile.prototype.startInternal = function() {
  var ojster = require('ojster');
  var options = {
    silent: this.silent,
    generator: {
      generatorClass: ojster.generators.GoogGenerator,
      indentStr: this.generatorIndentStr
    },
    tabSize: this.tabSize
  };
  var self = this;
  ojster.compilePath(this.path, null, options, function(error, results) {
    self.onEnd.call(self, !!error);
  });
};


module.exports = {
  OjsterCompileTask: OjsterCompile
};
