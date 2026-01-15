const webpack = require("@nativescript/webpack");
const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = (env) => {
    webpack.init(env);

    // Learn how to customize:
    // https://docs.nativescript.org/webpack

    webpack.chainWebpack((config) => {
        // Use vue-loader@15 for Vue 2
        config.resolve.alias.set(
            "vue-loader",
            path.resolve(__dirname, "node_modules/vue-loader")
        );

        // Remove the default VueLoaderPlugin (v17) and add v15
        config.plugins.delete("VueLoaderPlugin");
        config.plugin("VueLoaderPlugin").use(VueLoaderPlugin);

        // Configure vue-loader for Vue 2
        config.module
            .rule("vue")
            .use("vue-loader")
            .loader(require.resolve("vue-loader"))
            .tap((options) => ({
                ...options,
                compiler: require("vue-template-compiler"),
                compilerOptions: {
                    whitespace: 'condense',
                    preserveWhitespace: false,
                },
            }));
    });

    return webpack.resolveConfig();
};
