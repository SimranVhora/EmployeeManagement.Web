import { ProjectSummaryComponent } from './components/project-summary/project-summary.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'employees',
		loadComponent: () => import('./components/employee-list/employee-list').then(m => m.EmployeeList)
	},
	{ path: '', redirectTo: 'employees', pathMatch: 'full' },
	{ path: '**', redirectTo: 'employees' },
   { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'project-summary', component: ProjectSummaryComponent },
];
