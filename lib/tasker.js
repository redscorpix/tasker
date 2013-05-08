var Task = require('./core/task').Task;
var CssmapObfuscateTask = require('./tasks/cssmap/obfuscate').CssmapObfuscateTask;
var ClosureBuilderCompileTask = require('./tasks/closurebuilder/compile').ClosureBuilderCompileTask;
var ClosureDepswriterDepsTask = require('./tasks/depswriter/deps').ClosureDepswriterDepsTask;
var CompassCompileTask = require('./tasks/compass/compile').CompassCompileTask;
var OjsterCompileTask = require('./tasks/ojster/compile').OjsterCompileTask;
var PlovrBuildTask = require('./tasks/plovr/build').PlovrBuildTask;
var PlovrJsdocTask = require('./tasks/plovr/jsdoc').PlovrJsdocTask;


module.exports = {
  task: Task.create,
  closureBuilderCompile: ClosureBuilderCompileTask.create,
  closureDepswriterDeps: ClosureDepswriterDepsTask.create,
  compassCompile: CompassCompileTask.create,
  cssmapObfuscate: CssmapObfuscateTask.create,
  ojsterCompile: OjsterCompileTask.create,
  plovrBuild: PlovrBuildTask.create,
  plovrJsdoc: PlovrJsdocTask.create
};
