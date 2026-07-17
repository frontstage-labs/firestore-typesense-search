// Reuse the repository-root flat config so `functions`-local linting matches CI
// (which lints from the repo root). Plugin/config deps resolve from the root
// config's location, so they don't need to be re-declared here.
module.exports = require("../eslint.config.js");
