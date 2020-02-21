const path = require("path");
const editorConfigFn = require("./webpack.config.editor");
const babelrc = require("./babelrc.config.all");

module.exports = options => {
  const editorConfig = editorConfigFn(options);

  return {
    mode: options.IS_PRODUCTION ? "production" : "development",
    entry: "./editor/js/bootstraps/preview/index.js",
    output: {
      ...editorConfig.output,
      filename: "preview.js"
    },
    resolve: {
      alias: {
        "visual/utils": path.resolve(__dirname, "editor/js/utils")
      },
      extensions: editorConfig.resolve.extensions
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)$/,
          include: [path.resolve(__dirname, "editor")],
          loader: "babel-loader",
          options: babelrc.preview()
        }
      ]
    },
    devtool: editorConfig.devtool,
    watch: editorConfig.watch
  };
};
