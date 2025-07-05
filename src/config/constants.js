export const MenuItems = [
  {
    title: 'employees',
    icon: 'employee-icon',
    href: '/',
    hasDataGrid: true,
  },
  {
    title: 'addEmployee',
    icon: 'plus-icon',
    href: '/add-employee',
    hasDataGrid: false,
  },
  {
    title: 'editEmployee',
    icon: 'plus-icon',
    href: '/edit-employee',
    hasDataGrid: false,
    visible: false,
  },
];

export const LOCALE_STORAGE_KEY = 'app_locale';
