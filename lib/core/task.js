var async = require('async');


/**
 * @constructor
 */
var Task = function() {
  this._subTasks = [];
};

/**
 * @return {!Task}
 */
Task.create = function() {
  return new Task();
};

/**
 * @type {boolean}
 * @private
 */
Task.prototype._works = false;

/**
 * @type {Array.<Task>}
 */
Task.prototype._subTasks;

/**
 * @type {function(boolean)?}
 * @private
 */
Task.prototype._endCallback = null;


/**
 * @return {boolean}
 */
Task.prototype.isWorks = function() {
  return this._works;
};

/**
 * @param {Task} subTask
 * @return {!Task}
 */
Task.prototype.add = function(subTask) {
  this._subTasks.push(subTask);

  return this;
};

/**
 * @param {function(boolean)?} opt_callback
 * @return {boolean}
 */
Task.prototype.start = function(opt_callback) {
  if (!this._works) {
    this._works = true;
    this._endCallback = opt_callback || null;
    this.startInternal();

    return true;
  }

  return false;
};

/**
 * @protected
 */
Task.prototype.startInternal = function() {
  async.forEachSeries(
    this._subTasks, this.onSubTask.bind(this), this.onEnd.bind(this));
};

/**
 * @return {!Task}
 */
Task.prototype.clear = function() {
  this._subTasks = [];

  return this;
};

/**
 * @param {Task} task
 * @param {function(boolean)} callback
 * @protected
 */
Task.prototype.onSubTask = function(task, callback) {
  task.start(callback);
};

/**
 * @param {boolean} error
 * @protected
 */
Task.prototype.onEnd = function(error) {
  this._works = false;

  if (this._endCallback) {
    this._endCallback(error);
    this._endCallback = null;
  }
};


module.exports = {
  Task: Task
};
