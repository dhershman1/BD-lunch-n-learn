
// Excuse this but you can't run imports when you work directly with HTML

const Blog = {
  template: `<div class="user">
    <h2>Blog {{ id }}</h2>
    <p>Loc: {{ loc }}</p>
  </div>`,
  props: {
    id: {
      type: String,
      required: true
    },
    loc: {
      type: String,
      default: 'Unknown'
    }
  }
}

const FnMode = {
  template: `<div>
    <h1>Function Mode</h1>
    <p>ID: {{ id }}</p>
    <component :is="page"></component>
  </div>`,
  props: {
    id: {
      type: String,
      required: true
    },
    page: {
      type: String,
      required: true
    }
  },
  components: {
    foo: {
      template: '<div>Foo!</div>'
    },
    bar: {
      template: '<div>Bar!</div>'
    }
  }
}

const ObjMode = {
  template: `<div>
    <h1>Object Mode!</h1>
    <p>In Object Mode: {{ objectMode }}</p>
    <p>Start: {{ start }}</p>
  </div>`,
  props: {
    objectMode: {
      type: Boolean
    },
    start: {
      type: Number
    }
  }
}

const router = new VueRouter({
  routes: [
    // Boolean Mode
    // Vue router uses path-to-regexp as a matching engine which gives you wiggle room!
    {
      // In this case an ID is required however the loc param is not
      path: '/blog/main/:id/:loc?',
      component: Blog,
      props: true
    },
    // Object Mode
    {
      path: '/blog/obj',
      component: ObjMode,
      props: {
        objMode: true,
        start: 1
      }
    },
    // Function Mode
    // So something like /blog/fn/123?page=foo // => { id: 123, page: 'foo' }
    {
      path: '/blog/fn/:id',
      component: FnMode,
      props: route => ({
        id: route.params.id,
        page: route.query.page
      }),
      // Since we only have a limited # of page components
      // Let's setup a nav guard to catch it
      beforeEnter({ query, params }, _, next) {
        // Obviously this is built with example in mind
        // This can be approached in any manner
        const valid = ['foo', 'bar']

        // If all is well then go ahead and continue on
        if (valid.includes(query.page)) {
          return next()
        }

        // If it's not valid then throw them back to the main blog component
        return next({
          path: `/blog/main/${params.id}`,
          replace: true
        })
      }
    }
  ]
})


const app = new Vue({ router }).$mount('#app')
