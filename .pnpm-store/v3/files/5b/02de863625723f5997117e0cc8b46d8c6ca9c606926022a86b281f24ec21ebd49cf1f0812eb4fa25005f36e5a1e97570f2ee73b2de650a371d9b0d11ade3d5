"use strict";

exports.__esModule = true;
exports.default = void 0;
var _repositoryId = require("gatsby-telemetry/lib/repository-id");
var _murmurhash = require("gatsby-core-utils/murmurhash");
const sampleSite = (experimentName, percentage) => {
  const bucketNumber = (0, _murmurhash.murmurhash)(experimentName + `` + JSON.stringify((0, _repositoryId.getRepositoryId)().repositoryId), 0) % 100;
  return bucketNumber < percentage;
};
var _default = sampleSite;
exports.default = _default;
//# sourceMappingURL=sample-site-for-experiment.js.map