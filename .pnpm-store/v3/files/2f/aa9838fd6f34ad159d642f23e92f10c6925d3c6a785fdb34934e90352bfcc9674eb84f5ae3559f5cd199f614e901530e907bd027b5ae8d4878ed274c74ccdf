"use strict";

exports.__esModule = true;
exports.shouldGenerateEngines = shouldGenerateEngines;
exports.shouldPrintEngineSnapshot = shouldPrintEngineSnapshot;
var _redux = require("../redux");
var _gatsbyTelemetry = require("gatsby-telemetry");
function shouldPrintEngineSnapshot() {
  return process.env.gatsby_executing_command === `build`;
}
let generate = false;
let shouldSendTelemetryForHeadAPI = true;
function shouldGenerateEngines() {
  return process.env.gatsby_executing_command === `build` && generate;
}
_redux.emitter.on(`CREATE_PAGE`, action => {
  if (action.payload.mode && action.payload.mode !== `SSG`) generate = true;
});
_redux.emitter.on(`SET_COMPONENT_FEATURES`, action => {
  if (action.payload.serverData) generate = true;
  if (action.payload.config) generate = true;
  if (action.payload.Head && shouldSendTelemetryForHeadAPI) {
    (0, _gatsbyTelemetry.trackFeatureIsUsed)(`HeadAPI`);
    shouldSendTelemetryForHeadAPI = false;
  }
});
//# sourceMappingURL=engines-helpers.js.map