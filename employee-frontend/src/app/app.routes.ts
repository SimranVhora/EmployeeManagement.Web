import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'employees',
		loadComponent: () => import('./components/employee-list/employee-list').then(m => m.EmployeeList)
	},
  {
		path: '',
		loadComponent: () => import('./components/employee-list/employee-list').then(m => m.EmployeeList)
	},
	{ path: 'add-employee',
    loadComponent: () => import('./components/add-employee/add-employee.component').then(m => m.AddEmployeeComponent) },
	{ path: 'project-summary',
    loadComponent: () => import('./components/project-summary/project-summary.component').then(m => m.ProjectSummaryComponent) },
];
