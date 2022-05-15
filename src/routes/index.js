// Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Details from '../pages/Details';
import Admin from '../pages/Admin/Admin';
import Checkout from '../pages/Checkout';
// Componnent
import Page404 from '../components/Page404';
import Payment from '../components/Payment';

// Layout
import { AdminTemplate } from '../templates/';

export const publicRoutes = [
  { path: '/', component: Home },
  { path: '/profile', component: Profile },
  { path: '/login', component: Login, layout: null },
  { path: '/register', component: Register, layout: null },
  { path: '/details/:id', component: Details, layout: null },
  { path: '/checkout/:id', component: Checkout, layout: null },
  { path: '/VNPayReturn', component: Payment, layout: null },
  { path: '/admin', component: Admin, layout: AdminTemplate },
  { path: '*', component: Page404, layout: null },
];
