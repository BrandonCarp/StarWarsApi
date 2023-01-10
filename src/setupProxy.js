const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "https://swapi.dev",
    createProxyMiddleware({
      target: "https://localhost:7002",
      changeOrigin: true,
      secure: false,
    })
  );
};
