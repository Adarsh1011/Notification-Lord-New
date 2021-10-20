
module.exports = {
    entry: './background.js',
    experiments: {
        topLevelAwait: true
    },
    mode: "production",
    resolve: {
        fallback: { "path": false, "os": false, "fs": false }
    },
    devtool: 'cheap-module-source-map'
};