// Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Details from '../pages/Details';
import Admin from '../pages/Admin/Admin';
// Componnent
import Page404 from '../components/Page404';

// Layout
import { AdminTemplate } from '../templates/';

export const publicRoutes = [
  { path: '/', component: Home },
  { path: '/login', component: Login, layout: null },
  { path: '/register', component: Register, layout: null },
  { path: '/profile', component: Profile },
  { path: '/details/:id', component: Details, layout: null },
  { path: '/admin', component: Admin, layout: AdminTemplate },
  { path: '*', component: Page404, layout: null },
];
