# Assets with Vue

There are many many ways to setup different instances of assets on your page.

Most of the time you will probably want to go through a build tool such as Rollup or Webpack.

There several approaches you can take from here:

- Either setup module rules in order to use loaders so you can import these items
- Or setup asset paths that point to where your assets are located and use the path

In the [examples](https://github.com/dhershman1/BD-lunch-n-learn/tree/master/vue/assets/examples) folder there is a `webpack` config which lays out the ground work for using either loaders or an output path in order to bring in asset based content like images or stylesheets.

## Using publicPath

Using publicPath assigns the folder to that route this is _very_ similar to how `express.static` works when using Node.

Example:

```js
{
  output: {
    publicPath: '/assets/'
  }
}
```

Gives us access to this folder so if it was broken down into sub folders like `imgs`, `css`, etc. we can access the contents within like so:

```html
<img src="/assets/imgs/thing.jpg" alt="I am a thing!"/>
```

The same goes for other content within the assets folder. Or access images from the assets folder within css as well

```css
div {
  background-image: url(/assets/imgs/thing.jpg)
}
```
