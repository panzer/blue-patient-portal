import Help from '@mui/icons-material/Help';
import HomeIcon from '@mui/icons-material/Home';

import asyncComponentLoader from '@/utils/loader';

import { Routes } from './types';

const routes: Routes = [
  {
    component: asyncComponentLoader(() => import('@/pages/Welcome')),
    path: '/',
    title: 'Home',
    icon: HomeIcon,
    routes: [
      {
        component: asyncComponentLoader(() => import('@/pages/Welcome')),
        path: 'home/:id',
      },
      {
        component: asyncComponentLoader(() => import('@/pages/Page4')),
        path: 'home/:id/add',
      },
    ],
  },
  {
    component: asyncComponentLoader(() => import('@/pages/Page1')),
    path: '/help',
    title: 'Help',
    icon: Help,
  },
  {
    component: asyncComponentLoader(() => import('@/pages/Page2')),
    path: '/appointments/:id',
    routes: [
      {
        component: asyncComponentLoader(() => import('@/pages/Page3')),
        path: 'new',
      },
    ],
  },
];

export default routes;
