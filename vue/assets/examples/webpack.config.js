
const path = require('path')

const isProd = process.env.NODE_ENV === 'production'

const resolve = dir =>
  path.join(__dirname, dir)

const config = {
  devtool: (isProd) ? 'source-map' : 'cheap-module-source-map',
  node: {
    fs: 'empty'
  },
  output: {
    path: resolve('dist'),
    // Using publicPath in our output object will point to whatever
    // Path has been specified in our string. Which we can then refer
    // To in src images or style sheets for example the below would
    // Allow us to do something like this in our code:
    // <img src="/assets/thing.jpg">
    // Or
    // background-image: url(/assets/thing.jpg)
    publicPath: '/assets/',
    filename: '[name].js'
  },
  resolve: {
    // Allows us to tell webpack to check for
    // The following extensions when importing a file
    extensions: ['.js', '.vue', '.json'],
    // Setup an alias so we can do
    // import thing from '~/place/thing' instead of
    // import thing from '../../place/thing'
    alias: {
      '~': resolve('src')
    }
  },
  // Using webpack loaders to bring in images and style sheets
  // This is important if you want to use scss/sass/less in vue style tags
  // This is also a good point to setup linting and transpiler rules
  modules: {
    rules: [
      // For loading vue files through webpack and handling vue in general
      // Remember the test accepts a regex string (^$)
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },

      // Setting up the linter to run on build
      {
        enforce: 'pre',
        test: /\.(js|vue)/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },

      // If you need to support old browsers like IE
      // Then you'd also want to have a transpiler in place
      // We can use the babel loader for ours.
      // If you don't need to support old browsers
      // Then just use the object spread plugin instead
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },

      // If you are going to go the import route with your assets
      // Then these next two loaders are very important
      // Let's start with images you will need the file-loader for this
      {
        // Font extensions
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader'
      },
      {
        // Image extensions
        test: /\.(gif|png|jpe?g|svg)$/i,
        loader: 'file-loader'
      },

      // Now for styles, this will depend heavily on what type of
      // Stylesheets you are building, here we will just cover
      // Vanilla CSS and Sass
      {
        test: /\.(css|scss|sass)/,
        // Note the key difference, we are using multiple loaders
        // Webpack will go in order, if css loader can't do it then
        // It will try sass-loader and if it still fails an error will happen
        // We also passed an option to the css loader telling it to minimize
        use: [
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
          { loader: 'sass-loader' }
        ]
      }
    ]
  },
  performance: {
    hints: isProd ? 'warning' : false
  }
  // You'd also add your plugins and so fourth after this
}
