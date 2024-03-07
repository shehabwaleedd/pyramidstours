mix.extend("addWebpackLoaders", (webpackConfig, loaderRules) => {
    loaderRules.forEach((loaderRule) => {
        webpackConfig.module.rules.push(loaderRule);
    });
});

mix.addWebpackLoaders([
    {
        test: /\.(mp4|svg|jpe?g|gif)$/,
        use: [
            {
                loader: 'file-loader',
            }
        ]
    }
]);