import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Discussion from '@/views/Discussion.vue';

const routes: any[] = [
  { path: '/', name: 'home', component: Home },
  { path: '/discussion/:id', name: 'discussion', component: Discussion }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.params.retainScrollPosition) return {};
    if (to.hash) {
      const position = { selector: to.hash };
      return { el: position };
    }
    return { top: 0 };
  }
});

export default router;
