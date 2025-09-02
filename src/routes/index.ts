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
  },
  {
    component: asyncComponentLoader(() => import('@/pages/NewPatient')),
    path: 'home/:id/add',
  },
  {
    component: asyncComponentLoader(() => import('@/pages/Page1')),
    path: '/help',
    title: 'Help',
    icon: Help,
  },
  {
    component: asyncComponentLoader(() => import('@/pages/AppointmentsList')),
    path: '/appointments/:id',
  },
  {
    component: asyncComponentLoader(() => import('@/pages/NewAppointment')),
    path: '/appointments/:id/new',
  },
];

export default routes;
