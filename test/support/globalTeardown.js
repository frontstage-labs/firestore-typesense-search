const {teardown: teardownDevServer} = require("jest-dev-server");

module.exports = async function globalTeardown() {
  return await teardownDevServer(globalThis.servers);
};
