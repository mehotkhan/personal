const { path } = require("@vuepress/shared-utils");

module.exports = (options) => ({
  clientRootMixin: path.resolve(__dirname, "./index.js"),
});
