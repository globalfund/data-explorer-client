module.exports = () => {
  const babelPlugins = ["babel-plugin-styled-components"];

  if (process.env.NODE_ENV === "production") {
    babelPlugins.push([
      "transform-remove-console",
      { exclude: ["error", "warn"] },
    ]);
  }

  return {
    eslint: {
      enable: false,
    },

    webpack: {
      alias: {
        // 'react-dom': '@hot-loader/react-dom',
        "react/jsx-dev-runtime": "react/jsx-dev-runtime.js",
        "react/jsx-runtime": "react/jsx-runtime.js",
      },
      plugins: [
        // new StyleLintPlugin({
        //   configBasedir: __dirname,
        //   context: path.resolve(__dirname, 'src'),
        //   files: ['**/*.tsx', '**/*.ts'],
        // }),
        // new WebpackPluginRamdisk(),
      ],
      loaders: [
        {
          test: /plugin\.css$/,
          loaders: ['style-loader', 'css'],
        },
      ],
    },

    babel: {
      plugins: babelPlugins,
      loaderOptions: {
        ignore: ["./node_modules/mapbox-gl/dist/mapbox-gl.js"],
      },
    },

    webpackDevServer: {
      port: process.env.PORT || 3000,
    },
  };
};
