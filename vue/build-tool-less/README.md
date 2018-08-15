# No Build Tools!

Vue is powerful, but it also knows that sometimes you don't want to use a tool like webpack just to get your simple application off the ground.

Which is why you can easily bring in vue and use it simply as a library even right inside your html.

```html
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <title>Testing HTML</title>
  </head>

  <body>
    <div id="app">
      <form>
        <label>Test Input</label>
        <input type="text" v-model="testInput">
      </form
    </div>

    <script src="https://unpkg.com/vue@latest/dist/vue.js"></script>
    <script>
      new Vue({
        el: '#app',
        data() {
          return {
            testInput: ''
          }
        }
      })
    </script>
  </body>

</html>
```

We can easily plop the link to vue and freely use it within our html whenever we need to.
