import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../Models/employee.model';
import { Department } from '../Models/department.model';
import { EmployeeProjectSummary } from '../Models/employee-project-summary.model';
import { EmployeeFilter } from '../Models/employee-filter-request.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://localhost:7168';

  constructor(private http: HttpClient) { }

  // departments
  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.baseUrl}/api/Employees/departments`);
  }

  // employees: use the EmployeeDetailsView
  getEmployees(params?: EmployeeFilter): Observable<{ data: Employee[], total?: number }> {
    // We'll call /api/employees/filter when params provided, otherwise call /api/employees
    if (!params || Object.keys(params).length === 0) {
      // simple get
      return this.http.get<Employee[]>(`${this.baseUrl}/api/employees`).pipe(
        // normalize to { data, total } shape via map in component if needed
      ) as any;
    } else {
      // call filter endpoint
      return this.http.post<{ data: Employee[], total: number }>(`${this.baseUrl}/api/employees/filter`, params);
    }
  }

  addEmployee(payload: Employee): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/employees`, payload);
  }

  // project summary
  getEmployeeProjectSummary(): Observable<EmployeeProjectSummary[]> {
    return this.http.get<EmployeeProjectSummary[]>(`${this.baseUrl}/api/employees/projects`);
  }

  // optionally drill down: employee projects
  getEmployeeProjects(employeeID: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/employees/${employeeID}/projects`);
  }
}
