//LAYOUTS
import '../components/layouts/dashboard-layout';

//pages
import '../pages/add-employee';
import '../pages/edit-employee';
import '../pages/list-employees';

export const views = [
  {
    path: '/',
    component: 'list-employees',
    title: 'Employees',
  },
  {
    path: '/add-employee',
    component: 'add-employee',
    title: 'Add Employee',
  },
  {
    path: '/edit-employee',
    component: 'edit-employee',
    title: 'Edit Employee',
  },
];

export const routes = [
  {
    path: '',
    component: 'dashboard-layout',
    children: [...views],
  },
];
