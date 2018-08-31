const Blog = {
  template: `
    <div class="user">
      <h2>Blog {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}

const BlogDash = { template: '<div>Dash</div>' }
const BlogFollowers = { template: '<div>Followers</div>' }
const BlogPosts = { template: '<div>Posts</div>' }

const router = new VueRouter({
  routes: [
    {
      path: '/blog/:id',
      component: Blog,
      children: [
        {
          path: '',
          component: BlogDash
        },
        {
          path: 'followers',
          component: BlogFollowers
        },
        {
          path: 'posts',
          component: BlogPosts
        }
      ]
    }
  ]
})


const app = new Vue({ router }).$mount('#app')
