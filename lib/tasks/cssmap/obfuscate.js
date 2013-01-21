var async = require('async');
var fs = require('fs');
var inherits = require('util').inherits;
var isArray = require('util').isArray;

var Task = require('../../core/task').Task;


/**
 * Требует установленный cssmap.
 * @param {string|Array.<string>|Object.<string,string>} cssFilePath
 * @param {string} renamingFilePath
 * @param {string} ejsFilePath
 * @constructor
 * @extends {Task}
 */
var CssmapObfuscate = function(cssFilePath, renamingFilePath, ejsFilePath) {
  var cssFilePathMap = {};

  if ('string' == typeof cssFilePath) {
    cssFilePathMap[cssFilePath] = cssFilePath;
  } else if (isArray(cssFilePath)) {
    cssFilePath.forEach(function(path) {
      cssFilePathMap[path] = path;
    });
  } else {
    cssFilePathMap = cssFilePath;
  }

  /**
   * @type {Object.<string,string>}
   */
  this.cssFilePath = cssFilePathMap;

  /**
   * @type {string}
   */
  this.renamingFilePath = renamingFilePath;

  /**
   * @type {string}
   */
  this.ejsFilePath = ejsFilePath;
};
inherits(CssmapObfuscate, Task);


/**
 * @typedef {{
 *  output: string,
 *  data: string,
 *  result: string?
 * }}
 */
CssmapObfuscate.FileData;

/**
 * @param {string|Array.<string>|Object.<string,string>} cssFilePath
 * @param {string} renamingFilePath
 * @param {string} ejsFilePath
 * @return {!CssmapObfuscate}
 */
CssmapObfuscate.create = function(cssFilePath, renamingFilePath, ejsFilePath) {
  return new CssmapObfuscate(cssFilePath, renamingFilePath, ejsFilePath);
};


/**
 * @type {Array.<string>}
 */
CssmapObfuscate.prototype.excludes = null;

/**
 * @type {string}
 */
CssmapObfuscate.prototype.mapSymbols =
  'ABCDEFGHIJKLMNOPQRTUVWXYZabcdefghijklmnopqrtuvwxyz';


/** @inheritDoc */
CssmapObfuscate.prototype.startInternal = function() {
  /** @type {!Array.<CssmapObfuscate.FileData>} */
  var files = this._getFileData(this.cssFilePath);
  var CssMap = require('cssmap');
  var formatter = require('cssmap/formatter');
  var cssMap = new CssMap();

  if (this.excludes) {
    cssMap.setExcludes(excludes);
  }

  files.forEach(function(file) {
    cssMap.addFile(file.data);
  });
  cssMap.setMapSymbols(this.mapSymbols);
  cssMap.compile();

  var obfuscated = cssMap.getFiles();

  files.forEach(function(fileData, i) {
    fileData.result = obfuscated[i].result;
  });

  var self = this;

  async.forEach(files, function(fileData, callback) {
    fs.writeFile(fileData.output, fileData.result, callback);
  }, function(error) {
    if (error) {
      self.onEnd.call(this, error);
    } else {
      var mapData = formatter.format(cssMap.getMap(), self.ejsFilePath);

      fs.writeFile(self.renamingFilePath, mapData, self.onEnd.bind(self));
    }
  });
};

/**
 * @param {Object.<string,string>} cssFilePathMap
 * @return {!Array.<CssmapObfuscate.FileData>}
 * @private
 */
CssmapObfuscate.prototype._getFileData = function(cssFilePathMap) {
  var files = [];

  for (var inputCssFile in cssFilePathMap) {
    files.push({
      output: cssFilePathMap[inputCssFile],
      data: new String(fs.readFileSync(inputCssFile)),
      result: null
    });
  }

  return files;
};


module.exports = {
  CssmapObfuscateTask: CssmapObfuscate
};
