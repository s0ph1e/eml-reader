module.exports = {
    entry: './public/js/app.js',
    output: {
        path: __dirname + '/public/',
        filename: 'app.dist.js'
    },
    resolve: {
        alias: {
            jquery: "jquery/src/jquery"
        }
    }
};
