const tailwindcss = require('@tailwindcss/postcss');
module.exports = {
    plugin: [
        tailwindcss,
        require('autoprefixer'),
    ],
};