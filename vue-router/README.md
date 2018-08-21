# Vue-Router

Vue router is the weapon of choice for setting up routing around your vue app.

It's especially good with SPA based projects.

```js
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes,
});
```

Mode:

- `hash`: Uses the URL hash for routing. Works in all Vue-supported browsers, including those that do not support HTML5 History API.
- `history`: Uses and requires the HTML5 history API it simply archives url navigation so that pages don't reload when url navigation occurs.
- `abstract`: Built around JS environments. Mainly for SSR types of projects
