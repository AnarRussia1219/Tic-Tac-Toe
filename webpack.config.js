const path = require("path");

module.exports = {
    mode: "production",
    entry: path.join(__dirname, "src/index.js"),
    output: {
        filename: "scripts.js",
        path: path.resolve(__dirname, "src-build"),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
};