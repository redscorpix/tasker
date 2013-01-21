var Task = require('./core/task').Task;
var CssmapObfuscateTask = require('./tasks/cssmap/obfuscate').CssmapObfuscateTask;
var CompassCompileTask = require('./tasks/compass/compile').CompassCompileTask;
var OjsterCompileTask = require('./tasks/ojster/compile').OjsterCompileTask;
var PlovrBuildTask = require('./tasks/plovr/build').PlovrBuildTask;
var PlovrJsdocTask = require('./tasks/plovr/jsdoc').PlovrJsdocTask;


module.exports = {
  task: Task.create,
  compassCompile: CompassCompileTask.create,
  cssmapObfuscate: CssmapObfuscateTask.create,
  ojsterCompile: OjsterCompileTask.create,
  plovrBuild: PlovrBuildTask.create,
  plovrJsdoc: PlovrJsdocTask.create
};
