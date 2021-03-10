const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-scss",
  ],
  webpackFinal: (config) => {
    const sassLoader = config.module.rules.find(rule => rule.test.test('.scss'));
    const i = sassLoader.use.findIndex(ldr => ldr.loader && /css\-loader/.test(ldr.loader));
    sassLoader.use[i].options = {
      importLoaders: 1,
      modules: {
        compileType: "module",
        mode: "local",
        auto: true,
        exportGlobals: true,
        localIdentName: "[name]__[local]--[hash:base64:5]",
      },
    };

    config.resolve.alias["next/link"] = require.resolve(
      "../src/__mocks__/next/link.js",
    );
    config.resolve.alias["next/router"] = require.resolve(
      "../src/__mocks__/next/router.js",
    );
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve("./src"),
    ];
    config.module.rules.unshift({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?|\.(scss|css)$/,
      },
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  removeViewbox: {
                    active: false,
                  },
                },
              ],
            },
          },
        },
        "url-loader",
      ],
    });
    return config;
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
};
