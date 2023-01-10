const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "https://swapi.dev",
    createProxyMiddleware({
      target: "http://localhost:7071",
      changeOrigin: true,
      secure: false,
    })
  );
};
