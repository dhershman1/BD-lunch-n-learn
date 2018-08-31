# Dynamic Routes & Using Param Props

With the functionality of vue-router we gain the ability to create simpler architecture but dynamic content within your vue files.

## Dynamic Routing

Vue-Router much like frameworks like `express` use the `path-to-regexp` system of reading routes.

Meaning you can take advantage of several key features.

Like:

- Dynamic Routes: `/blog/:id` -- the `:` signifies the id will be a parameter
- Optional Params: `/blog/:id/:page?` -- the `?` signifies that the page param is optional for this route

All dynamic values show up in the params object of `$route` (`$route.params`)

## Params As Props

You can pass in parameters as props to your vue instance instead of needing to reference the `this.$route.params` every single time.

This not only shortens the way to access them but it also gives you all of the capabilities of your prop functionality, like specifying types, defaults, etc. Without any extra work just take advantage of what already exsists within your vue instance.

You can also just in general pass props down into components via the router which is great!

### Modes

This functionality has multiple modes you can use

#### Boolean Mode

In Boolean mode everything within the `route.params` will be set as the components props

```js
{
  path: '/blog/:id/:loc',
  component: Landing,
  props: true
}
```

#### Object Mode

When given an object, this will be set as the props being sent into the component as-is

```js
{
  path: '/blog/foo',
  component: Landing,
  props: {
    start: 1,
    inObjMode: true
  }
}
```

#### Function Mode

You can also create a function to return props allowing you to do all sorts of things, like combine static values, cast parameters into other types, build logic around route-based values, etc.

The function get's the route object for you to use and take advantage of. It is advised to try and keep the props function stateless, since it's only evaluated on route changes.

```js
{
  path: '/blog/:id/:page?',
  component: Landing,
  props({ params, query }) {
    return {
      id: params.id,
      page: query.page
    }
  }
}
```

