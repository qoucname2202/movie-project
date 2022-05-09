// Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

// Componnent
import Dashboard from '../components/Admin';
import Page404 from '../components/Page404';

// Layout
import { AdminTemplate } from '../templates/';

export const publicRoutes = [
  { path: '/', component: Home },
  { path: '/home', component: Home },
  { path: '/login', component: Login, layout: null },
  { path: '/register', component: Register, layout: null },
  { path: '/admin', component: Dashboard, layout: AdminTemplate },
  { path: '*', component: Page404, layout: null },
];