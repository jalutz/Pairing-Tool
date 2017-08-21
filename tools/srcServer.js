// require the module as normal
import bs from 'browser-sync'
import webpack from 'webpack';
import config from '../webpack.config.dev';

webpack(config)


bs.create();

// .init starts the server
bs.init({
    server: "./src"
});

// Now call methods on bs instead of the
// main browserSync module export
bs.reload("*.html");