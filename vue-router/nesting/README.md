# Nested Routes

Nested routes allow for easy child component navigation and swapping since it is common that segments of a URL correspond with a certain structure of nested components.

The setup is easy:

```js
const Blog = {
  template: '<div>Blog #: {{ $route.params.id }}</div>'
}

const router = new VueRouter({
  routes: [
    { path: '/blog/:id', component: Blog }
  ]
})
```

In the above instance the `router view` is a top level outlet. It matches the component by a top level route. However a rendered component can also contain its own nested `router views`. When we add one to our blog like so:

```js
const Blog = {
  template: `
    <div class="blog">
      <h2>Blog #: {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}
```

In order to render new components into this nested view we need to use the `children` option.

```js
const router = new VueRouter({
  routes: [
    {
      path: '/blog/:id',
      component: Blog,
      children: [
        {
          // Translates to: /blog/:id/posts
          // BlogPosts will be rendered into our nested router view of Blog
          path: 'posts',
          component: BlogPosts
        },
        {
          // Translates to: /blog/:id/followers
          // BlogFollowers will be rendered into our nested router view of Blog
          path: 'followers',
          component: BlogFollowers
        }
      ]
    }
  ]
})
```
**It is important to note paths that start with `/` will be treated as a root path which allows you to use component nesting without having to use a nested url**

In the instance you want to introduce a sort of "catch all" to render you can simply pass an empty path with a component as a child:

```js
const router = new VueRouter({
  routes: [
    {
      path: '/blog/:id',
      component: Blog,
      children: [
        {
          // Translates to: /blog/:id
          // BlogDash will be rendered into the nested router view
          // Of our Blog component
          path: '',
          component: BlogDash
        }
      ]
    }
  ]
})
```
