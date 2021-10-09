const path = require("path");

module.exports = {
    mode: "production",
    entry: "./dist/module/index.js",
    output: {
        filename: "chatbot.min.js",
        path: path.resolve(__dirname, "./dist/cdn/"),
    },
};